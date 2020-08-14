// prompts for roomname and username
var roomname = ''
while (roomname === '') {
  roomname = prompt('Please enter your roomname')
}

var username = ''
while (username === '') {
  username = prompt('please enter your username')
}
// socket connection to server
var socket = io()
console.log('connected client')
// join event emitter
socket.emit('join', roomname)

// connectToRoom listner
socket.on('connectToRoom', function (data) {
  document.body.innerHTML = ''
  document.write(data)
})

// listner for new player joining
socket.on('joinplayer', (data) => {
  console.log(data)
})

// setUsername event emitter
socket.emit('setUsername', { username: username, roomname: roomname })

// userSet listner
socket.on('userSet', function (data) {
  const user = data.username
  document.body.innerHTML = ''
  console.log(user)
  document.write(user)
})

// userExists listner
socket.on('userExists', function (data) {
  document.body.innerHTML = ''
  document.write(data)
})

// newPrompt for new username listner
socket.on('newPrompt', () => {
  username = prompt('username taken please enter new username')
  socket.emit('setUsername', { username: username, roomname: roomname })// again emitting setUsername
})

// game start event emitter
socket.emit('gameStart', { roomname: roomname })

// card to hand deck event emitter
socket.emit('cardHandToDeck', { cards: 'cards', roomname: roomname })

// provides usernames list when pressed start game button
socket.on('usersList', (data) => {
  data.forEach(name => {
    console.log(name)
  })
})

// less users to start game event
socket.on('lessPlayers', (data) => {
  console.log(data)
})

// endGame event emitter
socket.emit('endgame', { roomname: roomname })

// redirect event listner
socket.on('redirect', (data) => {
  window.location.href = data
})
// disconnect listner`
socket.on('disconnect', () => {
  console.log('user disconnected client')
})
