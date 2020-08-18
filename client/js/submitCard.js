// Function which executes when the submit button is clicked 
function submitCard(game, centralStack, initialNoOfCards, finalNoOfCards) {
    const modal = document.getElementById('cardModal')
    modal.style.display = 'none' // Removing the modal from the screen
    const selectedCard = document.getElementById('selectCard') // Storing all the options in select menu
    let optSelected = null
    // Looping thropugh the options to check if the option was selected or not
    for ( let i = 0; i < selectedCard.options.length; i++) {
        optSelected = selectedCard.options[i]
        if ( optSelected.selected === true) {
            break // If option was selected
        }
    }
    const h2 = document.getElementsByTagName('h2')[0]
    h2.innerHTML = 'Current Rank: ' + optSelected.value // Updating the h2 inside centralStack
    check(game, optSelected.value, centralStack, initialNoOfCards, finalNoOfCards) // Calling check for the first time
    return optSelected.value // Return the value of selected option
}