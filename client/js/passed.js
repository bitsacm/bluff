function passed (game) {
  game.passes++
  const msg = game.players[game.turn].name + ' Passed!'
  window.alert(msg)
  if (game.turn === game.players.length - 1) {
    game.turn = 0
  } else {
    game.turn += 1
  }
  if (game.passes === game.players.length) {
    //Restarting the game if all players pass
    window.alert("All players have passed. The next round will start now")
    if(game.turn) {
      game.turn--
    } else {
      game.turn = game.players.length -1
    }
    nextRound(game)
  } else {
    activatePlayer(game) // Activating the next player
  }
}
