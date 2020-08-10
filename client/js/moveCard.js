/* eslint-disable no-unused-vars */
function moveCard (centralstack, playerCount, players) {
    centralstack = document.querySelectorAll('.selected') // Storing all elements with selected class
    const ids = [] // An array to store ids of selected cards
    for (let i = 0; i < centralstack.length; i++) {
      var transferCard = document.createElement('div') // Creating a card to visually represent the cards transferred to centralstack
      transferCard.className = 'Card'
      transferCard.innerHTML = 'GUESS WHAT??'
      ids[i] = centralstack[i].id // Storing ids from centralstack to the array ids
      document.getElementById('centralStack').appendChild(transferCard)
      centralstack[i].classList.remove('selected') // Removing the selected class after transferring
    }
    cardsRemove(centralstack, ids, players, playerCount)
  }