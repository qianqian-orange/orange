import lodash from 'lodash'
import { COORDINATE_DIRECTION_MAP } from '@/const/canvas'

const RULER_LINE_DEFAULT_LENGTH = 8

let copy = null

export const RULER_COORDINATE_ORIGIN = {
  x: 0,
  y: 0,
}

export const RULER_IDENTIFICATION_MAP = {
  backBtn: 'ruler-back-btn',
}

export const RULER_LINE_MAP = {
  [COORDINATE_DIRECTION_MAP.xAxis]: {
    mousedown(vm, evt) {
      copy = lodash.cloneDeep(vm.target)
      vm.clientX = evt.clientX
    },
    mousemove(vm, evt) {
      const interval = evt.clientX - vm.clientX
      vm.target.style.left = parseInt(copy.style.left, 10) + interval + 'px'
      vm.target.num = copy.num + interval
    },
    mouseup() {
      copy = null
    },
    update(line, { min }) {
      line.style.left = line.num - (min - RULER_COORDINATE_ORIGIN.x) + 'px'
    },
  },
  [COORDINATE_DIRECTION_MAP.yAxis]: {
    mousedown(vm, evt) {
      copy = lodash.cloneDeep(vm.target)
      vm.clientY = evt.clientY
    },
    mousemove(vm, evt) {
      const interval = evt.clientY - vm.clientY
      vm.target.style.top = parseInt(copy.style.top, 10) + interval + 'px'
      vm.target.num = copy.num + interval
    },
    mouseup() {
      copy = null
    },
    update(line, { min }) {
      line.style.top = line.num - (min - RULER_COORDINATE_ORIGIN.y) + 'px'
    },
  },
}

export const RULER_BAR_MAP = {
  [COORDINATE_DIRECTION_MAP.xAxis]: {
    mouseenter(vm, evt) {
      // 当拖拽刻度线时不触发另一个标尺的标线显示
      if (copy) return
      vm.offsetX = evt.offsetX
      vm.clientX = evt.clientX
      vm.line.visible = true
      vm.line.style = {
        left: vm.offsetX + 'px',
        height: vm.rect.height,
      }
      vm.line.num = vm.start + vm.offsetX
    },
    mousemove(vm, evt) {
      if (copy) return
      if (evt.offsetY > RULER_LINE_DEFAULT_LENGTH * 2) return
      const interval = evt.clientX - vm.clientX
      vm.line.style.left = vm.offsetX + interval + 'px'
      vm.line.num = vm.start + vm.offsetX + interval
    },
    num(vm) {
      return {
        min: vm.start,
        max: vm.start + vm.width,
      }
    },
  },
  [COORDINATE_DIRECTION_MAP.yAxis]: {
    mouseenter(vm, evt) {
      if (copy) return
      vm.offsetY = evt.offsetY
      vm.clientY = evt.clientY
      vm.line.visible = true
      vm.line.style = {
        top: vm.offsetY + 'px',
        width: vm.rect.width,
      }
      vm.line.num = vm.start + vm.offsetY
    },
    mousemove(vm, evt) {
      if (copy) return
      if (evt.offsetX > RULER_LINE_DEFAULT_LENGTH * 2) return
      const interval = evt.clientY - vm.clientY
      vm.line.style.top = vm.offsetY + interval + 'px'
      vm.line.num = vm.start + vm.offsetY + interval
    },
    num(vm) {
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
