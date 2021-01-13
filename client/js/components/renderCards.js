/* eslint-disable no-unused-vars */

function renderCards (game) {
  let $myCardsDiv = document.getElementById('my-cards')

  if (!$myCardsDiv) {
    $myCardsDiv = document.createElement('div')
    $myCardsDiv.id = 'my-cards'

    document.getElementById('cards').appendChild($myCardsDiv)
  }

  $myCardsDiv.innerHTML = ''

  game.cards.forEach((card) => { renderCard(card, game) })
}

function renderCard (card, game) {
  const newCard = document.createElement('div')
  const cardValue = document.createElement('div')
  const cardSuit = document.createElement('div')

  if (card.rank.shortName !== 'Joker') {
    if (card.suit.name === 'diamonds') {
      cardSuit.innerHTML = '&diams;'
    } else {
      cardSuit.innerHTML = '&' + card.suit.name + ';' // Making use of HTML codes for symbols eg. hearts= &hearts;
    }
    cardValue.innerHTML = card.rank.shortName
    cardSuit.className = card.suit.name
  } else {
    cardSuit.innerHTML = '&#9884;' // Weird Lily-like suit-symbol for Joker
    cardValue.innerHTML = card.rank.shortName
    cardSuit.className = 'Joker'
  }

  newCard.id = card.id
  newCard.className = 'Card'
  cardValue.className = 'cardRank'

  newCard.appendChild(cardValue)
  newCard.appendChild(cardSuit)

  newCard.addEventListener('click', () => {
    if (game.selectedCards.includes(newCard.id)) {
      game.selectedCards.splice(game.selectedCards.indexOf(newCard.id), 1)

      // dehighlight card
      newCard.style.zIndex = '0'
      newCard.style.border = ''

      // if no cards selected then create pass button
      if (game.selectedCards.length === 0) {
        const button = document.getElementById('turnButton')
        button.innerHTML = 'Pass'
      }
    } else {
      game.selectedCards.push(newCard.id)

      // highlight card
      newCard.style.border = '3px solid blue'
      newCard.style.zIndex = '1'

      // if cards are selected then make play cards button
      if (game.selectedCards.length === 1) {
        const button = document.getElementById('turnButton')
        button.innerHTML = 'Play Selected Cards'
      }
    }
    console.log('Selected Cards', game.selectedCards)
  })
  document.getElementById('my-cards').appendChild(newCard)
}
