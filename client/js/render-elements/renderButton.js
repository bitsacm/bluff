/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
function renderButton (game) {
  const button = document.createElement('button')
  button.innerHTML = 'Finished selecting'
  button.className = 'buttons'
  button.addEventListener('click', () => {
    const player = game.players.find(player => player.name === button.parentNode.id)
    const initialNoOfCards = game.centralStack.length
    player.selectedCards.forEach((id) => {
      const card = document.getElementById(id)
      card.parentNode.removeChild(card)
      player.cards.forEach((card, i) => {
        if (String(card.id) === String(id)) {
          // Adding the clicked Card to Central Stack array
          game.centralStack.push(card)
          player.cards.splice(i, 1)
          player.numberOfCards = player.cards.length
          // rendering another flipped card to central deck
          cardStack()
        }
      })
    })
    player.selectedCards = []
    const finalNoOfCards = game.centralStack.length

    deactivatePlayer(game)
    bluffData(game, initialNoOfCards, finalNoOfCards)

    // To see the current state of central stack
    console.log(game.centralStack)
  })
  return button
}
