// init
// An Array of card suites
const suits = ['spades', 'diamonds', 'clubs', 'hearts']
// This will hold all possible values of cards except the jokers
const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A']

// It will return a new deck of cards to the caller
function createDeck () {
  const deck = []

  for (let i = 0; i < suits.length; i++) {
    for (let j = 0; j < values.length; j++) {
      // Pairing each value of suit to each possible value of cards
      const card = { Value: values[j], Suit: suits[i] }
      // adding each created card to our deck
      deck.push(card)
    }
  }

  // Adding jokers to the deck
  const joker1 = {}
  joker1.Value = 'Joker'
  joker1.Suit = 'Joker'
  const joker2 = {}
  joker2.Value = 'Joker'
  joker2.Suit = 'Joker'
  deck.push(joker1)
  deck.push(joker2)

  // Returning the deck
  return deck
}

// Rendering the deck of cards on the screen
function renderDeck (deck) {
  // Iterating over all cards in the deck
  // Creating a div for every card to attach it with an element with id "root"
  // A div to hold the value of a card
  // A div to hold the suit of a card
  // Adding classes for help in css
  for (let i = 0; i < deck.length; i++) {
    const card = document.createElement('div')
    const value = document.createElement('div')
    const suit = document.createElement('div')
    card.className = 'card'
    value.className = 'value'
    suit.className = 'suit ' + deck[i].Suit

    // Setting the value of the card
    // Adding value to the card
    // Adding suit to the card
    value.innerHTML = deck[i].Value
    card.appendChild(value)
    card.appendChild(suit)

    // Appending all cards of the deck as a child to the element with id "root" one at a time
    document.getElementById('root').appendChild(card)
  }
}

// Executing after the page is loaded
window.addEventListener('DOMContentLoaded', () => {
  // Creating a new deck of cards
  const deck1 = createDeck()
  // Rendering the newly created deck of cards
  renderDeck(deck1)
})
