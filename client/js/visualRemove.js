// Removing all divs with ids equal to the selected cards
function visualRemove (centralstack, ids) {
  for (let i = 0; i < centralstack.length; i++) {
    document.getElementById(ids[i]).remove()
  }
}
