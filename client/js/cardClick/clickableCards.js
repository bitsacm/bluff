/*
 * makes cards clickable
 * Needs pre rendered deck
 */

function clickableCards () {
let cardBtn = document.getElementsByClassName('Card')
  Array.from(cardBtn).forEach((cardElement) => { 
    cardElement.addEventListener("click", handleCardClick (), false)
  })
let sendBtn = document.getElementsByClassName("buttons")
  Array.from(sendBtn).forEach((button) => {
    button.addEventListener("click", moveCards (), false)
  })
}
