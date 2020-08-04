
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
