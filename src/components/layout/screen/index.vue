<template>
  <div class="workspace-screen-container">
    <div class="grid-container">
      <svg
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="smallGrid"
            width="10"
            height="10"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 10 0 L 0 0 0 10"
              fill="none"
              stroke="rgba(207, 207, 207, 0.3)"
              stroke-width="1"
            />
          </pattern>
          <pattern
            id="grid"
            width="50"
            height="50"
            patternUnits="userSpaceOnUse"
          >
            <rect
              width="50"
              height="50"
              fill="url(#smallGrid)"
            />
            <path
              d="M 50 0 L 0 0 0 50"
              fill="none"
              stroke="rgba(186, 186, 186, 0.5)"
              stroke-width="1"
            />
          </pattern>
        </defs>
        <rect
          width="100%"
          height="100%"
          fill="url(#grid)"
        />
      </svg>
    </div>
    <div
      ref="canvas-container"
      class="canvas-container"
      @drop="dropHandler"
      @dragover="dragoverHandler"
    >
      <mouse-widget
        v-for="widget in widgetList"
        :key="widget.id"
        :data-source="widget"
        @bootstrap="bootstrap"
      />
      <mark-line />
      <resizer />
    </div>
  </div>
</template>

<script>
import lodash from 'lodash'
import {
  mapState,
  mapGetters,
  mapMutations,
} from 'vuex'
import {
  UPDATE_CANVAS_DATE,
  UPDATE_CANVAS_WIDGET_DATA,
  ADD_WIDGET,
} from '@/store/modules/canvas/mutation-types'
import { ADD_SNAPSHOT } from '@/store/modules/snapshot/mutation-types'
import uuid from '@/utils/uid'
import MouseWidget from '@/components/widget/mouseWidget'
import MarkLine from '@/components/widget/markLine'
import Resizer from '@/components/widget/resizer'

export default {
  name: 'WorkspaceScreen',
  components: {
    MouseWidget,
    MarkLine,
    Resizer,
  },
  data() {
    return {
      target: null,
    }
  },
  computed: {
    ...mapState('global', {
      widgetListMap: state => state.widgetListMap,
    }),
    ...mapState('canvas', {
      canvas: state => state,
    }),
    ...mapGetters('canvas', [
      'widgetList',
    ]),
  },
  mounted() {
    this.initData()
  },
  methods: {
    initData() {
      const canvasEl = this.$refs['canvas-container']
      this[UPDATE_CANVAS_DATE]((canvas) => {
        canvas.width = canvasEl.offsetWidth
        canvas.height = canvasEl.offsetHeight
      })
    },
    dropHandler(evt) {
      evt.preventDefault()
      const {
        id,
        offsetX,
        offsetY,
      } = JSON.parse(evt.dataTransfer.getData('dataSource'))
      const widget = lodash.cloneDeep(this.widgetListMap[id])
      widget.id = `${widget.component}-${uuid()}`
      const { x, y } = this.calcPosition(
        evt.offsetX - offsetX,
        evt.offsetY - offsetY,
        { width: widget.width, height: widget.height },
        { width: this.canvas.width, height: this.canvas.height },
      )
      widget.style.container = {
        position: 'absolute',
        top: y + 'px',
        left: x + 'px',
      }
      this.target = widget
      this[ADD_WIDGET](widget)
    },
    dragoverHandler(evt) {
      evt.preventDefault()
    },
    calcPosition(x, y, size, rect) {
      if (x < 0) x = 0
      else if (x + size.width > rect.width) x = rect.width - size.width
      if (y < 0) y = 0
      else if (y + size.height > rect.height) y = rect.height - size.height
      return {
        x,
        y,
      }
    },
    bootstrap(vm) {
      if (!this.target) return
      const id = this.target.id
      const el = document.querySelector(`#${id}`)
      const parentNode = el.parentNode
      this[ADD_SNAPSHOT]({
        undo: () => {
          this[UPDATE_CANVAS_WIDGET_DATA]({
            id,
            update: (widget) => {
              widget.display = 'none'
            },
          })
          parentNode.removeChild(el)
        },
        redo: () => {
          this[UPDATE_CANVAS_WIDGET_DATA]({
            id,
            update: (widget) => {
              widget.display = 'visible'
            },
          })
          parentNode.appendChild(el)
        },
        free: () => {
          vm.$destroy()
        },
      })
      this.target = null
    },
    ...mapMutations('canvas', [UPDATE_CANVAS_DATE, UPDATE_CANVAS_WIDGET_DATA, ADD_WIDGET]),
    ...mapMutations('snapshot', [ADD_SNAPSHOT]),
  },
}
</script>

<style lang="less" scoped>
  .workspace {
    &-screen-container {
      position: relative;
      flex: 1;
    }
  }

  .grid-container {
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    width: 100%;
    height: 100%;
  }

  .canvas-container {
    position: relative;
    z-index: 0;
    width: 100%;
    height: 100%;
  }
</style>
