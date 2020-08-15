/* 
 * Activates the player whose id is passed to the function
 * Activates their cards and 'Done' button
 */


function activatePlayer (playerId) {
  const fromPlayer = document.getElementById(playerId)
  const playerChildren = fromPlayer.childNodes
  for ( let i = 1; i < playerChildren.length-1; i++) {
    playerChildren[i].setAttribute('style', 'pointer-events: auto')
  }
  fromPlayer.querySelector('.buttons').disabled = false 
}
