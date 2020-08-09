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
    newDeck.formDeck()
  }
  const finalDeck = newDeck.shuffleDeck() // Creating a final deck to be used after shuffling
  const game = new Game() // Create a new Game instance
  game.createPlayers(playerCount, finalDeck) // Creating n players based on user input
  players = game.distributeCards(playerCount, finalDeck) // Distribute the cards to n players created before
  for (let i = 0; i < playerCount; i++) {
    renderDeck(players[i].playerName, players[i].playerCards) // Rendering the cards of players on the screen
  }
  // Adding a onclick function to all the elements having class Card
  // which adds the class selected to each card when clicked and
  // removes it on clicking again
  const Cards = document.querySelectorAll('.Card')
  for (let i = 0; i < Cards.length; i++) {
    Cards[i].addEventListener('click', () => {
      if (Cards[i].classList.contains('selected')) {
        Cards[i].classList.remove('selected')
      } else {
        Cards[i].classList.add('selected')
      }
    })
  }
  // Adding a button at the bottom of the page to let the player transfer cards to the central stack
  var button = document.createElement('button')
  button.textContent = 'Transfer'
  button.class = 'button'
  document.getElementById('root').appendChild(button)
  // Adding an element centralStack to the page to show the visual representation of the centralStack
  var centralStack = document.createElement('div')
  centralStack.id = 'centralStack'
  document.getElementById('root').appendChild(centralStack)
  // This variable will actually store the values of centralStack,
  // above one was only a visual representation which is no where related to actual cards
  // just the number of cards is same in both
  const centralstack = []
  // Adding onClick event to the transfer button which calls the moveCard function
  button.addEventListener('click', () => {
    moveCard(centralstack, playerCount, game.players)
  })
})