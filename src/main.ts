const style = `
.title-bar {
  padding: 10px;
  text-align: center;
  user-select: none;
  font-weight: bold;
  z-index: 1 !important;
  position: absolute;
  width: calc(100% - 20px);
}

.window {
  box-shadow: 5px 5px 15px #00000030;
  overflow: hidden;
  position: fixed;
}

.body {
  padding: 10px;
  width: calc(100% - 20px);
  height: calc(100% - 1rem - 40px);
  overflow: scroll;
  margin-top: calc(1em + 20px)
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
    left: string | null,
    bodyColor: string | null,
    titleShadow: string,
    windowRadius: string | null,
    position: string | null
  }
  shadow: ShadowRoot | undefined
  constructor() {
    super()
    this._data = {
      title: this.getAttribute('title') ? this.getAttribute('title') : 'title',
      titleBarColor: this.getAttribute('tb-color') ? this.getAttribute('tb-color') : 'blue',
      titleTextColor: this.getAttribute('tt-color') ? this.getAttribute('tt-color') : 'white',
      width: this.getAttribute('width') ? this.getAttribute('width') : '400',
      height: this.getAttribute('height') ? this.getAttribute('height') : '300',
      top: this.getAttribute('y') ? this.getAttribute('y') : '0',
      left: this.getAttribute('x') ? this.getAttribute('x') : '0',
      bodyColor: this.getAttribute('body-color') ? this.getAttribute('body-color') : 'white',
      titleShadow: this.getAttribute('tb-shadow') === 'true' ? '0 2px 10px #00000055' : '0 0 0 transparent',
      windowRadius: this.getAttribute('win-radius') ? this.getAttribute('win-radius') : '10',
      position: this.getAttribute('pos') ? this.getAttribute('pos') : ''
    }
    this.render()
    this.moveWindow()
    this.windowResize()
  }
  render() {
    this.shadow = this.attachShadow({ mode: 'closed' })
    if (this._data.top?.indexOf('%') === -1) {
      this._data.top = this._data.top + 'px'
    }
    if (this._data.left?.indexOf('%') === -1) {
      this._data.left = this._data.left + 'px'
    }
    let pos = ''

    if (this._data.position === 'center') {
      this._data.top = '50%'
      this._data.left = '50%'
      pos = 'transform: translateX(-50%) translateY(-50%);'
    }
    this.shadow.innerHTML = `
    <div 
      class="window" 
      style="width: ${this._data.width}px; height: ${this._data.height}px; top: ${this._data.top}; left: ${this._data.left}; border-radius: ${this._data.windowRadius}px; ${pos}"
     >
      <div 
        class="title-bar" 
        style="background-color: ${this._data.titleBarColor}; color: ${this._data.titleTextColor}; box-shadow: ${this._data.titleShadow};"
      >
        ${this._data.title}
      </div>
      <div class="body" style="background-color: ${this._data.bodyColor}">
       <slot></slot>
      </div>
    </div>
    `
    const styleDom = document.createElement('style')
    styleDom.innerHTML = style
    this.shadow.appendChild(styleDom)
  }
  moveWindow() {
    let inTitleBar = false

    const windowDom = this.shadow?.querySelector('.window')

    windowDom?.querySelector('.title-bar')?.addEventListener('mouseover', () => {
      windowDom?.querySelector('.title-bar')?.addEventListener('mousedown', () => {
        inTitleBar = true
      })
    })
    windowDom?.querySelector('.title-bar')?.addEventListener('mouseout', () => {
      inTitleBar = false
    })

    let x: number, y: number
    const windowMove = (e: Event) => {
      if (inTitleBar) {
        (windowDom as HTMLElement).style.top = (e as MouseEvent).clientY - y + 'px';
        (windowDom as HTMLElement).style.left = (e as MouseEvent).clientX - x + 'px';
      }
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
  windowResize() {
    const window = this.shadow?.querySelector('.window') as HTMLElement
    let resizeable = false
    let clientX: number, clientY: number
    let minW = 20, minH = 20
    let direc = ''
    const up = () => {
      resizeable = false
    }
    const down = (e: Event) => {
      let dir = getDirection(e)
      if (dir !== '') {
        resizeable = true
        direc = dir
        clientX = (e as MouseEvent).clientX
        clientY = (e as MouseEvent).clientY
      }
    }
    const move = (e: Event) => {
      let dir = getDirection(e)
      let cursor
      dir === '' ? cursor = 'default' : cursor = dir + '-resize'
      window.style.cursor = cursor
      if (resizeable) {
        if (direc.indexOf('e') !== -1) {
          window.style.width = Math.max(minW, window.offsetWidth + ((e as MouseEvent).clientX - clientX)) + 'px'
          clientX = (e as MouseEvent).clientX
        }
        if (direc.indexOf('n') !== -1) {
          window.style.height = Math.max(minH, window.offsetHeight + (clientY - (e as MouseEvent).clientY)) + 'px'
          clientY = (e as MouseEvent).clientY
        }
        if (direc.indexOf('s') !== -1) {
          window.style.height = Math.max(minW, window.offsetHeight + ((e as MouseEvent).clientY - clientY)) + 'px'
          clientY = (e as MouseEvent).clientY
        }
        if (direc.indexOf('w') !== -1) {
          window.style.width = Math.max(minW, window.offsetWidth + (clientX - (e as MouseEvent).clientX)) + 'px'
          window.style.left = (e as MouseEvent).clientX - 14 + 'px'
          clientX = (e as MouseEvent).clientX
        }
      }
    }
    const getDirection = (event: Event): string => {
      let xP: number, yP: number, offset = 15, dir = ''
      xP = (event as MouseEvent).offsetX
      yP = (event as MouseEvent).offsetY

      const body = window.querySelector('.body') as HTMLElement

      if (yP < 7) {
        dir += 'n'
      } else if (yP > body.offsetHeight - offset) {
        dir += 's'
      }
      if (xP < offset) {
        dir += 'w'
      } else if (xP > window.offsetWidth - offset) {
        dir += 'e'
      }
      return dir
    }

    window.addEventListener('mousemove', move)
    window.addEventListener('mousedown', down)
    window.addEventListener('mouseup', up)
  }
}

window.customElements.define('uyou-window', uyouWindow)