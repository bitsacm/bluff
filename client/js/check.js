// Function to check whether the player bluffed or not
// Turn will have a value 2 if last chance was of the last player
// not 1 as I am adding 1 to turn in activatePlayer itself
function check(game, data, centralStack, initialNoOfCards, finalNoOfCards) {    
    let j = 0 // Initialise a flag
    for (let i = initialNoOfCards; i < finalNoOfCards; i++) { // Looping through cards added in this chance
        if (centralStack[i].value !== 'Joker') { // Checking if value is not a joker
            if(centralStack[i].value === data) { // Comparing the value of newly added cards added to the data entered 
                j += 1 // Adding 1 to the flag if true card is added
            }
        }
        else {
            j += 1 // Also, adding 1 to the flag if the card added is a joker
        }
    }
    const noOfCardsMoved = finalNoOfCards - initialNoOfCards // Calculating the number of cards added in this chance
    if(game.turn !== 2) {
        if (game.record !== 0) {
            const msg = 'Player ' + (game.turn - 2) + ' added ' + noOfCardsMoved + ' card(s) to the stack.'
            window.alert(msg)
        }
        // If value of flag is equal to the number of cards added in this turn
        // Set record to not bluffed 
        if (j === noOfCardsMoved) { 
            game.record = 'Not Bluffed'
        }
        // Set record to Bluffed
        else {
            game.record = 'Bluffed'
        }
    }
    else {
        if (game.record !== 0) {
            const msg = 'Player ' +  game.players.length + ' added ' + noOfCardsMoved + ' card(s) to the stack.'
            window.alert(msg)
        }
        // If value of flag is equal to the number of cards added in this turn
        // Set record to not bluffed
        if (j === noOfCardsMoved) {
            game.record = 'Not Bluffed'
        }
        // Set record to Bluffed
        else {
            game.record = 'Bluffed'
        }
    }
    console.log(game.record) // To see whether last player bluffed or not
}