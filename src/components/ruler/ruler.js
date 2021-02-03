import { COORDINATE_DIRECTION_MAP } from '@/const/canvas'

// 记录当前移动的参考线节点
let target = null

export const RULER_BACK_BTN = 'RULER_BACK_BTN'

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
      target.dataset.num = vm.num + Math.floor(interval / vm.zoom)
    },
    mouseup(executor) {
      executor(target)
      target = null
    },
    update(line, el) {
      line.num = el.dataset.num
      line.style.left = el.style.left
    },
    offset(vm, el, offset) {
      el.style.left = Math.floor(+el.dataset.num * vm.zoom) - offset + 'px'
    },
    zoom(vm, line, zoom) {
      line.style.left = Math.floor(line.num * zoom) - vm.offset + 'px'
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
      target.dataset.num = vm.num + Math.floor(interval / vm.zoom)
    },
    mouseup(executor) {
      executor(target)
      target = null
    },
    update(line, el) {
      line.num = el.dataset.num
      line.style.top = el.style.top
    },
    offset(vm, el, offset) {
      el.style.top = Math.floor(+el.dataset.num * vm.zoom) - offset + 'px'
    },
    zoom(vm, line, zoom) {
      line.style.top = Math.floor(line.num * zoom) - vm.offset + 'px'
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
        height: vm.rect.height,
      }
      vm.line.num = Math.floor((vm.offset + vm.offsetX) / vm.zoom)
    },
    mousemove(vm, evt) {
      if (target) return
      if (evt.offsetY > parseInt(vm.height, 10)) {
        vm.line.visible = false
        return
      }
      const interval = evt.clientX - vm.clientX
      vm.line.style.left = vm.offsetX + interval + 'px'
      vm.line.num = Math.floor((vm.offset + vm.offsetX + interval) / vm.zoom)
    },
    boundary(vm) {
      return {
        min: Math.floor(vm.offset / vm.zoom),
        max: Math.floor((vm.offset + vm.width) / vm.zoom),
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
        width: vm.rect.width,
      }
      vm.line.num = Math.floor((vm.offset + vm.offsetY) / vm.zoom)
    },
    mousemove(vm, evt) {
      if (target) return
      if (evt.offsetX > parseInt(vm.width, 10)) {
        vm.line.visible = false
        return
      }
      const interval = evt.clientY - vm.clientY
      vm.line.style.top = vm.offsetY + interval + 'px'
      vm.line.num = Math.floor((vm.offset + vm.offsetY + interval) / vm.zoom)
    },
    boundary(vm) {
      return {
        min: Math.floor(vm.offset / vm.zoom),
        max: Math.floor((vm.offset + vm.height) / vm.zoom),
      }
    },
  },
}

const RULER_CANVAS_MAP = {
  [COORDINATE_DIRECTION_MAP.xAxis]: {
    scaleCount() {
      return Math.ceil(this.canvas.width / this.minimumScaleInterval)
    },
    drawScale(pos, scaleLength) {
      this.ctx.beginPath()
      this.ctx.moveTo(pos, 0)
      this.ctx.lineTo(pos, scaleLength)
      this.ctx.stroke()
    },
    drawText(pos, text) {
      this.ctx.fillStyle = 'rgb(128, 128, 128)'
      this.ctx.beginPath()
      this.ctx.fillText(text, pos + 2, this.maximumScaleLength * 2)
    },
  },
  [COORDINATE_DIRECTION_MAP.yAxis]: {
    scaleCount() {
      return Math.ceil(this.canvas.height / this.minimumScaleInterval)
    },
    drawScale(pos, scaleLength) {
      this.ctx.beginPath()
      this.ctx.moveTo(0, pos)
      this.ctx.lineTo(scaleLength, pos)
      this.ctx.stroke()
    },
    drawText(pos, text) {
      this.ctx.save()
      this.ctx.fillStyle = 'rgb(128, 128, 128)'
      this.ctx.translate(this.maximumScaleLength * 2, pos - 2)
      this.ctx.rotate(-Math.PI / 2)
      this.ctx.beginPath()
      this.ctx.fillText(text, 0, 0)
      this.ctx.restore()
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
    this.minimumScaleInterval = 10 // 最小刻度间隔
    this.maximumScaleInterval = this.minimumScaleInterval * 10
    this.minimumScaleLength = 4 // 最小刻度长度
    this.maximumScaleLength = this.minimumScaleLength * 2
    this.zoom = 1
    this.offset = 0 // 与坐标原点的偏移距离
    this.residue = 0 // 与第一个最小刻度的距离
  }

  draw() {
    // 清空画布
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    const count = RULER_CANVAS_MAP[this.direction].scaleCount.call(this)
    for (let i = 0; i < count; i += 1) {
      const pos = this.residue + i * this.minimumScaleInterval + 0.5
      const num = Math.floor((this.offset + this.residue + i * this.minimumScaleInterval) / this.zoom)
      let scaleLength
      if (num % (this.maximumScaleInterval / this.zoom) === 0) {
        scaleLength = this.maximumScaleLength
        this.ctx.strokeStyle = 'rgb(184, 188, 191)'
        RULER_CANVAS_MAP[this.direction].drawText.call(this, pos, num)
      } else {
        scaleLength = this.minimumScaleLength
        this.ctx.strokeStyle = 'rgb(128, 128, 128)'
      }
      RULER_CANVAS_MAP[this.direction].drawScale.call(this, pos, scaleLength)
    }
  }

  update({
    offset,
    zoom,
  }) {
    this.zoom = zoom || this.zoom
    this.offset = typeof offset === 'number' ? offset : this.offset
    if (this.offset <= 0) this.residue = Math.abs(this.offset) % this.minimumScaleInterval
    else this.residue = this.minimumScaleInterval - this.offset % this.minimumScaleInterval
    this.draw()
  }
}
