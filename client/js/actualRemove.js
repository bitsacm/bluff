// Removing cards from the players which are selected
function actualRemove (players, playerCount, ids) {
  for (let i = 0; i < playerCount; i++) {
    for (let j = 0; j < ids.length; j++) {
      // Creating a temp variable to store the cards whose ids are not equal to selected ids
      const temp = []
      temp.push(players[i].playerCards.filter(card => card.id !== parseInt(ids[j])))
      // Replacing the playerCards with temp array
      players[i].playerCards = temp[0]
      players[i].numberOfCards = players[i].playerCards.length
    }
  }
}
