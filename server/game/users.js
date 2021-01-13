/* eslint-disable no-unused-vars */
const Player = require('./Player')
const Game = require('./Game')

const games = []
const users = []

/**
 * @param {string} name
 * @returns {Game}
 */
const getGame = (name) => {
  return games.find(game => game.name === name)
}

/**
 * @param {string} id
 * @param {string} username
 * @param {string} room
 * @returns {Player}
 */
const addUser = (id, username, room) => {
  try {
    // Clean the data
    username = username.trim().toLowerCase()
    room = room.trim().toLowerCase()

    // Validate the data
    if (!username || !room) {
      throw new Error('Username and Room name are required')
    }

    let game = getGame(room)

    // create a new game for a new room
    if (!game) {
      game = new Game(room)
      games.push(game)
    }

    // Store user
    const user = new Player(id, username, room)
    game.addPlayer(user)
    users.push(user)

    return user
  } catch (e) {
    console.log(e)
  }
}

/**
 * @param {string} id
 */
const removeUser = (id) => {
  try {
    // find the user by id
    const user = users.find((u) => u.id === id)

    // remove users from list of users
    const index = users.findIndex((user) => user.id === id)

    if (index !== -1) {
      const _ = users.splice(index, 1)[0]
    }

    // remove user from game
    const game = getGame(user.room)
    game.removePlayer(user)

    if (game.players.length === 0) {
      removeGame(game)
    }

    return user
  } catch (e) {
    console.log(e)
  }
}

const removeGame = (g) => {
  // remove users from list of users
  const index = games.findIndex((game) => g.name === game.name)

  if (index !== -1) {
    const _ = games.splice(index, 1)[0]
  }
}

/**
  @param: {string} id
  @return: {player} player
 */
const getUser = (id) => {
  return users.find((user) => user.id === id)
}

module.exports = {
  getGame,
  addUser,
  removeUser,
  getUser,
  users
}
