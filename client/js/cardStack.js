/*
 * To add 'dummy' flipped cards to the rendered Central Deck
 * This is different from the CentralDeck array that actually stores the cards moved to the central deck
 */

function cardStack () {
  const movedCard = document.createElement("div")
  movedCard.className = 'Card'
  const movedCardText = document.createElement("div")
  movedCardText.innerHTML = "BLUFF!?"
  movedCardText.className = "cardRank"
  movedCard.appendChild(movedCardText)
  document.getElementById("CentralStack").appendChild(movedCard)
}
