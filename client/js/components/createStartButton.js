/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

function createStartButton () {
  const $registration = document.getElementById('registration')

  const button = document.createElement('button')
  button.setAttribute('id', 'startButton')
  button.innerHTML = 'Start'

  button.addEventListener('click', async (e) => {
    e.preventDefault()
    await socket.emit('start')
  })

  $registration.appendChild(button)
}
