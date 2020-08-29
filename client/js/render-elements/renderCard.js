/* eslint-disable no-unused-vars */
function renderCard (card, game) {
  const newCard = document.createElement('div')
  const cardValue = document.createElement('div')
  const cardSuit = document.createElement('div')
  if (card.value !== 'Joker') {
    cardSuit.innerHTML = '&' + card.suit + ';' // Making use of HTML codes for symbols eg. hearts= &hearts;
    cardValue.innerHTML = card.value
    cardSuit.className = card.suit
  } else {
    cardSuit.innerHTML = '&#9884;' // Weird Lily-like suit-symbol for Joker
    cardValue.innerHTML = card.value
    cardSuit.className = card.suit
  }
  newCard.id = card.id
  newCard.className = 'Card'
  cardValue.className = 'cardRank'
  newCard.appendChild(cardValue)
  newCard.appendChild(cardSuit)
  newCard.addEventListener('click', () => {
    // Unselect and select a card functionalities by checking presence of id in array
    const player = game.players.find(player => player.name === newCard.parentNode.id)

    if (player.selectedCards.includes(newCard.id)) {
      player.selectedCards.splice(player.selectedCards.indexOf(newCard.id), 1)
      newCard.style.zIndex = '0'
      newCard.style.border = ''
      if (player.selectedCards.length === 0) {
        const button = newCard.parentNode.lastChild
        button.innerHTML = "Pass"
      }
    } else {
      player.selectedCards.push(newCard.id)
      newCard.style.border = '3px solid blue'
      newCard.style.zIndex = '1'
      if (player.selectedCards.length === 1) {
        const button = newCard.parentNode.lastChild
        button.innerHTML = "Play Selected Cards"
      }
    }
  })
  return newCard
}
