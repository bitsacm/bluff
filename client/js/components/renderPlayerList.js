/* eslint-disable no-unused-vars */
function renderPlayerList (room, name, players) {
  let $list = document.getElementById('player-list')

  if (!$list) {
    $list = document.createElement('div')
    $list.id = 'player-list'

    document.getElementById('root').appendChild($list)
  }

  $list.innerHTML = ''

  const $room = document.createElement('h3')
  $room.innerHTML = room + ' - ' + name

  $list.appendChild($room)

  players.forEach((player) => {
    const $playerDiv = document.createElement('div')
    $playerDiv.innerHTML = player
    $list.appendChild($playerDiv)
  })
}
