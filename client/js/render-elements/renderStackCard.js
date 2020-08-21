/* eslint-disable no-unused-vars */
/*
 * To add 'dummy' flipped cards to the rendered Central Deck
 * This is different from the CentralDeck array that actually stores the cards moved to the central deck
 */

function renderStackCard () {
  const card = document.createElement('div')
  card.className = 'Card'
  const cardText = document.createElement('div')
  cardText.innerHTML = 'BLUFF!?'
  cardText.className = 'cardRank'
  card.appendChild(cardText)
  document.getElementById('CentralStack').appendChild(card)
}
