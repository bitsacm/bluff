/* eslint-disable no-unused-vars */
function deactivateAllPlayers () {
  // Storing all elements with class PlayerDiv
  const playerDivs = document.querySelectorAll('.PlayerDiv')
  playerDivs.forEach((player) => {
    // Looping through each player div element to deactivate them
    const cards = player.querySelectorAll('.Card')
    cards.forEach((card) => {
      // Deactivating click on each Card
      card.setAttribute('style', 'pointer-events:none')
    })
    // disabling the button
    const button = player.querySelectorAll('.buttons')[0]
    button.disabled = true
    // disabling the passButton
    const passButton = player.querySelectorAll('.buttons')[1]
    passButton.disabled = true
    // disabling the checkButton
    const checkButton = player.querySelectorAll('.buttons')[2]
    checkButton.disabled = true
  })
}
