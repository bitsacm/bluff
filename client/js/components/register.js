/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

function register (game) {
  const $form = document.getElementById('registration-form')

  $form.addEventListener('submit', async (e) => {
    e.preventDefault()
    const $formSubmit = document.getElementById('formSubmit')
    $formSubmit.setAttribute('disabled', 'disabled')

    const $username = document.getElementById('username')
    const $room = document.getElementById('room')
    game.name = $username.value.trim().toLowerCase()
    game.room = $room.value.trim().toLowerCase()

    await socket.emit('join', game.name, game.room, (error) => {
      if (error) {
        alert(error)
      } else {
        $formSubmit.remove()
        createStartButton()
      }
    })
  })
}
