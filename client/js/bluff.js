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

  /*
   * Render one card at a time with a Parent newCard div and child cardSuit and cardValue
   * newCard is a child element of #root
   * all divs are assigned their class names for styling reference  
   */
  renderDeck () {
    this.deck.forEach((card) => {
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
      document.getElementById("root").appendChild(newCard)
    })
  }
}



/* This Function will execute when Window Loads 
*/
window.addEventListener ('DOMContentLoaded', () => {
  const newDeck = new Deck()       //Create a new Deck instance
  newDeck.formDeck(suits, values)  // Populating Deck with Cards with suits and values from the respective arrays
  newDeck.renderDeck()
});
