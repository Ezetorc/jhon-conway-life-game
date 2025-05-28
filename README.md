# 🌍 Jhon Conway's Life Game

This is an small page made with TypeScript and Vite of the **Jhon Conway's Life Game**.

## 🌱 Basic Concepts
**Board:** A two-dimensional grid (like a matrix) of cells.
**Cells:** Each cell has two possible states: Alive or Dead
**Neighborhood:** Each cell has 8 neighbors — the surrounding cells in all directions, including diagonals.

## 🔄 Game Rules
At each generation (a step in time), the following rules are applied to every cell:

**Survival:**
A living cell with 2 or 3 living neighbors stays alive.

**Death (underpopulation or overpopulation):**
A living cell with fewer than 2 or more than 3 neighbors dies.

**Birth:**
A dead cell with exactly 3 living neighbors becomes alive.

These rules are applied simultaneously to every cell, producing a new generation of the board.

## 🚀 Features

✅ Change cells colors
✅ Change speed
✅ Reset board
✅ Pause/resume game

## 🛠️ Built With

- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/)

## Contact

You can contact me by my email: ezetorc@gmail.com
