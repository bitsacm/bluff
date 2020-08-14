// Deactivating the previously active player
function deactivatePlayer(game) {
    let playerDiv = document.querySelectorAll('.PlayerDiv')
    playerDiv.forEach((player) => {
        let playerName = player.getElementsByTagName('h1')[0].textContent
        if (playerName === 'Player ' + (game.turn - 1)) { // Checking if it is the previous player or not
            let activate = player.querySelectorAll('.Card')
            let buttonactive = player.querySelector('.buttons')
            activate.forEach((Card) => {
            Card.setAttribute('style', 'pointer-events:none') // Deactivating all Cards for previous player
            })
            buttonactive.disabled = true // Deactivating the button for previous player
        }
    })
}