/* eslint-disable no-undef */
const { decks } = require('cards')
const { io } = require('../app')

class Game {
  constructor (name) {
    this._name = name
    this._players = []
    this._hasStarted = false
    this._deck = null
    this._sendCardsIndex = 0
    this._cardId = 0
    this._centralStack = []
    this._lastTurn = []
    this._currentRank = undefined
    this._currentRound = []
    this._turn = undefined
  }

  get name () {
    return this._name
  }

  get players () {
    return this._players
  }

  get deck () {
    return this._deck
  }

  get turn () {
    return this._turn
  }

  get state () {
    if (!this._hasStarted) {
      const playerList = []

      this._players.forEach(player => playerList.push({ name: player.name }))

      return { playerList: playerList,
               room: this.name }
    } else {
      const playerList = []
      const records = []
      let firstTurn = false

      this._players.forEach((player) => playerList.push({
        name: player.name,
        numberOfCards: player.cards.length
      }))

      this._currentRound.forEach((record) => {
        if (record.cards === 'Pass') {
          records.push(record.player.name + ' passed.')
        } else {
          records.push(record.player.name + ' added ' + record.cards.length + ' cards.')
        }
      })

      if (this._centralStack.length === 0) {
        firstTurn = true
      }

      return {
        playerList: playerList,
        totalCentralStackSize: this._centralStack.length,
        lastTurnSize: this._lastTurn.length,
        currentRank: this._currentRank,
        currentRound: records,
        turn: this._players[this._turn].name,
        firstTurn: firstTurn,
        room: this.name
      }
    }
  }

  playCards (player, cards, rank = this._currentRank) {
    this._verifyPlayer(player)

    const lastNonPassTurn = this._currentRound.reverse().find((turn) => turn.cards !== 'Pass')
    this._currentRound = this._currentRound.reverse()

    if (lastNonPassTurn && lastNonPassTurn.player.cards.length === 0) {
      return this._win(lastNonPassTurn.player)
    }

    this._addToCentralStack(player, cards, rank)
    this._addToRecord(player, cards)

    this._nextTurn()
  }

  pass (player) {
    this._verifyPlayer(player)

    if (player.cards.length === 0) {
      return this._win(player)
    }

    this._addToRecord(player, null)
    this._nextTurn()
  }

  checkBluff (player) {
    this._verifyPlayer(player)

    if (this._centralStack.length === 0) {
      throw new Error('cannot check bluff')
    }

    const lastNonPassTurn = this._currentRound.reverse().find((turn) => turn.cards !== 'Pass')

    if (lastNonPassTurn.player.id === player.id) {
      throw new Error('cannot call bluff on yourself')
    }

    const bluffed = lastNonPassTurn.cards.find(card => (card.rank.shortName !== this._currentRank) && (card.rank.shortName !== 'Joker'))

    if (bluffed) {
      lastNonPassTurn.player.cards = lastNonPassTurn.player.cards.concat(this._centralStack)

      if (player.cards.length === 0) {
        return this._win(player)
      }
    } else {
      player.cards = player.cards.concat(this._centralStack)

      // return turn to the player who had not bluffed
      this._turn = this._players.findIndex(player => player.id === lastNonPassTurn.player.id)
    }

    this._resetRound()
  }

  /**
   * add player to the game
   * @param {Player} p player to be added
   */
  addPlayer (p) {
    // check for max number of players
    if (this._players.length === 6) {
      throw new Error('Room full')
    }
    // check if game has already started
    if (this._hasStarted) {
      throw new Error('Game already started')
    }
    // Check for existing user
    if (this._players.find(player => player.name === p.name)) {
      throw new Error('Username already in use.')
    }

    this._players.push(p)
  }

  /**
   * remove player from the game
   * @param {Player} p player to be removed from the game
   */
  removePlayer (p) {
    this._players = this._players.filter(player => player.id !== p.id)
    this._turn = this._turn % this.players.length

    if (this.players.length === 1) {
      this._win(this.players[0])
    }
  }

  _win(player) {
    io.sockets.in(player.room).emit('win', player.name)
  }

  start () {
    if (this._hasStarted) {
      throw new Error('Game already started')
    }

    this._hasStarted = true
    this._sendCardsIndex = 1
    this._turn = 0

    const deck = this._getDeck()
    deck.shuffleAll()

    this._deck = deck

    this._players.forEach(player => this._allocateCards())
  }

  /**
   * add the cards to the central stack
   * @param {Player} player player who tried to move cards
   * @param {Array<Card>} cards the cards they moved
   * @param {string} rank the rank of card player has played
   */
  _addToCentralStack (player, cards, rank = this._currentRank) {
    if (this._centralStack.length === 0) {
      this._currentRank = rank
    }

    this._centralStack = this._centralStack.concat(cards)
    this._lastTurn = [...cards]

    for (let i = 0; i < cards.length; i++) {
      player.cards = player.cards.filter(card => !(card.id === cards[i].id))
    }
  }

  /**
   * Add entry to the current round record
   * @param {Player} player player who tried to make the move
   * @param {Array<Card>} cards the cards they moved
   */
  _addToRecord (player, cards) {
    if (!cards) {
      this._currentRound.push({ player: player, cards: 'Pass' })
    } else {
      this._currentRound.push({ player: player, cards: [...cards] })
    }
  }

  _nextTurn () {
    this._turn = (this._turn + 1) % this._players.length

    let count = 0

    // count number of continuous passes
    for (let i = this._currentRound.length - 1; i >= 0; i--) {
      if (this._currentRound[i].cards === 'Pass') {
        count++
      } else {
        break
      }
    }

    if (count === this._players.length) {
      this._resetRound()
    }
  }

  _resetRound () {
    this._centralStack = []
    this._lastTurn = []
    this._currentRank = undefined
    this._currentRound = []
  }

  /**
   * verify that the player whose turn it is the one playing the cards
   * @param {Player} player the player who tried to play the cards
   */
  _verifyPlayer (player) {
    if (this._players[this._turn].id !== player.id) {
      throw new Error('Not your turn')
    }
  }

  _allocateCards () {
    const numberOfPlayers = this._players.length
    const deckSize = this._deck.totalLength
    const numberOfCardsPerPlayer = Math.floor(deckSize / numberOfPlayers)

    const hand = this._deck.draw(numberOfCardsPerPlayer)

    if (this._sendCardsIndex <= deckSize % numberOfPlayers) {
      hand.push(this._deck.draw()[0])
    }

    for (let i = 0; i < hand.length; i++) {
      hand[i] = { ...hand[i] }
      hand[i].id = String(this._cardId++)
    }

    this._players[this._sendCardsIndex - 1].cards = hand
    this._sendCardsIndex++

    return hand
  }

  _getDeck () {
    // Create a standard 52 card deck + 2 jokers
    const deck = new decks.StandardDeck({ jokers: 2 })

    // for more than 5 players add a deck
    if (this._players.length > 5) {
      deck.merge(new decks.StandardDeck({ jokers: 2 }))
    }

    return deck
  }
}

module.exports = Game
