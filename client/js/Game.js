/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
// Will take care of the game attributes like creating players, distributing cards and so on.

class Game {
  constructor () {
    this.suits = ['spades', 'clubs', 'hearts', 'diams'] // Array of Card Suits
    this.values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'] // Array of possible card-ranks ie. values.
    this.deck = []
    this.players = []
    this.centralStack = []  //Central stack to store cards that are clicked upon and moved by players
    this.idNumber = 1 
  }

  start() {
    // input the number of players
    let playerCount = window.prompt('Enter the number of players(Between 2 and 12): ')

    while (true) {
      if (playerCount <= 2 || playerCount > 12) {
        playerCount = window.prompt('Number of players should bew between 2 and 12')
      } else {
        break
      }
    }

    // create a deck for every 4 players
    for (let i = 0; i < (playerCount / 4); i++) {
      this.addDeck()
    }

    // shuffle
    this.shuffle()
  
    // Creating n players based on user input
    this.createPlayers(playerCount)
  
    // Distribute the cards to n players created before
    this.distributeCards() 

    // render cards for every player
    this.players.forEach((player) => renderDeck(player.name, player.cards, this))
  }

  // add a 54 card deck to the cards beinf used in this game
  addDeck() {
    // iterate over the suits and the values generating a new card.
    this.suits.forEach((suit) => {
      this.values.forEach((value) => {
        this.deck.push(new Card(suit, value, this.idNumber++))
      })
    })

    // Two Joker Cards pushed to Deck.
    this.deck.push(new Card('Joker', 'Joker', this.idNumber++)) 
    this.deck.push(new Card('Joker', 'Joker', this.idNumber++))
  }

  shuffle () {
    // Starting from the last element and going to the first element
    for (let i = this.deck.length - 1; i >= 0; i--) {
      // Random number between 0 and i
      const j = Math.floor(Math.random() * i) + 1

      // Exchanging the cards on postion i and j
      const temp = this.deck[i]
      this.deck[i] = this.deck[j]
      this.deck[j] = temp
    }
  }

  // Creating players based on the user input
  createPlayers(playerCount) {
    // create the players one at time and push them to the game object's players attribute
    for (let i = 0; i < playerCount; i++) {
      this.players.push(new Player('Player ' + (i + 1)))
    }

    // Array to store the number of cards each player should get.
    const parts = []

    const cardCount = this.deck.length
    
    // first, evenly distribute the cards among the players
    for (let i = 0; i < playerCount; i++) {
      parts[i] = Math.floor(cardCount / playerCount)
    }

    // give the reamining cards to the players in sequence
    for (let i = 0; i < cardCount % playerCount; i++) {
      parts[i] += 1
    }

    // Attaching the number of cards each player gets to the player, to keep track of the number of cards the player has
    for (let i = 0; i < playerCount; i++) {
      this.players[i].numberOfCards = parts[i]
    }
  }

  // Distribute cards to each player
  distributeCards() {
    let temp = this.deck
    for (let j = 0; j < this.players.length; j++) {
      // Giving the slice of cards each player will get
      this.players[j].cards = temp.slice(0, this.players[j].numberOfCards)
      // Reamaining cards for the next iteration
      temp = temp.splice(this.players[j].numberOfCards)
    }
  }
}
