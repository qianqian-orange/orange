<template>
  <div
    @mousedown="mousedown"
    @click="remove"
  >
    <reference-line
      v-for="item in lines"
      v-show="item.visible"
      ref="line"
      :key="item.id"
      type="fixed"
      :data-source="item"
    />
  </div>
</template>

<script>
import { on, off } from '@/utils/dom'
import { SCROLL_END } from './const/event'
import {
  RULER_LINE_MAP,
  RULER_BACK_BTN,
} from './ruler'
import ReferenceLine from './line'

export default {
  name: 'ReferenceLineList',
  components: {
    ReferenceLine,
  },
  inject: ['store', 'eventEmitter', 'direction'],
  props: {
    boundary: { // 记录当前刻度的边界值
      type: Object,
      required: true,
    },
    offset: {
      type: Number,
      default: 0,
    },
    zoom: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      num: 0,
      move: false,
      startX: 0,
      startY: 0,
      clientX: 0,
      clientY: 0,
    }
  },
  computed: {
    lines() {
      return this.store.referenceLine[this.direction]
    },
  },
  watch: {
    offset(value) {
      // 当移动滚动条时需要修改参考线的位置
      this.getLineEls().forEach((el) => {
        RULER_LINE_MAP[this.direction].offset(this, el, value)
      })
    },
    zoom(value) {
      // 当缩放因子改变时需要修改参考线的位置
      this.store.update({
        update: ({ referenceLine }) => {
          referenceLine[this.direction].forEach((line) => {
            RULER_LINE_MAP[this.direction].zoom(this, line, value)
          })
        },
      })
    },
  },
  mounted() {
    this.eventEmitter.on(SCROLL_END, this.scrollEnd)
    this.addEventListener()
  },
  beforeDestroyed() {
    this.eventEmitter.off(SCROLL_END, this.scrollEnd)
    this.removeEventListener()
  },
  methods: {
    addEventListener() {
      on(document, 'mousemove', this.mousemove)
      on(document, 'mouseup', this.mouseup)
    },
    removeEventListener() {
      off(document, 'mousemove', this.mousemove)
      off(document, 'mouseup', this.mouseup)
    },
    mousedown(evt) {
      if (evt.target.dataset.action !== 'move') return
      this.move = true
      RULER_LINE_MAP[this.direction].mousedown(this, (target) => {
        this.num = +target.dataset.num
      }, evt)
    },
    mousemove(evt) {
      if (!this.move) return
      RULER_LINE_MAP[this.direction].mousemove(this, (target) => {
        // 当刻度线移动到返回按钮时进行隐藏
        if (evt.target.dataset.identification === RULER_BACK_BTN) target.style.display = 'none'
        else target.style.display = ''
      }, evt)
    },
    mouseup() {
      if (!this.move) return
      this.move = false
      RULER_LINE_MAP[this.direction].mouseup((target) => {
        const num = target.dataset.num
        const id = target.dataset.id
        if (num < this.boundary.min || num > this.boundary.max) {
          this.store.remove(this.direction, this.lines.findIndex(line => line.id === id))
        } else {
          this.store.update({
            update: ({ referenceLine }) => {
              const line = referenceLine[this.direction].find(line => line.id === id)
              RULER_LINE_MAP[this.direction].update(line, target)
            },
          })
        }
      })
    },
    remove(evt) {
      if (evt.target.dataset.action !== 'remove') return
      const id = evt.target.parentNode.dataset.id
      this.store.remove(this.direction, this.lines.findIndex(line => line.id === id))
    },
    getLineEls() {
      if (!this.$refs.line) return []
      return this.$refs.line.map(vm => vm.$el)
    },
    scrollEnd() {
      const lineEls = this.getLineEls()
      if (!lineEls.length) return
      this.store.update({
        update: ({ referenceLine }) => {
          referenceLine[this.direction].forEach((line, index) => {
            RULER_LINE_MAP[this.direction].update(line, lineEls[index])
          })
        },
      })
    },
  },
}
</script>
