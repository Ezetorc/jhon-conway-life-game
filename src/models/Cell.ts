import type { Grid } from './Grid'
import type { HTMLCellElement } from './HTMLCellElement'
import type { Position } from './Position'

export class Cell {
  private _position: Position
  private _alive: boolean
  private _element: HTMLCellElement
  private _nextAlive: boolean

  constructor (props: { alive?: boolean; position?: Position }) {
    this._alive = props.alive ?? false
    this._nextAlive = this._alive
    this._position = props.position ?? {
      x: 0,
      y: 0
    }
    this._element = document.createElement('x-cell') as HTMLCellElement
    this.update()
  }

  static setAliveColor (newAliveColor: string): void {
    document.documentElement.style.setProperty(
      '--alive-cell-color',
      newAliveColor
    )
  }

  static setDeadColor (newDeadColor: string): void {
    document.documentElement.style.setProperty(
      '--dead-cell-color',
      newDeadColor
    )
  }

  attachClickListener (grid: Grid): void {
    this._element.addEventListener('click', () => {
      if (grid.stopped) return

      this._alive = !this._alive
      this._nextAlive = this._alive
      this._element.setAttribute('alive', String(this._alive))
    })
  }

  update (): void {
    this._alive = this._nextAlive
    this._element.setAttribute('alive', String(this._alive))
  }

  get position (): Position {
    return this._position
  }

  get dead (): boolean {
    return !this._alive
  }

  get alive (): boolean {
    return this._alive
  }

  get element (): HTMLCellElement {
    return this._element
  }

  kill (): void {
    this._nextAlive = false
  }

  revive (): void {
    this._nextAlive = true
  }
}
