/* eslint-disable no-unused-vars */
function renderPlayer (name) {
  // Separate parent div to store cards of individual players
  const player = document.createElement('div')
  player.className = 'PlayerDiv'
  player.id = name
  // Seperate element to display the name of the player
  const playerName = document.createElement('h1')
  playerName.textContent = name
  player.appendChild(playerName)
  return player
}
