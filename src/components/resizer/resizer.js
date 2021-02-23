import { noop } from '@/utils'
import { compose } from '@/utils/functional'

export default class Resizer {
  constructor() {
    this.el = null
    this.update = {
      width: noop,
      height: noop,
      top: noop,
      left: noop,
    }
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
    // 控制north, west, east, south四个方向点的显示
    this.minimum = 16
  }

  setData({
    el,
    update,
    minWidth,
    minHeight,
  }) {
    this.el = el
    this.update = update
    this.minWidth = minWidth
    this.minHeight = minHeight
  }

  getLines() {
    const rect = this.rect()
    const top = rect.top + 'px'
    const left = rect.left + 'px'
    const width = rect.width
    const height = rect.height
    const lines = []
    lines.push({
      id: 'n-line',
      style: {
        top,
        left,
        width: width + 'px',
        height: '1px',
      },
    }, {
      id: 'e-line',
      style: {
        top,
        left: parseInt(left, 10) + width - 1 + 'px',
        width: '1px',
        height: height + 'px',
      },
    }, {
      id: 's-line',
      style: {
        top: parseInt(top, 10) + height - 1 + 'px',
        left,
        width: width + 'px',
        height: '1px',
      },
    }, {
      id: 'w-line',
      style: {
        top,
        left,
        width: '1px',
        height: height + 'px',
      },
    })
    return lines
  }

  getCirculars() {
    const rect = this.rect()
    const top = rect.top
    const left = rect.left
    const right = rect.left + rect.width
    const bottom = rect.top + rect.height
    const width = rect.width
    const height = rect.height
    const circulars = []
    if (rect.width >= this.minimum) {
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
      })
    }
    if (rect.height >= this.minimum) {
      circulars.push({
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
      })
    }
    circulars.push({
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
      width: offsetWidth,
      height: offsetHeight,
    }
  }

  // 收集move事件执行的函数
  collectExecutor() {
    const queue = []
    if (this.resizeEnable.top) {
      queue.push(({ intervalX, intervalY }) => {
        this.update.top(this.top + intervalY + 'px')
        return {
          intervalX,
          intervalY: -intervalY,
        }
      })
    }
    if (this.resizeEnable.left) {
      queue.push(({ intervalX, intervalY }) => {
        this.update.left(this.left + intervalX + 'px')
        return {
          intervalX: -intervalX,
          intervalY,
        }
      })
    }
    if (this.resizeEnable.width) {
      queue.push(({ intervalX, intervalY }) => {
        const width = this.width + intervalX
        if (width > this.minWidth) this.update.width(width + 'px')
        else {
          this.update.width(this.minWidth + 'px')
          if (this.resizeEnable.left) {
            this.update.left(this.right - this.minWidth + 'px')
          }
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
        if (height > this.minHeight) this.update.height(height + 'px')
        else {
          this.update.height(this.minHeight + 'px')
          if (this.resizeEnable.top) {
            this.update.top(this.bottom - this.minHeight + 'px')
          }
        }
        return {
          intervalX,
          intervalY,
        }
      })
    }
    return compose(...queue.reverse())
  }

  start(evt) {
    this.resize = true
    this.clientX = evt.clientX
    this.clientY = evt.clientY
    const { top, left, width, height } = this.rect()
    this.top = top
    this.left = left
    this.width = width
    this.height = height
    this.right = left + width
    this.bottom = top + height
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
