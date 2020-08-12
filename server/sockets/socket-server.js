const socket = require('socket.io');
const { server } = require("./index");
//socket setup
const io = socket(server);

// on connecting with client
io.on('connection', (socket) => {
  console.log('connected')
  socket.once('join', function (roomname) {
    console.log('work2')
    if ((io.nsps['/'].adapter.rooms[roomname] && io.nsps['/'].adapter.rooms[roomname].length > 11) || (io.nsps['/'].adapter.rooms[roomname] && io.nsps['/'].adapter.rooms[roomname].allowed != undefined)) {
    }
    else {
      socket.join(roomname);
      socket.broadcast.emit('joinplayer', 'new player joined');
      socket.emit('connectToRoom', "You are in room " + roomname);
      console.log(io.nsps['/'].adapter.rooms[roomname].length);
    }
  });
  // var clients = io.of('/').clients(roomname);
  // console.log(clients)
  socket.on('setUsername', function (data) {
    var userlogged = 0;
    io.in(data.roomname).clients((error, clients) => {
      if (error)
        throw error;
      // => [Anw2LatarvGVVXEIAAAD]
      for (var i = 0; i < clients.length; i++) {
        var log = io.sockets.sockets[clients[i]];
        console.log(log.username);
        if (log.username == data.username) {
          userlogged = 1;
          console.log('userlogged');
          break;
        }
        else {
          console.log('notlogged');
        }
      }

      if (!userlogged) {
        socket.username = data.username;
        socket.emit('userSet', { username: data.username });
        console.log('not work');
      }
      else {

        socket.emit('userExists', data.username + ' username is taken! Try some other username.');
        socket.emit('newPrompt');
      }
    });
  });
  socket.on('gameStart', (data) => {
    var usernames = [];
    io.in(data.roomname).clients((error, clients) => {
      if (error)
        throw error;
      clients.forEach(client => {
        var person = io.sockets.sockets[client];
        usernames.push(person.username);
      });
    });
    io.nsps['/'].adapter.rooms[data.roomname].allowed = 1;
    socket.emit('usersList', usernames);
  });
  socket.on('cardHandToDeck', (ids) => {
    io.in(roomname).emit('cardsInDeck', ids);
  });
  socket.once('disconnect', function () {
    console.log('disconnected');
  });
});
