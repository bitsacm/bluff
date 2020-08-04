// init

/*
 suits, values(ranks) declared
 */
const suits = ['spades', 'clubs', 'hearts', 'diams']    //Array of Card Suits
const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']   //Array of possible card-ranks ie. values.

/*
 * Card and Deck classes to create Card and Deck objects, Card object is used inside Deck.
 */

class Card {
  constructor (cardSuit, cardValue) {
    this.suit = cardSuit    
    this.value = cardValue
  }
}

class Deck {
  constructor () {
    this.deck = []
  }

  formDeck (suits, values) {
    suits.forEach((suit) => {
      values.forEach((value) => {
        this.deck.push(new Card(suit, value))
      })
    })
    this.deck.push(new Card('Joker', 'Joker')) // Two Joker Cards pushed to Deck
    this.deck.push(new Card('Joker', 'Joker'))
    return this.deck
  }

  shuffleDeck () {
    for (let i=0; i<this.deck.length; i++){          //Iterating through every position and swapping it with another random position
      let randomPosition = Math.floor(Math.random()*(this.deck.length))
      let temp = this.deck[randomPosition]
      this.deck[randomPosition] = this.deck[i]
      this.deck[i] = temp
    } 
  return this.deck
  }

}

  /*
   * Render one card at a time with a Parent newCard div and child cardSuit and cardValue
   * all divs are assigned their class names for styling reference  
   */
function renderDeck (deck) {
  const playerCards = document.createElement('div')  //Separate parent div to store cards of individual players
  playerCards.className = 'PlayerDiv'
  deck.forEach((card) => {
    const newCard = document.createElement('div')
    const cardValue = document.createElement('div')
    const cardSuit = document.createElement('div')
    if (card.value !== 'Joker') {
      cardSuit.innerHTML = '&' + card.suit + ';'  // Making use of HTML codes for symbols eg. hearts= &hearts;
      cardValue.innerHTML = card.value
      cardSuit.className = card.suit
    } else {
      cardSuit.innerHTML = '&#9884;'                      // Weird Lily-like suit-symbol for Joker
      cardValue.innerHTML = card.value
      cardSuit.className = card.suit
    }
    newCard.className = 'Card'
    cardValue.className = 'cardRank'
    newCard.appendChild(cardValue)
    newCard.appendChild(cardSuit)
    playerCards.appendChild(newCard)
  })
  document.getElementById("root").appendChild(playerCards)
}

/*
 * First dividing cards equally to all players and them the remainder n cards given 1 each to the first n players
 */
function distributeCards (playerCount, deck) {
  let parts = []
  let playerCards = {}
  let cardCount =  deck.length
  for (let i = 0; i< playerCount; i++) {
    parts[i]=Math.floor(cardCount/playerCount)
  }
  for (let i = 0; i< cardCount%playerCount; i++) {
    parts[i]+=1
  }
  let temp = deck
  for (let i =0; i< playerCount; i++){
    playerCards['Player '+ (i+1)] = temp.slice(0, parts[i])
    temp = temp.splice(parts[i])
  }
  return playerCards
}

/* This Function will execute when Window Loads 
*/
window.addEventListener ('DOMContentLoaded', () => {
  let playerCount = window.prompt("Number of Players (Between 2 and 12):")
  do {       //Taking input of the number of players till the entered number is between 2 & 12
    if (!(playerCount > 2 && playerCount <= 12))
      playerCount = window.prompt("ERROR: The number of Players should be between 2 and 12")
    else
      break
  }while(true)
  const newDeck = new Deck()       //Create a new Deck instance
  for (let i = 0; i< (playerCount/5); i++) //Adding a deck for every 5 players
    newDeck.formDeck(suits, values)  // Populating Deck with Cards with suits and values from the respective arrays
  let completeDeck = newDeck.shuffleDeck()
  let players = distributeCards(playerCount, completeDeck)
  for (let i = 0; i< playerCount; i++)
    renderDeck(players['Player '+(i+1)]) //rendering each individual players' cards to screen
})

