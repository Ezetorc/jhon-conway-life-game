import { Cell } from './Cell.ts'
import { HTMLCellElement } from './HTMLCellElement.ts'
import type { TableRow } from './TableRow.ts'

export class Grid {
  private _table: TableRow[] = []
  private _rows: number
  private _columns: number
  private _element: HTMLElement
  private _addedEventListeners: boolean = false
  private _stopped: boolean = true
  private _updateCooldownSeconds: number
  private _intervalId: number | null = null

  constructor (props: {
    element: HTMLElement
    rows?: number
    columns?: number
    updateCooldownSeconds?: number
    aliveColor?: string
    deadColor?: string
  }) {
    this._rows = props.rows ?? 10
    this._columns = props.columns ?? 10
    this._element = props.element
    this._updateCooldownSeconds = props.updateCooldownSeconds ?? 2

    if (props.aliveColor) Cell.setAliveColor(props.aliveColor)
    if (props.deadColor) Cell.setDeadColor(props.deadColor)

    this._generateTable()
  }

  get rows (): number {
    return this._rows
  }

  get columns (): number {
    return this._columns
  }

  get table (): TableRow[] {
    return this._table
  }

  get stopped (): boolean {
    return this._stopped
  }

  start (): void {
    this._stopped = false
    this._render()
    this._setUpdateInterval()
  }

  _setUpdateInterval (): void {
    if (this._intervalId !== null) {
      clearInterval(this._intervalId)
    }

    this._intervalId = setInterval(() => {
      if (!this._stopped) {
        this._update()
        this._render()
      }
    }, this._updateCooldownSeconds * 1000)
  }

  get speed (): number {
    return this._updateCooldownSeconds * 1000
  }

  set speed (newSpeed: number) {
    this._updateCooldownSeconds = newSpeed
    this._setUpdateInterval()
  }

  stop (): void {
    this._stopped = true
  }

  reset (): void {
    this._table.forEach(row => row.forEach(cell => cell.revive()))
  }

  private _generateTable (): void {
    customElements.define('x-cell', HTMLCellElement)

    for (let y = 0; y < this._rows; y++) {
      const newRow: TableRow = []

      for (let x = 0; x < this._columns; x++) {
        const newCell = new Cell({ position: { x, y } })

        newRow.push(newCell)
      }

      this._table.push(newRow)
    }
  }

  private _render (): void {
    for (const row of this.table) {
      for (const cell of row) {
        this._element.appendChild(cell.element)

        if (!this._addedEventListeners) {
          cell.attachClickListener(this)
        }
      }
    }

    this._addedEventListeners = true
  }

  private _getCellNeighbors (cell: Cell): Cell[] {
    const neighbors: Cell[] = []
    const { x, y } = cell.position

    for (let dy = -1; dy <= 1; dy++) {
      for (let dx = -1; dx <= 1; dx++) {
        if (dx === 0 && dy === 0) continue

        const neighborX = x + dx
        const neighborY = y + dy

        if (
          neighborY >= 0 &&
          neighborY < this._table.length &&
          neighborX >= 0 &&
          neighborX < this._table[neighborY].length
        ) {
          const neighbor = this._table[neighborY][neighborX]

          neighbors.push(neighbor)
        }
      }
    }

    return neighbors
  }

  private _checkRules (cell: Cell): void {
    const neighbors = this._getCellNeighbors(cell)
    const aliveNeighborsAmount = neighbors.filter(
      neighbor => neighbor.alive
    ).length

    if (cell.alive) {
      if (aliveNeighborsAmount < 2 || aliveNeighborsAmount > 3) {
        cell.kill()
      } else {
        cell.revive()
      }
    } else {
      if (aliveNeighborsAmount === 3) {
        cell.revive()
      }
    }
  }

  private _update (): void {
    for (const row of this._table) {
      for (const cell of row) {
        this._checkRules(cell)
      }
    }

    for (const row of this._table) {
      for (const cell of row) {
        cell.update()
      }
    }
  }
}
