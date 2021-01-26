<template>
  <div
    class="ruler-line-container"
    @mousedown="mousedown"
    @click="remove"
  >
    <ruler-line
      v-for="item in lines"
      v-show="item.visible"
      :key="item.id"
      class="fixed"
      :data-source="item"
    />
  </div>
</template>

<script>
import { on, off } from '@/utils/dom'
import { splice } from '@/utils/array'
import {
  RULER_LINE_MAP,
  RULER_IDENTIFICATION_MAP,
} from './ruler'
import RulerLine from './line'

export default {
  name: 'RulerLineList',
  components: {
    RulerLine,
  },
  inject: ['direction'],
  props: {
    num: { // 记录刻度的最小值和最大值
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      lines: [],
      target: null,
    }
  },
  mounted() {
    this.addEventListener()
  },
  beforeDestroy() {
    this.removeEventListener()
  },
  methods: {
    add(line) {
      this.lines.push(line)
    },
    mousedown(evt) {
      if (evt.target.dataset.action !== 'move') return
      this.target = this.lines.find(item => item.id === evt.target.dataset.id)
      RULER_LINE_MAP[this.direction].mousedown(this, evt)
    },
    mousemove(evt) {
      if (!this.target) return
      // 当刻度线移动到返回按钮时进行隐藏
      if (evt.target.dataset.identification === RULER_IDENTIFICATION_MAP.backBtn) this.target.visible = false
      else this.target.visible = true
      RULER_LINE_MAP[this.direction].mousemove(this, evt)
    },
    mouseup() {
      if (!this.target) return
      if (this.target.num < this.num.min || this.target.num > this.num.max) splice(this.lines, this.target)
      this.target = null
      RULER_LINE_MAP[this.direction].mouseup()
    },
    remove(evt) {
      if (evt.target.dataset.action !== 'remove') return
      splice(this.lines, this.lines.findIndex(item => item.id === evt.target.dataset.id))
    },
    addEventListener() {
      on(document, 'mousemove', this.mousemove)
      on(document, 'mouseup', this.mouseup)
    },
    removeEventListener() {
      off(document, 'mousemove', this.mousemove)
      off(document, 'mouseup', this.mouseup)
    },
    update(num) {
      this.lines.forEach((line) => {
        RULER_LINE_MAP[this.direction].update(line, num)
      })
    },
  },
}
</script>
