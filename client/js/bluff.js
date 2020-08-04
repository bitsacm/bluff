// init

/*
 * Suits, values(ranks) declared.
 */
const suits = ['spades', 'clubs', 'hearts', 'diams']    //Array of Card Suits
const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']   //Array of possible card-ranks ie. values.


/*
 * This Function will execute when Window Loads. 
 */
window.addEventListener ('DOMContentLoaded', () => {
  let playerCount = window.prompt("Number of Players (Between 2 and 12):")
  do {       //Taking input of the number of players till the entered number is between 2 & 12
    if (!(playerCount > 2 && playerCount <= 12))
      playerCount = window.prompt("ERROR: The number of Players should be between 2 and 12")
    else
      break
  }while(true)
  const newDeck = new Deck()       //Create a new Deck instance.
  for (let i = 0; i< (playerCount/4); i++) //Adding a deck for every 5th player.
    newDeck.formDeck(suits, values)  // Populating Deck with Cards with suits and values from the respective arrays.
  let completeDeck = newDeck.shuffleDeck()
  let players = distributeCards(playerCount, completeDeck)
  for (let i = 0; i< playerCount; i++)
    renderDeck(players['Player '+(i+1)]) //rendering each individual players' cards to screen.
})

