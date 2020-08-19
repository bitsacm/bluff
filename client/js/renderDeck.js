/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/*
  * Render one card at a time with a Parent newCard div and child cardSuit and cardValue
  * newCard is a child element of #root
  * all divs are assigned their class names for styling reference
  */
function renderDeck (name, deck, game) {
  // create a new player
  const player = renderPlayer(name)
  // append cards to the player
  deck.forEach((card) => player.appendChild(renderCard(card, game)))
  // append button to the player
  const button = renderButton(game)
  player.appendChild(button)
  // render the player
  document.getElementById('root').appendChild(player)
}
