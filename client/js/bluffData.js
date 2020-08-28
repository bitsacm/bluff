/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
// Storing data if the player bluffed or not
function bluffData (game, initialNoOfCards, finalNoOfCards) {
  // Checking if it is the first chance or not
  if (game.currentRank === '') {
    // Displaying the modal
    document.getElementById('cardModal').style.display = 'block'

    // Adding an onClick to the submit button of the modal
    document.getElementById('submit').onclick = function () {
      // Storing the current rank to game.currentRank
      game.currentRank = submitCard()

      // Updating the h2 inside centralStack which shows the rank in play
      const h2 = document.getElementsByTagName('h2')[0]
      h2.innerHTML = 'Current Rank: ' + game.currentRank

      // Calling check for the first time
      check(game, initialNoOfCards, finalNoOfCards)
      game.firstMove = false
    }
  } else {
    // If not the first turn, check if the player bluffed or not or passed
    if(initialNoOfCards !== finalNoOfCards) {
      check(game, initialNoOfCards, finalNoOfCards)
    } else {
      passed(game)
    }
  }
}
