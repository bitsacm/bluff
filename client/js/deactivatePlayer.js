/*
 * Deactivates the player whose id is passed to it
 * The deactivated player cant click on the cards or the 'Done' button
 */


function deactivatePlayer (playerId) {
  const fromPlayer = document.getElementById(playerId)
  const playerChildren = fromPlayer.childNodes
  for ( let i = 1; i < playerChildren.length-1; i++) {
    playerChildren[i].setAttribute('style', 'pointer-events: none')
  }
  fromPlayer.querySelector('.buttons').disabled = true 
}
