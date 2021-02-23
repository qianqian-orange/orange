<template>
  <div
    v-show="visible"
    class="resizer-container"
  >
    <div
      v-for="line in lines"
      :key="line.id"
      class="resizer-line"
      :style="line.style"
    />
    <div
      v-for="circular in circulars"
      :key="circular.id"
      class="resizer-circular"
      :style="circular.style"
      @mousedown="circular.mousedown"
    />
  </div>
</template>

<script>
import { on, off } from '@/utils/dom'
import Resizer from './resizer'

let target = null
const resizer = new Resizer()

export default {
  name: 'Resizer',
  data() {
    return {
      lines: [],
      circulars: [],
      visible: false,
    }
  },
  mounted() {
    this.addEventListener()
  },
  beforeDestroy() {
    this.removeEventListener()
  },
  methods: {
    setData({ el, update, minWidth, minHeight }) {
      this.visible = true
      target = el
      resizer.setData({
        el,
        update,
        minWidth,
        minHeight,
      })
      this.lines = resizer.getLines()
      this.circulars = resizer.getCirculars()
    },
    mousedown(evt) {
      if (!target) return
      const el = evt.target
      if (el === target || this.$el.contains(el)) return
      this.visible = false
      target = null
    },
    mousemove(evt) {
      resizer.run(evt, () => {
        this.lines = resizer.getLines()
        this.circulars = resizer.getCirculars()
      })
    },
    mouseup(evt) {
      if (!target) return
      resizer.end(evt, ({ prev, current }) => {
        this.$emit('mouseup', target, prev, current)
      })
    },
    addEventListener() {
      on(document, 'mousedown', this.mousedown)
      on(document, 'mousemove', this.mousemove)
      on(document, 'mouseup', this.mouseup)
    },
    removeEventListener() {
      off(document, 'mousedown', this.mousedown)
      off(document, 'mousemove', this.mousemove)
      off(document, 'mouseup', this.mouseup)
    },
  },
}
</script>

<style lang="less" scoped>
  .resizer {
    &-container {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 100;
    }

    &-line {
      position: absolute;
      background-color: @blue;
    }

    &-circular {
      .expand-click(3.5px);

      position: absolute;
      transform: translate(-50%, -50%);
      width: 7px;
      height: 7px;
      border: 1px solid @blue;
      background-color: #fff;
      border-radius: 50%;
    }
  }
</style>
