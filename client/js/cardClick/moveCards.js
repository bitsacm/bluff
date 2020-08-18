function moveCards (game, playerCount) {
  return function () {
    let initialNoOfCards = centralStack.length // Calculating no. of cards initially in the central stack 
    arrayId.forEach ((ID) => {
      const cardElement = document.getElementById(ID)
      cardElement.parentNode.removeChild(cardElement)
      players.forEach ((Player) => {     // looping over all players and finding the player who has the card with same id, ie player who clicked.
        Player.playerCards.forEach ((currentCard, i) => {
          if (currentCard.id == ID) {
            centralStack.push(currentCard) //Adding the clicked Card to Central Stack array
            Player.playerCards.splice(i, 1)
            Player.numberOfCards = Player.playerCards.length
            cardStack ()  //rendering another flipped card to central deck
          } 
        })
      })
    })
    arrayId = []
    console.log(centralStack)      // To see the current state of central stack
    const finalNoOfCards = centralStack.length // Calculating no. of cards in the Central Stack after adding new card(s) 
    if (game.turn ===  parseInt(playerCount)) { // Checking if it was last player's turn or not
      deactivatePlayer(game) // Deactivating the current player
      bluffData(game, centralStack, initialNoOfCards, finalNoOfCards)
    } 
    else {
      deactivatePlayer(game) // Deactivating the current player
      bluffData(game, centralStack, initialNoOfCards, finalNoOfCards)
    }
  }
}

