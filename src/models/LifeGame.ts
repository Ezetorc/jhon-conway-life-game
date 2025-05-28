import { Cell } from './Cell.ts'
import { Table } from './Table.ts'

export class LifeGame {
  private _addedEventListeners: boolean = false
  private _intervalId: number | null = null
  private _updateCooldownSeconds: number
  private _stopped: boolean = true
  private _element: HTMLElement
  private _table: Table

  constructor (props: {
    updateCooldownSeconds?: number
    element: HTMLElement
    aliveColor?: string
    deadColor?: string
    columns?: number
    rows?: number
  }) {
    this._element = props.element
    this._updateCooldownSeconds = props.updateCooldownSeconds ?? 2
    this._table = new Table({ rows: props.rows, columns: props.columns })

    if (props.aliveColor) Cell.setAliveColor(props.aliveColor)
    if (props.deadColor) Cell.setDeadColor(props.deadColor)
  }

  get stopped (): boolean {
    return this._stopped
  }

  get speed (): number {
    return this._updateCooldownSeconds * 1000
  }

  set speed (newSpeed: number) {
    this._updateCooldownSeconds = newSpeed
    this._setUpdateInterval()
  }

  private _addEventListener (cell: Cell): void {
    if (!this._addedEventListeners) {
      cell.attachClickListener(this.stopped)
    }
  }

  private _render (): void {
    this._table.forEachCell(cell => {
      this._element.appendChild(cell.element)
      this._addEventListener(cell)
    })

    this._addedEventListeners = true
  }

  private _setUpdateInterval (): void {
    if (this._intervalId !== null) {
      clearInterval(this._intervalId)
    }

    this._intervalId = setInterval(() => {
      if (!this._stopped) {
        this._table.update()
        this._render()
      }
    }, this._updateCooldownSeconds * 1000)
  }

  start (): void {
    this._stopped = false
    this._render()
    this._setUpdateInterval()
  }

  stop (): void {
    this._stopped = true
  }

  reset (): void {
    this._table.reset()
  }
}
