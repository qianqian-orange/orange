import { compose } from '@/utils/functional'

export default class Resizer {
  constructor() {
    this.el = null
    this.firstChild = null
    this.resize = false // 判断是否执行调节器逻辑
    this.move = false // 判断是否有移动过
    // 判断可以调节属性值
    this.resizeEnable = {
      top: false,
      left: false,
      width: false,
      height: false,
    }
    this.executor = null
    this.clientX = 0
    this.clientY = 0
    this.width = 0
    this.height = 0
    this.minWidth = 0
    this.minHeight = 0
    this.top = 0
    this.left = 0
    this.right = 0
    this.bottom = 0
  }

  setEl(el) {
    this.el = el
    this.firstChild = el.firstChild
  }

  getLines() {
    const {
      style: {
        top,
        left,
      },
    } = this.el
    const {
      style: {
        width,
        height,
      },
    } = this.firstChild
    const lines = []
    lines.push({
      id: 'n-line',
      style: {
        top,
        left,
        width,
        height: '1px',
      },
    }, {
      id: 'e-line',
      style: {
        top,
        left: parseInt(left, 10) + parseInt(width, 10) - 1 + 'px',
        width: '1px',
        height,
      },
    }, {
      id: 's-line',
      style: {
        top: parseInt(top, 10) + parseInt(height, 10) - 1 + 'px',
        left,
        width,
        height: '1px',
      },
    }, {
      id: 'w-line',
      style: {
        top,
        left,
        width: '1px',
        height,
      },
    })
    return lines
  }

  getCirculars() {
    const { top, left, right, bottom, width, height } = this.rect()
    const circulars = []
    circulars.push({
      id: 'n-resize',
      style: {
        top: top + 'px',
        left: left + width / 2 + 'px',
        cursor: 'n-resize',
      },
      mousedown: (evt) => {
        ;['top', 'height'].forEach((key) => { this.resizeEnable[key] = true })
        this.start(evt)
      },
    }, {
      id: 'e-resize',
      style: {
        top: top + height / 2 + 'px',
        left: right + 'px',
        cursor: 'e-resize',
      },
      mousedown: (evt) => {
        this.resizeEnable.width = true
        this.start(evt)
      },
    }, {
      id: 's-resize',
      style: {
        top: bottom + 'px',
        left: left + width / 2 + 'px',
        cursor: 's-resize',
      },
      mousedown: (evt) => {
        this.resizeEnable.height = true
        this.start(evt)
      },
    }, {
      id: 'w-resize',
      style: {
        top: top + height / 2 + 'px',
        left: left + 'px',
        cursor: 'w-resize',
      },
      mousedown: (evt) => {
        ;['left', 'width'].forEach((key) => { this.resizeEnable[key] = true })
        this.start(evt)
      },
    }, {
      id: 'nw-resize',
      style: {
        top: top + 'px',
        left: left + 'px',
        cursor: 'nw-resize',
      },
      mousedown: (evt) => {
        ;['top', 'left', 'width', 'height'].forEach((key) => { this.resizeEnable[key] = true })
        this.start(evt)
      },
    }, {
      id: 'ne-resize',
      style: {
        top: top + 'px',
        left: right + 'px',
        cursor: 'ne-resize',
      },
      mousedown: (evt) => {
        ;['top', 'width', 'height'].forEach((key) => { this.resizeEnable[key] = true })
        this.start(evt)
      },
    }, {
      id: 'se-resize',
      style: {
        top: bottom + 'px',
        left: right + 'px',
        cursor: 'se-resize',
      },
      mousedown: (evt) => {
        ;['width', 'height'].forEach((key) => { this.resizeEnable[key] = true })
        this.start(evt)
      },
    }, {
      id: 'sw-resize',
      style: {
        top: bottom + 'px',
        left: left + 'px',
        cursor: 'sw-resize',
      },
      mousedown: (evt) => {
        ['left', 'width', 'height'].forEach((key) => { this.resizeEnable[key] = true })
        this.start(evt)
      },
    })
    return circulars
  }

  rect() {
    const {
      offsetLeft,
      offsetTop,
      offsetWidth,
      offsetHeight,
    } = this.el
    return {
      top: offsetTop,
      left: offsetLeft,
      right: offsetLeft + offsetWidth,
      bottom: offsetTop + offsetHeight,
      width: offsetWidth,
      height: offsetHeight,
    }
  }

  // 收集move事件执行的函数
  collectExecutor() {
    const queue = []
    if (this.resizeEnable.top) {
      queue.push(({ intervalX, intervalY }) => {
        this.el.style.top = this.top + intervalY + 'px'
        return {
          intervalX,
          intervalY: -intervalY,
        }
      })
    }
    if (this.resizeEnable.left) {
      queue.push(({ intervalX, intervalY }) => {
        this.el.style.left = this.left + intervalX + 'px'
        return {
          intervalX: -intervalX,
          intervalY,
        }
      })
    }
    if (this.resizeEnable.width) {
      queue.push(({ intervalX, intervalY }) => {
        const width = this.width + intervalX
        if (width > this.minWidth) this.firstChild.style.width = width + 'px'
        else {
          this.firstChild.style.width = this.minWidth + 'px'
          if (this.resizeEnable.left) this.el.style.left = this.right - this.minWidth + 'px'
        }
        return {
          intervalX,
          intervalY,
        }
      })
    }
    if (this.resizeEnable.height) {
      queue.push(({ intervalX, intervalY }) => {
        const height = this.height + intervalY
        if (height > this.minHeight) this.firstChild.style.height = height + 'px'
        else {
          this.firstChild.style.height = this.minHeight + 'px'
          if (this.resizeEnable.top) this.el.style.top = this.bottom - this.minHeight + 'px'
        }
        return {
          intervalX,
          intervalY,
        }
      })
    }
    return compose(queue.reverse())
  }

  start(evt) {
    this.resize = true
    this.clientX = evt.clientX
    this.clientY = evt.clientY
    const { top, left, right, bottom, width, height } = this.rect()
    this.top = top
    this.left = left
    this.right = right
    this.bottom = bottom
    this.width = width
    this.height = height
    const {
      minWidth,
      minHeight,
    } = this.firstChild.style
    this.minWidth = parseInt(minWidth, 10)
    this.minHeight = parseInt(minHeight, 10)
    this.executor = this.collectExecutor()
  }

  run(evt, update) {
    if (!this.resize) return
    this.move = true
    this.executor({
      intervalX: evt.clientX - this.clientX,
      intervalY: evt.clientY - this.clientY,
    })
    update()
  }

  end(evt, update) {
    this.resize = false
    if (!this.move) return
    this.move = false
    ;['top', 'left', 'width', 'height'].forEach((key) => { this.resizeEnable[key] = false })
    const { top, left, width, height } = this.rect()
    update({
      prev: {
        top: `${this.top}px`,
        left: `${this.left}px`,
        width: `${this.width}px`,
        height: `${this.height}px`,
      },
      current: {
        top: `${top}px`,
        left: `${left}px`,
        width: `${width}px`,
        height: `${height}px`,
      },
    })
  }
}
