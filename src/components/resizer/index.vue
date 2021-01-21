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
import { mapActions } from 'vuex'
import Bus, {
  CANVAS_WIDGET_RESIZE,
  DOCUMENT_MOUSE_DOWN,
  DOCUMENT_MOUSE_MOVE,
} from '@/utils/bus'
import { ADD_CANVAS_WIDGET_UPDATE_SNAPSHOT } from '@/store/modules/canvas/action-types'
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
    Bus.$on(DOCUMENT_MOUSE_DOWN, this.documentMousedown)
    // 移动组件的时候把resizer隐藏掉
    Bus.$on(DOCUMENT_MOUSE_MOVE, this.documentMousemove)
    Bus.$on(CANVAS_WIDGET_RESIZE, this.setData)
    this.addEventListener()
  },
  beforeDestroy() {
    Bus.$off(DOCUMENT_MOUSE_DOWN, this.documentMousedown)
    Bus.$off(DOCUMENT_MOUSE_MOVE, this.documentMousemove)
    Bus.$off(CANVAS_WIDGET_RESIZE, this.setData)
    this.removeEventListener()
  },
  methods: {
    setData(el) {
      target = el
      this.visible = true
      resizer.setEl(target)
      this.lines = resizer.getLines()
      this.circulars = resizer.getCirculars()
    },
    documentMousedown(evt) {
      if (!target) return
      const el = evt.target
      if (el.id !== target.id && el.dataset.identification !== this.identification) this.visible = false
    },
    documentMousemove() {
      this.visible = false
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
        this[ADD_CANVAS_WIDGET_UPDATE_SNAPSHOT]({
          id,
          update: ({ style: { container, component } }) => {
            container.top = current.top
            container.left = current.left
            component.width = current.width
            component.height = current.height
          },
          snapshot: {
            undo: ({ style: { container, component } }) => {
              container.top = prev.top
              container.left = prev.left
              component.width = prev.width
              component.height = prev.height
            },
            free: () => {
              prev = null
              current = null
            },
          },
        })
      })
    },
    addEventListener() {
      document.addEventListener('mousemove', this.mousemove)
      document.addEventListener('mouseup', this.mouseup)
    },
    removeEventListener() {
      document.removeEventListener('mousemove', this.mousemove)
      document.removeEventListener('mouseup', this.mouseup)
    },
    ...mapActions('canvas', [ADD_CANVAS_WIDGET_UPDATE_SNAPSHOT]),
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
