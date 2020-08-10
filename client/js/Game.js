/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
// Will take care of the game attributes like creating players, distributing cards and so on.

class Game {
  constructor () {
    this.players = []
  }

  // Creating players based on the user input
  createPlayers (playerCount, deck) {
    for (let i = 0; i < playerCount; i++) {
      this.players.push(new Player('Player-' + (i + 1)))
    }
    const parts = [] // Array to store the number of cards each player should get.
    const cardCount = deck.length
    for (let i = 0; i < playerCount; i++) {
      parts[i] = Math.floor(cardCount / playerCount)
    }
    for (let i = 0; i < cardCount % playerCount; i++) {
      parts[i] += 1
    }
    // Attaching the number of cards each player gets to the player, to keep track of the number of cards the player has
    for (let i = 0; i < playerCount; i++) {
      this.players[i].numberOfCards = parts[i]
    }
  }

  // Distribute cards to each player
  distributeCards (playerCount, deck) {
    let temp = deck
    for (let j = 0; j < playerCount; j++) {
      // Giving the slice of cards each player will get
      this.players[j].playerCards = temp.slice(0, this.players[j].numberOfCards)
      // Reamaining cards for the next iteration
      temp = temp.splice(this.players[j].numberOfCards)
    }
    return this.players
  }
}
