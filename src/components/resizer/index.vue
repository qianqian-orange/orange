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
      :data-identification="identification"
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
  props: {
    zoom: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      lines: [],
      circulars: [],
      visible: false,
      identification: 'resizer',
    }
  },
  watch: {
    zoom() {
      if (!target) return
      // 由于缩放会修改节点的样式值，为了获取到最新的样式值，需要在nextTick时在执行
      this.$nextTick(() => {
        this.setData(target)
      })
    },
  },
  mounted() {
    this.addEventListener()
  },
  beforeDestroy() {
    this.removeEventListener()
  },
  methods: {
    setData({ el, minWidth, minHeight, update }) {
      this.visible = true
      target = el
      resizer.setData({
        el,
        update,
        minWidth,
        minHeight,
        zoom: this.zoom,
      })
      this.lines = resizer.getLines()
      this.circulars = resizer.getCirculars()
    },
    mousedown(evt) {
      if (!target) return
      const el = evt.target
      if (el.id !== target.id && el.dataset.identification !== this.identification) {
        this.visible = false
        target = null
      }
    },
    mousemove(evt) {
      resizer.run(evt, () => {
        this.lines = resizer.getLines()
        this.circulars = resizer.getCirculars()
      })
    },
    mouseup(evt) {
      if (!target) return
      const id = target.id
      resizer.end(evt, ({ prev, current }) => {
        this.$emit('mouseup', id, prev, current)
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
