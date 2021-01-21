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
      :data-identification="identification"
      @drop="drop"
      @dragover="dragover"
    >
      <mark-line />
      <resizer />
      <hover-menu />
      <mouse-widget
        v-for="widget in canvas.mouseWidgetList"
        :key="widget.id"
        :data-source="widget"
      />
    </div>
  </div>
</template>

<script>
import lodash from 'lodash'
import {
  mapState,
  mapActions,
  mapMutations,
} from 'vuex'
import uuid from '@/utils/uid'
import { UPDATE_CANVAS_DATE } from '@/store/modules/canvas/mutation-types'
import { ADD_WIDGET } from '@/store/modules/canvas/action-types'
import MouseWidget from '@/components/widget/mouseWidget'
import MarkLine from '@/components/markLine'
import Resizer from '@/components/resizer'
import HoverMenu from '@/components/menu/hoverMenu'
import menu from './mixins/menu'

export default {
  name: 'WorkspaceScreen',
  components: {
    MouseWidget,
    MarkLine,
    Resizer,
    HoverMenu,
  },
  mixins: [menu],
  data() {
    return {
      target: null,
      identification: 'canvas',
    }
  },
  computed: {
    ...mapState('global', {
      widgetListMap: state => state.widgetListMap,
    }),
    ...mapState('canvas', {
      canvas: state => state,
    }),
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
    drop(evt) {
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
    dragover(evt) {
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
    ...mapActions('canvas', [
      ADD_WIDGET,
    ]),
    ...mapMutations('canvas', [
      UPDATE_CANVAS_DATE,
    ]),
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
