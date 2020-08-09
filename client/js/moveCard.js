function moveCard () {
  return function () {
  this.parentNode.removeChild(this)  //remove the card from the player's deck on screen
  players.forEach ((Player) => {     // looping over all players and finding the player who has the card with same id, ie player who clicked.
    Player.playerCards.forEach ((currentCard, i) => {
      if (currentCard.id == this.id) {
        console.log(Player.playerName)
        centralStack.push(currentCard) //Adding the clicked Card to Central Stack array
        Player.playerCards.splice(i, 1)
        Player.numberOfCards = Player.playerCards.length
        console.log(centralStack)      // To see the current state of central stack
        cardStack ()  //rendering another flipped card to central deck
      }
    })
  })
  }
}
