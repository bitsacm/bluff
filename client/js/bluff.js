/* eslint-disable no-undef */
// init

/* This Function will execute when Window Loads
*/
window.addEventListener('DOMContentLoaded', () => {
  playerCount = window.prompt('Enter the number of players(Between 2 and 12): ')
  while (true) {
    if (playerCount <= 2 || playerCount > 12) {
      playerCount = window.prompt('Number of players should bew between 2 and 12')
    } else {
      break
    }
  }
  centralStack = []  //Central stack to store cards that are clicked upon and moved by players
  lastMove = [] //Store the cards that the last player moved
  const newDeck = new Deck() // Create a new Deck instance
  for (let i = 0; i < (playerCount / 4); i++) {
    newDeck.formDeck()
  }
  const finalDeck = newDeck.shuffleDeck() // Creating a final deck to be used after shuffling
  const game = new Game() // Create a new Game instance
  game.createPlayers(playerCount, finalDeck) // Creating n players based on user input
  console.log(game)
  players = game.distributeCards(playerCount, finalDeck) // Distribute the cards to n players created before
  console.log(players)
  for (let i = 0; i < playerCount; i++) {
    renderDeck(players[i].playerName, players[i].playerCards, i+1) // Rendering the cards of players on the screen
  }
  activatePlayer ("P1") //Other players deactivated by default in renderDeck()
})

  let gameRank = null      //Rank for the current round of the game stored globally
  let currentPlayerID = "P1"  
  let lastMoveBluff = false 
  let playerCount = 0      //playerCount being taken as input from prompt
  let numberOfMoves = 0    //Keeping track of number of moves that have happened
