
let arrayId = [] //Storing the ids of the cards clicked

function handleCardClick () {
  return function () {    // Unselect and select a card functionalities by checking presence of id in array
    if (arrayId.includes(this.id)){
      arrayId.splice(arrayId.indexOf(this.id), 1)
      this.style.zIndex = "0"
      this.style.border = ""
    }
    else {
      arrayId.push(this.id)
      this.style.border = "3px solid blue"
      this.style.zIndex = "1"
    }
  }
}
