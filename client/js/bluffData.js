// Storing data if the player bluffed or not 
function bluffData(game, centralStack, initialNoOfCards, finalNoOfCards) {
    if(typeof(data) === 'undefined') { // Initialising data only for the first time(like static)
        data = []
    }
    if(data.length === 0) { // Checking if it is the first chance or not 
        data = window.prompt('Which rank card have you added?(You may BLUFF)') // Asking user of the rank he has added
        let message = 'Card Rank: ' + data.toUpperCase()
        window.alert(message)
    }
    let j = 0 // Initialise a flag
    for (let i = initialNoOfCards; i < finalNoOfCards; i++) { // Looping through cards added in this chance
        if (centralStack[i].value !== 'Joker') { // Checking if value is not a joker
            if(centralStack[i].value.toLowerCase() === data) { // Comparing the value of newly added cards added to the data entered 
                j += 1 // Adding 1 to the flag if true card is added
            }
        }
        else {
            j += 1 // Also, adding 1 to the flag if the card added is a joker
        }
    }
    let noOfCardsMoved = finalNoOfCards - initialNoOfCards // Calculating the number of cards added in this chance
    // Turn will have a value 2 if last chance was of the last player
    // not 1 as I am adding 1 to turn in activatePlayer itself
    if(game.turn !== 2) {
        if (game.record !== 0) {
            let msg = 'Player ' + (game.turn - 2) + ' added ' + noOfCardsMoved + ' card(s) to the stack.'
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
            let msg = 'Player ' +  game.players.length + ' added ' + noOfCardsMoved + ' card(s) to the stack.'
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