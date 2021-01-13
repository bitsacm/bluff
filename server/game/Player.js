class Player {
  constructor (id, name, room) {
    this._id = id
    this._name = name
    this._room = room
    this._cards = []
  }

  get id () {
    return this._id
  }

  get name () {
    return this._name
  }

  get room () {
    return this._room
  }

  get cards () {
    return this._cards
  }

  set cards (cards) {
    this._cards = cards
  }
}

module.exports = Player
