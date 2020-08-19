/* eslint-disable no-unused-vars */
// Deactivating the previously active player
function deactivatePlayer (game) {
  const players = document.getElementById('root').children
  const currentPlayer = players[game.turn + 1]

  const cards = currentPlayer.querySelectorAll('.Card')
  cards.forEach((card) => {
    // Activating all Cards for current player
    card.style['pointer-events'] = 'none'
  })

  // Disabling the button for current player
  const button = currentPlayer.querySelectorAll('.buttons')[0]
  button.disabled = true
}
