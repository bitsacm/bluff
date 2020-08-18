// Activating the next player
function activatePlayer(game){
    const playerList = document.getElementById('root').children
    const currentPlayer = playerList[game.turn + 1]
    const activate = currentPlayer.querySelectorAll('.Card')
    const buttonactive = currentPlayer.querySelectorAll('.buttons')[0]
    activate.forEach((Card) => {
        Card.style['pointer-events'] = 'auto' // Activating all Cards for current player
        })
    buttonactive.disabled = false // Activating the button for current player
    const currentPlayerName = currentPlayer.getElementsByTagName('h1')[0].textContent
    document.getElementsByTagName('h2')[1].innerHTML = 'Current Player: ' + currentPlayerName
}