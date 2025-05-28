export class HTMLCellElement extends HTMLElement {
  connectedCallback () {
    this.innerHTML = `<button class="cell"></button>`
    this.updateStyle()
  }

  static get observedAttributes () {
    return ['alive']
  }

  attributeChangedCallback (name: string) {
    if (name === 'alive') {
      this.updateStyle()
    }
  }

  updateStyle () {
    const isAlive = this.getAttribute('alive') === 'true'
    const cell = this.querySelector('.cell') as HTMLElement
    if (cell) {
      cell.classList.toggle('alive', isAlive)
      cell.classList.toggle('dead', !isAlive)
    }
  }
}
