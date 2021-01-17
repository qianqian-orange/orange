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
import { mapMutations } from 'vuex'
import Bus, { CANVAS_WIDGET_RESIZE } from '@/utils/bus'
import {
  getTarget,
  mousemoveQueue,
} from '@/lib/document'
import { UPDATE_CANVAS_WIDGET_DATA } from '@/store/modules/canvas/mutation-types'
import { ADD_SNAPSHOT } from '@/store/modules/snapshot/mutation-types'
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
      identification: 'resizer',
    }
  },
  mounted() {
    // 移动组件的时候把resizer隐藏掉
    mousemoveQueue.push(() => {
      this.visible = false
    })
    Bus.$on(CANVAS_WIDGET_RESIZE, this.setData)
    this.addEventListener()
  },
  beforeDestroy() {
    this.removeEventListener()
  },
  methods: {
    setData() {
      target = getTarget()
      this.visible = true
      resizer.setEl(target)
      this.lines = resizer.getLines()
      this.circulars = resizer.getCirculars()
    },
    mousedown(evt) {
      if (!target) return
      const el = evt.target
      if (el.id !== target.id && el.dataset.identification !== this.identification) this.visible = false
    },
    mousemove(evt) {
      resizer.run(evt, () => {
        this.lines = resizer.getLines()
        this.circulars = resizer.getCirculars()
      })
    },
    mouseup(evt) {
      const id = target.id
      resizer.end(evt, ({ prev, current }) => {
        this[UPDATE_CANVAS_WIDGET_DATA]({
          id,
          update: ({ style: { container, component } }) => {
            container.top = current.top
            container.left = current.left
            component.width = current.width
            component.height = current.height
          },
        })
        this[ADD_SNAPSHOT]({
          undo: () => {
            this[UPDATE_CANVAS_WIDGET_DATA]({
              id,
              update: ({ style: { container, component } }) => {
                container.top = prev.top
                container.left = prev.left
                component.width = prev.width
                component.height = prev.height
              },
            })
          },
          redo: () => {
            this[UPDATE_CANVAS_WIDGET_DATA]({
              id,
              update: ({ style: { container, component } }) => {
                container.top = current.top
                container.left = current.left
                component.width = current.width
                component.height = current.height
              },
            })
          },
          free: () => {
            prev = null
            current = null
          },
        })
      })
    },
    addEventListener() {
      document.addEventListener('mousedown', this.mousedown)
      document.addEventListener('mousemove', this.mousemove)
      document.addEventListener('mouseup', this.mouseup)
    },
    removeEventListener() {
      document.removeEventListener('mousedown', this.mousedown)
      document.removeEventListener('mousemove', this.mousemove)
      document.removeEventListener('mouseup', this.mouseup)
    },
    ...mapMutations('canvas', [UPDATE_CANVAS_WIDGET_DATA]),
    ...mapMutations('snapshot', [ADD_SNAPSHOT]),
  },
}
</script>

<style lang="less" scoped>
  .resizer {
    &-container {
      position: relative;
      z-index: 10000;
    }

    &-line {
      position: absolute;
      background-color: @blue;
    }

    &-circular {
      .expand-click(-4.5px);

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
