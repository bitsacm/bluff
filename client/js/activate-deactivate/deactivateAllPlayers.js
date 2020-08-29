function deactivateAllPlayers() {
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
      const checkButton = player.querySelectorAll('.checkButtons')[0]
      checkButton.disabled = true
    })
  }
