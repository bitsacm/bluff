/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
// Rendering the check button
function renderCheckButton (game) {
  // Creating a check button
  const showButton = document.createElement('button')
  showButton.innerHTML = 'Check'
  showButton.className = 'buttons'
  let msg = ''
  showButton.addEventListener('click', () => {
    // Ensuring that the first player can't check
    if (game.record.length === 0) {
      window.alert("You can't check!!")
    }
    // Initialising a requiredPlayerIndex for storing the value of
    // the player to add cards in the case of bluffed or
    // the player who will be active in case of not bluffed
    let requiredPlayerIndex = 0
    // Setting the value of requiredPlayerIndex to be the index of player who was active before this turn
    if (game.turn !== 0) {
      requiredPlayerIndex = game.turn - 1
    } else {
      requiredPlayerIndex = game.players.length - 1
    }
    // Looping through the record
    for (let i = game.record.length - 1; i >= 0; i--) {
      if (game.record[i] === 'Pass') {
        // If it is pass then th requiredPlayerIndex will go one step back
        if (requiredPlayerIndex !== 0) {
          requiredPlayerIndex -= 1
        } else {
          requiredPlayerIndex = game.players.length - 1
        }
        // Skip this iteration and continue looping through record
        continue
      } else if (game.record[i] === 'Bluffed') {
        if (game.turn === requiredPlayerIndex) {
          window.alert("You can't check!!")
          break
        }
        // If the record is bluffed, push all the cards in the cards array of the player with index requiredPlayerIndex
        // Get the div corresponding to the player
        // and add the cards to that div before the first button
        game.centralStack.forEach(card => {
          game.players[requiredPlayerIndex].cards.push(card)
          const requiredPlayer = document.getElementById(game.players[requiredPlayerIndex].name)
          requiredPlayer.insertBefore(renderCard(card, game), requiredPlayer.querySelectorAll('.buttons')[0])
        })
        msg = game.players[requiredPlayerIndex].name + ' Bluffed. \n Adding ' + game.centralStack.length + ' card(s) to ' + game.players[requiredPlayerIndex].name
        window.alert(msg)
        // Deactivate the  player where cards where recently added
        deactivatePlayer(requiredPlayerIndex)
        startNewRound(game)
        activatePlayer(game)
        // Break from the loop
        // We don't need to do any more iteration
        break
      } else if (game.record[i] === 'Not Bluffed') {
        if (game.turn === requiredPlayerIndex) {
          window.alert("You can't check!!")
          break
        }
        // If the record is not bluffed, push all the cards in the cards array of the player with index game.turn
        // Get the div corresponding to the player
        // and add the cards to that div before the first button
        game.centralStack.forEach(card => {
          game.players[game.turn].cards.push(card)
          const requiredPlayer = document.getElementById(game.players[game.turn].name)
          requiredPlayer.insertBefore(renderCard(card, game), requiredPlayer.querySelectorAll('.buttons')[0])
        })
        msg = game.players[requiredPlayerIndex].name + ' did not bluff. \n Adding ' + game.centralStack.length + ' card(s) to ' + game.players[game.turn].name
        window.alert(msg)
        // Deactivate the player which checked
        deactivatePlayer(game.turn)
        // Set the game.turn to requiredPlayerIndex as
        // next turn will be of the player who had not bluffed
        game.turn = requiredPlayerIndex
        startNewRound(game)
        activatePlayer(game)
        // Break from the loop
        // We don't need to do any more iteration
        break
      }
    }
  })
  return showButton
}
