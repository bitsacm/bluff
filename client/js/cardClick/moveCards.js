function moveCards () {
  return function () {
    arrayId.forEach ((ID) => {
      const cardElement = document.getElementById(ID)
      cardElement.parentNode.removeChild(cardElement)
      players.forEach ((Player, j) => {     // looping over all players and finding the player who has the PlayerDiv with same id, ie player who clicked.
        if (Player.id == currentPlayerID) {
          Player.playerCards.forEach ((currentCard, i) => {
            if (currentCard.id == ID) {
              centralStack.push(currentCard) //Adding the clicked Card to Central Stack array
              Player.playerCards.splice(i, 1)
              Player.numberOfCards = Player.playerCards.length
              cardStack ()  //rendering another flipped card to central deck
              lastValues.push(currentCard.value)         //keeping track of the last card values pushed
            } 
          })
        }
      })
    })
    manageGame ()                   // Calling manageGame () every time cards are moved
    arrayId = []
    console.log(centralStack)      // To see the current state of central stack
    numberOfMoves++
  }
}
