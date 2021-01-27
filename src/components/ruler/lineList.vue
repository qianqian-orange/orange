<template>
  <div
    class="ruler-line-container"
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
import { mapState, mapMutations } from 'vuex'
import { on, off } from '@/utils/dom'
import eventEmitter, { SCROLL_END } from './eventEmitter'
import { DELETE_REFERENCE_LINE, UPDATE_RULER_DATA } from '@/store/modules/ruler/mutation-types'
import {
  RULER_LINE_MAP,
  RULER_IDENTIFICATION_MAP,
} from './ruler'
import ReferenceLine from './line'

export default {
  name: 'ReferenceLineList',
  components: {
    ReferenceLine,
  },
  inject: ['direction'],
  props: {
    boundary: { // 记录刻度的最小值和最大值
      type: Object,
      required: true,
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
    ...mapState('ruler', {
      lines(state) {
        return state.referenceLine[this.direction]
      },
    }),
  },
  mounted() {
    eventEmitter.on(SCROLL_END, this.scrollEnd)
    this.addEventListener()
  },
  beforeDestroyed() {
    this.removeEventListener()
  },
  destroyed() {
    eventEmitter.off(SCROLL_END, this.scrollEnd)
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
        if (evt.target.dataset.identification === RULER_IDENTIFICATION_MAP.backBtn) target.style.display = 'none'
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
          this[DELETE_REFERENCE_LINE]({
            direction: this.direction,
            index: this.lines.findIndex(line => line.id === id),
          })
        } else {
          this[UPDATE_RULER_DATA]({
            log: {
              source: 'ReferenceLineList -> mouseup',
              reason: '当参考线移动结束后需要修改对应数据',
            },
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
      this[DELETE_REFERENCE_LINE]({
        direction: this.direction,
        index: this.lines.findIndex(line => line.id === id),
      })
    },
    getLineEls() {
      if (!this.$refs.line) return []
      return this.$refs.line.map(vm => vm.$el)
    },
    offset(start) {
      this.getLineEls().forEach((el) => {
        RULER_LINE_MAP[this.direction].offset(el, start)
      })
    },
    scrollEnd() {
      const lineEls = this.getLineEls()
      if (!lineEls.length) return
      this[UPDATE_RULER_DATA]({
        log: {
          source: 'ReferenceLineList -> scrollEnd',
          reason: '当滚动结束后需要修改参考线的数据',
        },
        update: ({ referenceLine }) => {
          referenceLine[this.direction].forEach((line, index) => {
            RULER_LINE_MAP[this.direction].update(line, lineEls[index])
          })
        },
      })
    },
    ...mapMutations('ruler', [DELETE_REFERENCE_LINE, UPDATE_RULER_DATA]),
  },
}
</script>
