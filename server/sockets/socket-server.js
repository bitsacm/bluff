const {io} = require('./../index')

// on connecting with  client socket
io.on('connection', (socket) => {
  console.log('connected')
  // join event listner
  socket.once('join', function (roomname) {
    // checks for maximum users and if game started?
    if ((io.nsps['/'].adapter.rooms[roomname] && io.nsps['/'].adapter.rooms[roomname].length > 11) || (io.nsps['/'].adapter.rooms[roomname] && io.nsps['/'].adapter.rooms[roomname].allowed != undefined)) {
    } else {
      socket.join(roomname)      // if passed checks joins room
      socket.broadcast.emit('broadcast', 'new player joined');      // brodcast every other a player has joined
      socket.emit('connectToRoom', "You are in room " + roomname)   // emit user the roomname
    }
  })

  // set username event listner
  socket.on('setUsername', function (data) {
    var usernameTaken = 0;                                   // var for checking unique username
    io.in(data.roomname).clients((error, clients) => {      // getting all clients in room
      if (error) throw error;
      // loop for checking username of every other player with given username
      for (var i = 0; i < clients.length; i++) {
        var user = io.sockets.sockets[clients[i]];    // saving socket into user 

        if (user.username == data.username) {         // if equal therfore username taken
          usernameTaken = 1;                          // setting var to 1
          break;                                      // break from loop
        }
      }

      if (!usernameTaken) {
        socket.username = data.username           // setting username in socket of that client
        socket.emit('userSet', { username: data.username })   // emiting username to client side
      } else {
        // emitting dupilicate username to client side
        socket.emit('userExists', data.username + ' username is taken! Try some other username.');
        socket.emit('newPrompt');   //emitting new Prompt for new username
      }
    })
  });

  // gameStart listner
  socket.on('gameStart', (data) => {
    var usernames = [];       // array for storing usernames
    io.in(data.roomname).clients((error, clients) => {    // getting all clients in a room
      if (error) throw error;
      clients.forEach(client => {
        var person = io.sockets.sockets[client]
        usernames.push(person.username)         // adding their username to usernames array
      });
    })
    if (io.nsps['/'].adapter.rooms[data.roomname].length > 1) {
      io.nsps['/'].adapter.rooms[data.roomname].allowed = 1;  // setting var for game started true
      io.in(data.roomname).emit('usersList', usernames)       // emitting usernames list to clients
    } else {
      io.in(data.roomname).emit('lessPlayers', 'need more to start game')
    }

  })
  // cardHandToDeck event listner
  socket.on('cardHandToDeck', (data) => {
    io.in(data.roomname).emit('cardsInDeck', data.ids);
  })
  // endGame event listner
  socket.on('endGame',(data)=>{
    io.in(data.roomname).emit('redirect','/')
  })
  // dissconection event
  socket.once('disconnect', function () {
    console.log('disconnected')
  })
})

