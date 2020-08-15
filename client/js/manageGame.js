/*
 * Activates next, Deactivates current player
 * Ensures that the first player enter the rank for the round
 * Ensures that the game continues from the last player to the first
 * Calls the checkBluff() function.
 */


function manageGame () {
  deactivatePlayer (currentPlayerID)
  if (numberOfMoves == 0){
    takeInput = inputGrid ()
    playerDiv = document.getElementById(currentPlayerID)
    playerDiv.lastChild.appendChild(takeInput)
    const cardsAdded = arrayId.length
    let playerNo = 0
    if (parseInt(currentPlayerID[1]) == playerCount){                // over to first player if current player was the last one
      playerNo = 1
      alert(arrayId.length+" Cards added by "+players[playerCount-1].playerName) 
    }
    else {
      playerNo = parseInt(currentPlayerID[1]) + 1
      alert(arrayId.length+" Cards added by "+players[playerNo-2].playerName) 
    }
    currentPlayerID = "P"+playerNo
    activatePlayer (currentPlayerID)
  }
  else{
    const cardsAdded = arrayId.length
    let playerNo = 0
    if (parseInt(currentPlayerID[1]) == playerCount){
      playerNo = 1
      alert(arrayId.length+" Cards added by "+players[playerCount-1].playerName) 
    }
    else {
      playerNo = parseInt(currentPlayerID[1]) + 1
      alert(arrayId.length+" Cards added by "+players[playerNo-2].playerName) 
    }
    currentPlayerID = "P"+playerNo
    activatePlayer (currentPlayerID)
    console.log(checkBluff())
  }
}
