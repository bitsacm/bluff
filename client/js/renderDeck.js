
  /*
   * Render one card at a time with a Parent newCard div element and child cardSuit and cardValue
   * all divs are assigned their class names for styling reference  
   */
function renderDeck (deck) {
  const playerCards = document.createElement('div')  //Separate parent div to store cards of individual players
  playerCards.className = 'PlayerDiv'
  deck.forEach((card) => {
    const newCard = document.createElement('div')
    const cardValue = document.createElement('div')
    const cardSuit = document.createElement('div')
    if (card.value !== 'Joker') {
      cardSuit.innerHTML = '&' + card.suit + ';'  // Making use of HTML codes for symbols eg. hearts= &hearts;
      cardValue.innerHTML = card.value
      cardSuit.className = card.suit
    } else {
      cardSuit.innerHTML = '&#9884;'                      // Weird Lily-like suit-symbol for Joker
      cardValue.innerHTML = card.value
      cardSuit.className = card.suit
    }
    newCard.className = 'Card'
    cardValue.className = 'cardRank'
    newCard.appendChild(cardValue)
    newCard.appendChild(cardSuit)
    playerCards.appendChild(newCard)
  })
  document.getElementById("root").appendChild(playerCards)
}
