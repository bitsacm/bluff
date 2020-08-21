/* eslint-disable no-unused-vars */
/*
 * Card class whose objects are used inside Game Decks.
 */

class Card {
  constructor (cardSuit, cardValue, cardId) {
    this._suit = cardSuit
    this._value = cardValue
    this._id = cardId
  }

  get suit () {
    return this._suit
  }

  get value () {
    return this._value
  }

  get id () {
    return this._id
  }
}
