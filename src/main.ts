import { Cell } from './models/Cell.ts'
import { LifeGame } from './models/LifeGame.ts'
import './style.css'

const $lifeGame = document.getElementById('life-game')
const $speedInput = document.getElementById('speed-input')
const $aliveColorInput = document.getElementById('alive-color-input')
const $deadColorInput = document.getElementById('dead-color-input')
const $gameControllerInput = document.getElementById('game-controller-input')
const $gameReseterInput = document.getElementById('game-reseter-button')

if ($lifeGame) {
  const game: LifeGame = new LifeGame({
    rows: 30,
    columns: 30,
    element: $lifeGame
  })

  game.start()

  $speedInput?.addEventListener('input', event => {
    const target = event.target as HTMLInputElement
    const newSpeed = target.value

    game.speed = Number(newSpeed)
  })

  $aliveColorInput?.addEventListener('input', event => {
    const target = event.target as HTMLInputElement
    const newColor = target.value

    Cell.setAliveColor(newColor)
  })

  $deadColorInput?.addEventListener('input', event => {
    const target = event.target as HTMLInputElement
    const newColor = target.value

    Cell.setDeadColor(newColor)
  })

  $gameControllerInput?.addEventListener('input', event => {
    const target = event.target as HTMLInputElement
    const checked = target.checked

    if (checked) {
      game.start()
    } else {
      game.stop()
    }
  })

  $gameReseterInput?.addEventListener('click', game.reset)
}
