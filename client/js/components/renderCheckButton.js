/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
function renderCheckButton (game) {
  let $button = document.getElementById('checkButton')

  if (!$button) {
    $button = document.createElement('button')
    $button.id = 'checkButton'

    $button.addEventListener('click', () => {
      game.callBluff()
    })

    document.getElementById('cards').appendChild($button)
  }

  $button.innerHTML = 'Call Bluff'
}
