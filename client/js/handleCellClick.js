/*
 * Handles clicking of cell by first player of each round
 */


function handleCellClick () {
  return function () { 
    gameRank = this.innerHTML
    let rankDisplay = document.createElement("h2")
    let centralDisplay = document.getElementById("CentralStack")
    rankDisplay.innerHTML = "Rank for this game: "+gameRank
    centralDisplay.insertBefore(rankDisplay, centralDisplay.firstChild)  //Can see game rank on top of central stack
    console.log(gameRank)
    this.parentNode.parentNode.removeChild(this.parentNode)
    console.log(checkBluff())                                            //CheckBluff for first player not called in ManageGame for this player
  }
}
