// Deactivating the previously active player
function deactivatePlayer(game) {
    const playerList = document.getElementById('root').children
    const currentPlayer = playerList[game.turn + 1]
    const activate = currentPlayer.querySelectorAll('.Card')
    const buttonactive = currentPlayer.querySelectorAll('.buttons')[0]
    activate.forEach((Card) => {
        Card.style['pointer-events'] = 'none' // Activating all Cards for current player
        })
    buttonactive.disabled = true // Activating the button for current player
}