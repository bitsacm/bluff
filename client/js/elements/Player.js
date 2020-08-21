/* eslint-disable no-unused-vars */
// Creating the player containing the name of the player,
// number of cards of the player and cards that the player has
// and the cards he has selected

class Player {
  constructor (name) {
    this._name = name
    this._cards = []
    this._selectedCards = []
  }

  get name () {
    return this._name
  }

  get cards () {
    return this._cards
  }

  set cards (cards) {
    this._cards = cards
  }

  get selectedCards () {
    return this._selectedCards
  }

  set selectedCards (cards) {
    this._selectedCards = cards
  }
}
