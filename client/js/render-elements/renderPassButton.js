/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
// Rendering a Pass button on the screen
function renderPassButton (game) {
  // Creating a button
  const passButton = document.createElement('button')
  passButton.innerHTML = 'Pass'
  passButton.className = 'buttons'
  // Adding an event listener to the pass button
  passButton.addEventListener('click', () => {
    if (game.record.length !== 0) {
    // Initialising number of passes to 0 everytime the button is clicked
      let numberOfPass = 0
      game.record.push('Pass')
      const msg = game.players[game.turn].name + ' passed'
      window.alert(msg)
      // Deactivating the current player
      deactivatePlayer(game.turn)
      // Looping through the record and calculating the number of consecutive passes
      for (let i = game.record.length - 1; i >= 0; i--) {
        if (game.record[i] === 'Pass') {
          numberOfPass += 1
        } else {
          break
        }
      }
      // Checking if all the players have passed or not
      if (numberOfPass === game.players.length) {
        window.alert('All players have passed.\nEnding round...')
        startNewRound(game)
      }
      // Changing turn to the next player
      if (game.turn !== game.players.length - 1) {
        game.turn += 1
        activatePlayer(game)
      } else {
        game.turn = 0
        activatePlayer(game)
      }
      // Keeping track of the record
      console.log(game.record)
    } else {
      window.alert("You can't pass!!")
    }
  })
  return passButton
}
