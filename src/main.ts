import { Grid } from './models/Grid.ts'
import './style.css'

const $grid = document.getElementById('grid')
const $speedInput = document.getElementById('speed-input')

if ($grid && $speedInput) {
  const grid: Grid = new Grid({
    rows: 30,
    columns: 30,
    element: $grid
  })

  grid.start()

  $speedInput.addEventListener('input', (event: Event) => {
    const target = event.target as HTMLInputElement
    const newSpeed = target.value

    grid.speed = Number(newSpeed)
  })
}
