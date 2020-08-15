/*
 * Creating a grid which will be used by the first player to enter the rank of the particular round
 * Calls handlecellclick() on clicking of any cell
 */



function inputGrid () {
  const outerBox = document.createElement("div")
  outerBox.className = "inputGrid"
  values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'] 
  const outerBoxHeading = document.createElement("h1")
  outerBoxHeading.className = "outerBoxHeading"
  outerBoxHeading.innerHTML = "What would you like to call your move?"
  outerBox.appendChild(outerBoxHeading)
  values.forEach ((rank) => {
    cell = document.createElement("button")
    cell.innerHTML = rank
    cell.value = "rank"
    cell.className = "cell"
    outerBox.appendChild(cell)
    cell.addEventListener('click', handleCellClick (), false)
  })
return outerBox
}
