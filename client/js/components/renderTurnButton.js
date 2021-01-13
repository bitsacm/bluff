/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
function renderTurnButton (game) {
  let $button = document.getElementById('turnButton')

  if (!$button) {
    $button = document.createElement('button')
    $button.id = 'turnButton'

    $button.addEventListener('click', () => {
      game.endTurn()
    })

    document.getElementById('cards').appendChild($button)
  }

  $button.innerHTML = 'Pass'
}
