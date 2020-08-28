/* eslint-disable no-unused-vars */
// Strating a new round
function startNewRound (game) {
  // Empty the centralStack
  game.centralStack = []
  // Setting the record to empty array
  game.record = []
  // Setting the currentRank to null
  game.currentRank = ''
  // Removing all the cards from visual centralStack
  const removedCards = document.getElementById('CentralStack').querySelectorAll('.Card')
  removedCards.forEach(card => card.remove())
  // Updating the h2 containing the current rank
  document.getElementsByTagName('h2')[0].innerHTML = 'Current Rank: '
}
