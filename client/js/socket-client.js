var roomname = prompt('Please enter your roomname')
var username = prompt('please enter your username')
const io = require('socket.io-client')
var socket = io()
console.log('work1')
socket.emit('join', roomname)
console.log('work3')
socket.on('connectToRoom', function (data) {
  document.body.innerHTML = ''
  document.write(data)
})
socket.on('joinplayer', (data) => {
  console.log(data)
})
socket.emit('setUsername', { username: username, roomname: roomname })

socket.on('userSet', function (data) {
  var user = data.username
  document.body.innerHTML = ''
  console.log(user)
  document.write(user)
})
socket.on('userExists', function (data) {
  document.body.innerHTML = ''
  document.write(data)
})
socket.on('newPrompt', () => {
  username = prompt('username taken please enter new username')
  socket.emit('setUsername', { username: username, roomname: roomname })
})
socket.emit('gameStart', { roomname: roomname })

socket.emit('cardHandToDeck', { /* cards: cards */roomname: roomname })

socket.on('usersList', (data) => {
  data.forEach(name => {
    console.log(name)
  })
})
socket.on('disconnect', () => {
  console.log('user disconnected client')
})
