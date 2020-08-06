/* eslint-disable no-unused-vars */
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
  /*
  suits, values(ranks) declared
  */
    this.suits = ['spades', 'clubs', 'hearts', 'diams'] // Array of Card Suits
    this.values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'] // Array of possible card-ranks ie. values.
    this.deck = []
  }

  formDeck () {
    this.suits.forEach((suit) => {
      this.values.forEach((value) => {
        this.deck.push(new Card(suit, value))
      })
    })
    this.deck.push(new Card('Joker', 'Joker')) // Two Joker Cards pushed to Deck
    this.deck.push(new Card('Joker', 'Joker'))
    return this.deck
  }

  // Shuffling the deck
  shuffleDeck () {
    // Starting from the last element and going to the first element
    for (let i = this.deck.length - 1; i >= 0; i--) {
      const j = Math.floor(Math.random() * i) + 1 // Random number between 0 and i
      const temp = this.deck[i] // Exchanging the cards on postion i and j
      this.deck[i] = this.deck[j]
      this.deck[j] = temp
    }
    return this.deck
  }
}
