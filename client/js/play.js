/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const socket = io()

const suitIndex = {
  spades: 0,
  clubs: 1,
  hearts: 2,
  diamonds: 3
}

const rankIndex = {
  'A': 0,
  '2': 1,
  '3': 2,
  '4': 3,
  '5': 4,
  '6': 5,
  '7': 6,
  '8': 7,
  '9': 8,
  '10': 9,
  'J': 10,
  'Q': 11,
  'K': 12
}
document.addEventListener('DOMContentLoaded', () => {
  const game = new Game()
  register(game)

  socket.on('update-game-state', (state, cards) => {
    cards.sort(function (a, b) {
      if (rankIndex[a.rank.shortName] < rankIndex[b.rank.shortName] || (rankIndex[a.rank.shortName] === rankIndex[b.rank.shortName] && suitIndex[a.suit.name] < suitIndex[b.suit.name])) {
        return -1
      }
      return 1
    })
    console.log('recieved game state', state, cards)
    game.cards = cards
    game.state = state
  })

  socket.on('start', () => {
    game.start()
  })

  socket.on('win', (name) => {
    alert(name + ' wins')
    location.reload()
  })
})
