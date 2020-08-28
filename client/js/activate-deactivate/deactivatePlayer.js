/* eslint-disable no-unused-vars */
// Deactivating the previously active player
function deactivatePlayer (turn) {
  const players = document.querySelectorAll('.PlayerDiv')
  const currentPlayer = players[turn]

  const cards = currentPlayer.querySelectorAll('.Card')
  cards.forEach((card) => {
    // Activating all Cards for current player
    card.style['pointer-events'] = 'none'
  })

  // Disabling the button for current player
  const button = currentPlayer.querySelectorAll('.buttons')[0]
  button.disabled = true

  // Disabling the passButton for current player
  const passButton = currentPlayer.querySelectorAll('.buttons')[1]
  passButton.disabled = true

  // Disabling the checkButton for current player
  const checkButton = currentPlayer.querySelectorAll('.buttons')[2]
  checkButton.disabled = true
}
