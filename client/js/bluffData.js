/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
// Storing data if the player bluffed or not 
function bluffData(game, centralStack, initialNoOfCards, finalNoOfCards) {
    if(game.data === '') { // Checking if it is the first chance or not 
        document.getElementById('cardModal').style.display = "block" // Displaying the modal
        document.getElementById('submit').onclick = function() { // Adding an onClick to the submit button of the modal
            game.data = submitCard(game,centralStack, initialNoOfCards, finalNoOfCards) // Storing the current rank to game.data
        }
    }
    else {
        check(game, game.data, centralStack, initialNoOfCards, finalNoOfCards) // If not the first turn, check if the player bluffed or not
    }
}