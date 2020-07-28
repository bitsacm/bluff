/* eslint-disable no-undef */
// init

/* This Function will execute when Window Loads
*/
window.addEventListener('DOMContentLoaded', () => {
  let playerCount = window.prompt('Enter the number of players(Between 2 and 12): ')
  while (true) {
    if (playerCount <= 2 || playerCount > 12) {
      playerCount = window.prompt('Number of players should bew between 2 and 12')
    } else {
      break
    }
  }
  const newDeck = new Deck() // Create a new Deck instance
  for (let i = 0; i < (playerCount / 4); i++) {
    newDeck.formDeck(suits, values)
  }
  const finalDeck = newDeck.shuffleDeck() // Creating a final deck to be used after shuffling
  const game = new Game() // Create a new Game instance
  game.createPlayers(playerCount, finalDeck) // Creating n players based on user input
  players = game.distributeCards(playerCount, finalDeck) // Distribute the cards to n players created before
  for (let i = 0; i < playerCount; i++) {
    renderDeck(players[i].playerCards) // Rendering the cards of players on the screen
  }
})
