function renderCheck (game) {
  const button = document.createElement ('button')
  button.innerHTML = 'Call Bluff'
  button.className = 'checkButtons'
  button.addEventListener('click', () => {

    const currentPlayer = game.players[game.turn] //The player that called Bluff
    const bluff = game.record === 'Bluffed'? true : false
    const lastPlayer = game.players[game.lastTurn]//last player to not pass
    console.log(currentPlayer, lastPlayer)
   
    if (game.firstMove) {
      window.alert("The first player can not call a bluff, please!")
    } else if (bluff) {
      game.centralStack.forEach ((card) => {
        // Bluff was caught, so cards added to the player who bluffed.
        lastPlayer.cards.push (card)
        const parent = document.getElementById(lastPlayer.name)
        //rendering the cards that were added
        parent.insertBefore ( renderCard (card, game), parent.querySelectorAll('.checkButtons')[0])
      })
      const msg = lastPlayer.name+" was caught bluffing. "+game.centralStack.length+" cards added to them."
      window.alert(msg)
      //Starting the next round of the game
      nextRound (game)
    } else {
      game.centralStack.forEach ((card) => {
        // Last move wasn't a bluff, so cards from centralStack added to current Player
        currentPlayer.cards.push (card)
        const parent = document.getElementById(currentPlayer.name)
        parent.insertBefore ( renderCard (card, game), parent.querySelectorAll('.checkButtons')[0])
      })
      const msg = lastPlayer.name+" wasn't bluffing. "+game.centralStack.length+" cards added to "+currentPlayer.name
      window.alert(msg)
      // Next round starts with the person whose truth was called a bluff.
      game.turn = game.lastTurn
      nextRound (game)
      } 
  })
return button
}
