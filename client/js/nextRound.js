function nextRound (game) {
  //refreshing all data for the game
  game.currentRank = ''
  game.passes = 0
  game.firstMove = true
  game.centralStack = []
  game.players.forEach ((player) => {
    player.selectedCards = []
  })
  deactivateAllPlayers ()
  activatePlayer (game)

  //Clearing the rendered Cards from Central Stack
  const centralStack = document.getElementById('CentralStack')
  const cards = Array.from(centralStack.getElementsByClassName('Card'))
  cards.forEach ((card)=> centralStack.removeChild(card))
}
