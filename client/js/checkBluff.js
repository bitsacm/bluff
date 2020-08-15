let lastValues = []
function checkBluff () {
  let flag = 0
  lastValues.forEach ((value) => {
      if (value !== gameRank && value !== "Joker"){         //Function will return not a bluff only if all card ranks are same
        lastValues = []                                     // Or There is a joker in between
        flag = 1  
      }
  })
  return flag?"Bluff":"Not a Bluff"
}
