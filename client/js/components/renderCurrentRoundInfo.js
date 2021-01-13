/* eslint-disable no-unused-vars */
function renderCurrentRoundInfo (centralStackSize, centralStackLast, rank, history, turn) {
  let $roundInfo = document.getElementById('round-info')

  if (!$roundInfo) {
    $roundInfo = document.createElement('div')
    $roundInfo.id = 'round-info'

    document.getElementById('root').appendChild($roundInfo)
  }

  $roundInfo.innerHTML = ''

  $roundInfo.innerHTML = `Central Stack: ${centralStackSize} (${centralStackLast})<br>
                            rank: ${rank || 'first turn'}<br>
                            turn: ${turn}`

  history.forEach((event, index) => {
    const $eventDiv = document.createElement('div')
    $eventDiv.innerHTML = (index + 1) + '. ' + event
    $roundInfo.appendChild($eventDiv)
  })
}
