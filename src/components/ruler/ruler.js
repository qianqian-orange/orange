import { COORDINATE_DIRECTION_MAP } from '@/const/canvas'

const RULER_LINE_DEFAULT_LENGTH = 8

// 记录当前移动的参考线节点
let target = null

export const RULER_IDENTIFICATION_MAP = {
  backBtn: 'ruler-back-btn',
}

export const RULER_LINE_MAP = {
  [COORDINATE_DIRECTION_MAP.xAxis]: {
    mousedown(vm, executor, evt) {
      target = evt.target.parentNode
      executor(target)
      vm.startX = parseInt(target.style.left, 10)
      vm.clientX = evt.clientX
    },
    mousemove(vm, executor, evt) {
      executor(target)
      const interval = evt.clientX - vm.clientX
      target.style.left = vm.startX + interval + 'px'
      target.dataset.num = vm.num + interval
    },
    mouseup(executor) {
      executor(target)
      target = null
    },
    update(line, el) {
      line.num = el.dataset.num
      line.style.left = el.style.left
    },
    offset(el, start) {
      el.style.left = +el.dataset.num - start + 'px'
    },
  },
  [COORDINATE_DIRECTION_MAP.yAxis]: {
    mousedown(vm, executor, evt) {
      target = evt.target.parentNode
      executor(target)
      vm.startY = parseInt(target.style.top, 10)
      vm.clientY = evt.clientY
    },
    mousemove(vm, executor, evt) {
      executor(target)
      const interval = evt.clientY - vm.clientY
      target.style.top = vm.startY + interval + 'px'
      target.dataset.num = vm.num + interval
    },
    mouseup(executor) {
      executor(target)
      target = null
    },
    update(line, el) {
      line.num = el.dataset.num
      line.style.top = el.style.top
    },
    offset(el, start) {
      el.style.top = +el.dataset.num - start + 'px'
    },
  },
}

export const RULER_BAR_MAP = {
  [COORDINATE_DIRECTION_MAP.xAxis]: {
    mouseenter(vm, evt) {
      // 当拖拽参考线时不触发另一个标尺的标线显示
      if (target) return
      vm.offsetX = evt.offsetX
      vm.clientX = evt.clientX
      vm.line.visible = true
      vm.line.style = {
        left: vm.offsetX + 'px',
        height: vm.view.height,
      }
      vm.line.num = vm.start + vm.offsetX
    },
    mousemove(vm, evt) {
      if (target) return
      if (evt.offsetY > RULER_LINE_DEFAULT_LENGTH * 2) return
      const interval = evt.clientX - vm.clientX
      vm.line.style.left = vm.offsetX + interval + 'px'
      vm.line.num = vm.start + vm.offsetX + interval
    },
    boundary(vm) {
      return {
        min: vm.start,
        max: vm.start + vm.width,
      }
    },
  },
  [COORDINATE_DIRECTION_MAP.yAxis]: {
    mouseenter(vm, evt) {
      if (target) return
      vm.offsetY = evt.offsetY
      vm.clientY = evt.clientY
      vm.line.visible = true
      vm.line.style = {
        top: vm.offsetY + 'px',
        width: vm.view.width,
      }
      vm.line.num = vm.start + vm.offsetY
    },
    mousemove(vm, evt) {
      if (target) return
      if (evt.offsetX > RULER_LINE_DEFAULT_LENGTH * 2) return
      const interval = evt.clientY - vm.clientY
      vm.line.style.top = vm.offsetY + interval + 'px'
      vm.line.num = vm.start + vm.offsetY + interval
    },
    boundary(vm) {
      return {
        min: vm.start,
        max: vm.start + vm.height,
      }
    },
  },
}

export const RULER_MAP = {
  [COORDINATE_DIRECTION_MAP.xAxis]: {
    lineCount(ruler) {
      return Math.ceil(ruler.canvas.width / ruler.interval.line)
    },
    drawLine(ctx, pos, lineLength) {
      ctx.beginPath()
      ctx.moveTo(pos, 0)
      ctx.lineTo(pos, lineLength)
      ctx.stroke()
    },
    drawText(ctx, pos, text) {
      ctx.fillStyle = 'rgb(128, 128, 128)'
      ctx.beginPath()
      ctx.fillText(text, pos + 2, RULER_LINE_DEFAULT_LENGTH * 2)
    },
  },
  [COORDINATE_DIRECTION_MAP.yAxis]: {
    lineCount(ruler) {
      return Math.ceil(ruler.canvas.height / ruler.interval.line)
    },
    drawLine(ctx, pos, lineLength) {
      ctx.beginPath()
      ctx.moveTo(0, pos)
      ctx.lineTo(lineLength, pos)
      ctx.stroke()
    },
    drawText(ctx, pos, text) {
      ctx.save()
      ctx.fillStyle = 'rgb(128, 128, 128)'
      ctx.translate(RULER_LINE_DEFAULT_LENGTH * 2, pos - 2)
      ctx.rotate(-Math.PI / 2)
      ctx.beginPath()
      ctx.fillText(text, 0, 0)
      ctx.restore()
    },
  },
}

export default class Ruler {
  constructor({
    id,
    direction,
  }) {
    this.canvas = document.querySelector(`#${id}`)
    this.ctx = this.canvas.getContext('2d')
    this.direction = direction
    this.interval = {
      line: 10, // 线条间隔距离
      text: 100, // 文本间隔距离
    }
    this.start = 0
    this.offset = 0
  }

  draw() {
    // 清空画布
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    const lineCount = RULER_MAP[this.direction].lineCount(this)
    for (let i = 0; i < lineCount; i += 1) {
      const pos = this.offset + i * this.interval.line + 0.5
      const num = this.offset + i * this.interval.line + this.start
      let lineLength
      if (num % this.interval.text === 0) {
        lineLength = RULER_LINE_DEFAULT_LENGTH
        this.ctx.strokeStyle = 'rgb(184, 188, 191)'
      } else {
        lineLength = RULER_LINE_DEFAULT_LENGTH / 2
        this.ctx.strokeStyle = 'rgb(128, 128, 128)'
      }
      RULER_MAP[this.direction].drawLine(this.ctx, pos, lineLength)
      if (num % this.interval.text === 0) RULER_MAP[this.direction].drawText(this.ctx, pos, num)
    }
  }

  update({
    start,
  }) {
    this.start = start
    if (this.start <= 0) this.offset = Math.abs(this.start) % this.interval.line
    else this.offset = this.interval.line - this.start % this.interval.line
    this.draw()
  }
}
