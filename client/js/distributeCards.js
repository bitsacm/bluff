
/*
 * First dividing cards equally to all players and then the remainder n cards given 1 each to the first n players.
 */
function distributeCards (playerCount, deck) {
  let parts = []      //Array to store the number of cards each player should get.
  let playerCards = {}   //Object to store the Cards that each player will get.
  let cardCount =  deck.length
  for (let i = 0; i< playerCount; i++) {
    parts[i]=Math.floor(cardCount/playerCount)
  }
  for (let i = 0; i< cardCount%playerCount; i++) {
    parts[i]+=1
  }
  let temp = deck
  for (let i =0; i< playerCount; i++){
    playerCards['Player '+ (i+1)] = temp.slice(0, parts[i])  //parts array eg[18,18,18] in case of n=3, Player 1 given the slice of first.. 18 cards.
    temp = temp.splice(parts[i])     //The remaining 36 cards to be used for the next iteration.
  }
  return playerCards
}
