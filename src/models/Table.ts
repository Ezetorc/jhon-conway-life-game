import { Cell } from './Cell'
import { HTMLCellElement } from './HTMLCellElement'

export class Table {
  private _rows: Array<Cell[]> = []
  private _columnsAmount: number
  private _rowsAmount: number

  constructor (props: { rows?: number; columns?: number }) {
    this._rowsAmount = props.rows ?? 10
    this._columnsAmount = props.columns ?? 10
    this._generate()
  }

  get rows (): number {
    return this._rowsAmount
  }

  get columns (): number {
    return this._columnsAmount
  }

  private _generate (): void {
    customElements.define('x-cell', HTMLCellElement)

    for (let y = 0; y < this._rowsAmount; y++) {
      const newRow: Cell[] = []

      for (let x = 0; x < this._columnsAmount; x++) {
        const newCell = new Cell({ position: { x, y } })

        newRow.push(newCell)
      }

      this._rows.push(newRow)
    }
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
          neighborY < this._rows.length &&
          neighborX >= 0 &&
          neighborX < this._rows[neighborY].length
        ) {
          const neighbor = this._rows[neighborY][neighborX]

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

  reset (): void {
    this._rows.forEach(row => row.forEach(cell => cell.revive()))
  }

  update (): void {
    for (const row of this._rows) {
      for (const cell of row) {
        this._checkRules(cell)
      }
    }

    for (const row of this._rows) {
      for (const cell of row) {
        cell.update()
      }
    }
  }

  forEachCell (callback: (cell: Cell) => void): void {
    for (const row of this._rows) {
      for (const cell of row) {
        callback(cell)
      }
    }
  }
}
