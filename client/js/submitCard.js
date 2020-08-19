/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
// Function which executes when the submit button is clicked
function submitCard () {
  const modal = document.getElementById('cardModal')
  // Removing the modal from the screen
  modal.style.display = 'none'
  // Storing all the options in select menu
  const selectedCard = document.getElementById('selectCard')

  let optSelected = null

  // Looping thropugh the options to check if the option was selected or not
  for (let i = 0; i < selectedCard.options.length; i++) {
    optSelected = selectedCard.options[i]
    if (optSelected.selected === true) {
      break // If option was selected
    }
  }

  // Return the value of selected option
  return optSelected.value
}
