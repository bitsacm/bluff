/* eslint-disable no-unused-vars */
// Creating the player containing the name of the player,number of cards of the player and cards that the player has

class Player {
  constructor (newId) {
    this.playerName = 'Player '+newId
    this.playerCards = []
    this.numberOfCards = 0
    this.turn = false
    this.id = 'P'+newId
  }
}
