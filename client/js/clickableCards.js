/*
 * makes cards clickable
 * Needs pre rendered deck
 */

function clickableCards () {
let cardBtn = document.getElementsByClassName('Card')
  Array.from(cardBtn).forEach((cardElement) => { 
    cardElement.addEventListener("click", moveCard (), false)
  })
}
