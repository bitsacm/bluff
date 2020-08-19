/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
// Function to check whether the player bluffed or not
function check (game, initialNoOfCards, finalNoOfCards) {
  // assume that the player has not bluffed
  game.record = 'Not Bluffed'
  // Looping through cards added in this chance and checking for bluff
  for (let i = initialNoOfCards; i < finalNoOfCards; i++) {
    if (game.centralStack[i].value !== game.currentRank && game.centralStack[i].value !== 'Joker') {
      game.record = 'Bluffed'
    }
  }

  // Calculating the number of cards added in this chance
  const noOfCardsMoved = finalNoOfCards - initialNoOfCards
  const msg = game.players[game.turn].name + ' added ' + noOfCardsMoved + ' card(s) to the stack.'
  window.alert(msg)

  if (game.turn === game.players.length - 1) {
    game.turn = 0
  } else {
    game.turn += 1
  }

  activatePlayer(game) // Activating the next player

  console.log(game.record) // To see whether last player bluffed or not
}
