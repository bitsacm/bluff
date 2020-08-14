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
  centralStack = []  //Central stack to store cards that are clicked upon and moved by players
  const newDeck = new Deck() // Create a new Deck instance
  for (let i = 0; i < (playerCount / 4); i++) {
    newDeck.formDeck()
  }
  const finalDeck = newDeck.shuffleDeck() // Creating a final deck to be used after shuffling
  let start = Math.floor(Math.random() * playerCount) + 1
  const game = new Game(start) // Create a new Game instance
  game.createPlayers(playerCount, finalDeck) // Creating n players based on user input
  players = game.distributeCards(playerCount, finalDeck) // Distribute the cards to n players created before
  for (let i = 0; i < playerCount; i++) {
    renderDeck(players[i].playerName, players[i].playerCards, game, playerCount) // Rendering the cards of players on the screen
  }
  let playerDiv = document.querySelectorAll('.PlayerDiv') // Storing all elements with class PlayerDiv 
  playerDiv.forEach((player) => { // Looping through each element to deactivate them
    let deactivate = player.querySelectorAll('.Card')
    deactivate.forEach((Card) => {
      Card.setAttribute('style', 'pointer-events:none') // Deactivating click on each Card
    })
  })
  activatePlayer(game) // Activating one player to start the game
  // Alerting which player will start the game
  let message = 'Player ' + start + ' will start.'
  window.alert(message) 
})