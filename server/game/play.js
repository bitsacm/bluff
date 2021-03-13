/* eslint-disable node/no-callback-literal */
const { io } = require('../app')

const {
  getGame,
  addUser,
  removeUser,
  getUser
  // users
} = require('./users')

io.on('connection', (socket) => {
  console.log('Connection established!')

  // a new player enters the game room
  socket.on('join', (username, room, callback) => {
    try {
      const user = addUser(socket.id, username, room)
      if(!user) {
        throw new Error('Cannot join this room.');
      }
      const game = getGame(user.room)
      socket.join(user.room)

      game.players.forEach(player => io.to(player.id).emit('update-game-state', game.state, player.cards))
      callback()
    } catch (e) {
      callback(e.message)
    }
  })

  // the game has started: send cards to all players
  socket.on('start', () => {
    try {
      console.log("start");
      const user = getUser(socket.id)
      const game = getGame(user.room)

      game.start()

      game.players.forEach(player => io.to(player.id).emit('start'))
      game.players.forEach(player => io.to(player.id).emit('update-game-state', game.state, player.cards))
    } catch (e) {
      callback(e.message)
    }
  })

  socket.on('call-bluff', (callback) => {
    try {
      const user = getUser(socket.id)
      const game = getGame(user.room)

      // update game
      game.checkBluff(user)

      game.players.forEach(player => io.to(player.id).emit('update-game-state', game.state, player.cards))
      callback()
    } catch (e) {
      callback(e.message)
    }
  })

  socket.on('pass', (callback) => {
    try {
      const user = getUser(socket.id)
      const game = getGame(user.room)

      // update game
      game.pass(user)

      game.players.forEach(player => io.to(player.id).emit('update-game-state', game.state, player.cards))
      callback()
    } catch (e) {
      callback(e.message)
    }
  })

  socket.on('turn', (cards, rank, callback) => {
    try {
      const user = getUser(socket.id)
      const game = getGame(user.room)

      // update game
      game.playCards(user, cards, rank)

      game.players.forEach(player => io.to(player.id).emit('update-game-state', game.state, player.cards))
      callback()
    } catch (e) {
      callback(e.message)
    }
  })

  socket.on('disconnect', () => {
    try {
      const user = getUser(socket.id)
      const game = getGame(user.room)
      removeUser(socket.id)
      game.players.forEach(player => io.to(player.id).emit('update-game-state', game.state, player.cards))
    } catch (e) {
      console.log(e.message)
    }
  })
})
