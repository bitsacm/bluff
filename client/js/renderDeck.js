/* eslint-disable no-unused-vars */
/*
     * Render one card at a time with a Parent newCard div and child cardSuit and cardValue
     * newCard is a child element of #root
     * all divs are assigned their class names for styling reference
     */
function renderDeck (name, deck, game) {
  const playerCards = document.createElement('div') // Separate parent div to store cards of individual players
  playerCards.className = 'PlayerDiv'
  playerCards.id = name
  const playerName = document.createElement('h1') // Seperate element to display the name of the player
  playerName.textContent = name
  playerCards.appendChild(playerName)
  deck.forEach((card) => {
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
    newCard.addEventListener("click", (e) => {    // Unselect and select a card functionalities by checking presence of id in array
      const player = game.players.find(player => player.name === newCard.parentNode.id)

      if (player.selectedCards.includes(newCard.id)){
        player.selectedCards.splice(player.selectedCards.indexOf(newCard.id), 1)
        newCard.style.zIndex = "0"
        newCard.style.border = ""
      }
      else {
        player.selectedCards.push(newCard.id)
        newCard.style.border = "3px solid blue"
        newCard.style.zIndex = "1"
      }

      console.log(player.selectedCards)
    })
    playerCards.appendChild(newCard)
  })
  const moveButton = document.createElement("button")
  moveButton.innerHTML = "Finished selecting"
  moveButton.className = "buttons"
  moveButton.addEventListener("click", () => {
    const player = game.players.find(player => player.name === moveButton.parentNode.id)
    player.selectedCards.forEach ((id) => {
      const card = document.getElementById(id)
      card.parentNode.removeChild(card)
        player.cards.forEach ((card, i) => {
          if (card.id == id) {
            game.centralStack.push(card) //Adding the clicked Card to Central Stack array
            player.cards.splice(i, 1)
            player.numberOfCards = player.cards.length
            cardStack ()  //rendering another flipped card to central deck
          } 
        })
    })
    player.selectedCards = []
    console.log(game.centralStack)      // To see the current state of central stack
  }) 
  playerCards.appendChild(moveButton)
  document.getElementById('root').appendChild(playerCards)
}
