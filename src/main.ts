const style = `
.title-bar {
  padding: 10px;
  text-align: center;
}

.window {
  box-shadow: 5px 5px 15px #00000030;
  overflow: hidden;
  border-radius: 10px;
  position: fixed;
}

.body {
  padding: 10px;
  width: calc(100% - 20px);
  height: calc(100% - 1rem - 40px);
  background-color: white;
}
`

class uyouWindow extends HTMLElement {
  private _data: {
    title: string | null,
    titleBarColor: string | null,
    titleTextColor: string | null,
    width: string | null,
    height: string | null,
    top: string | null,
    left: string | null
  }
  constructor() {
    super()
    this._data = {
      title: this.getAttribute('title') ? this.getAttribute('title') : 'title',
      titleBarColor: this.getAttribute('tb-color') ? this.getAttribute('tb-color') : 'blue',
      titleTextColor: this.getAttribute('tt-color') ? this.getAttribute('tt-color') : 'white',
      width: this.getAttribute('width') ? this.getAttribute('width') : '400',
      height: this.getAttribute('height') ? this.getAttribute('height') : '300',
      top: this.getAttribute('y') ? this.getAttribute('y') : '0',
      left: this.getAttribute('x') ? this.getAttribute('x') : '0'
    }
    this.render()
  }
  render() {
    const shadow = this.attachShadow({ mode: 'open' })
    const styleDom = document.createElement('style')
    styleDom.innerHTML = style
    shadow.innerHTML = `
    <div class="window" style="width: ${this._data.width}px; height: ${this._data.height}px; top: ${this._data.top}px; left: ${this._data.left}px;">
      <div class="title-bar" style="background-color: ${this._data.titleBarColor}; color: ${this._data.titleTextColor}">${this._data.title}</div>
      <div class="body">
       <slot></slot>
      </div>
    </div>
    `
    shadow.appendChild(styleDom)
    const windowDom = shadow.querySelector('.window')
    let x: number, y: number
    const windowMove = (e: Event) => {
      (windowDom as HTMLElement).style.top = (e as MouseEvent).clientY - y + 'px';
      (windowDom as HTMLElement).style.left = (e as MouseEvent).clientX - x + 'px';
    }
    windowDom?.querySelector('.title-bar')?.addEventListener('mousedown', (e) => {
      x = (e as MouseEvent).offsetX
      y = (e as MouseEvent).offsetY
      windowDom.querySelector('.title-bar')?.addEventListener('mousemove', windowMove)
    })
    windowDom?.querySelector('.title-bar')?.addEventListener('mouseup', () => {
      windowDom.querySelector('.title-bar')?.removeEventListener('mousemove', windowMove)
    })
  }
}

window.customElements.define('uyou-window', uyouWindow)