<template>
  <resizer
    ref="resizer"
    :zoom="zoom"
    @mouseup="mouseup"
  />
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Bus, {
  CANVAS_WIDGET_RESIZE,
  DOCUMENT_MOUSE_MOVE,
  CANVAS_WIDGET_RESIZER_VISIBLE,
} from '@/utils/bus'
import { ADD_CANVAS_WIDGET_UPDATE_SNAPSHOT } from '@/store/modules/canvas/action-types'
import Resizer from '@/components/resizer'

export default {
  name: 'ScreenResizer',
  components: {
    Resizer,
  },
  computed: {
    ...mapState('canvas', {
      zoom: state => state.zoom,
    }),
  },
  mounted() {
    Bus.$on(CANVAS_WIDGET_RESIZER_VISIBLE, this.toggle)
    Bus.$on(DOCUMENT_MOUSE_MOVE, this.mousemove)
    Bus.$on(CANVAS_WIDGET_RESIZE, this.setData)
  },
  beforeDestroy() {
    Bus.$off(DOCUMENT_MOUSE_MOVE, this.mousemove)
    Bus.$off(CANVAS_WIDGET_RESIZE, this.setData)
  },
  methods: {
    toggle(visible) {
      this.$refs.resizer.visible = visible
    },
    mousemove() {
      // 拖拽组件时隐藏resizer
      this.$refs.resizer.visible = false
    },
    setData(el) {
      const {
        style: {
          minWidth,
          minHeight,
        },
      } = el.firstChild
      this.$refs.resizer.setData({
        el,
        minWidth: parseInt(minWidth, 10),
        minHeight: parseInt(minHeight, 10),
        update: {
          width: (val) => { el.firstChild.style.width = val },
          height: (val) => { el.firstChild.style.height = val },
          top: (val) => { el.style.top = val },
          left: (val) => { el.style.left = val },
        },
      })
    },
    mouseup(id, prev, current) {
      const zoom = this.zoom
      this[ADD_CANVAS_WIDGET_UPDATE_SNAPSHOT]({
        id,
        update: ({ widget: { container, component } }) => {
          container.style.top = current.top
          container.style.left = current.left
          component.style.width = current.width
          component.style.height = current.height
        },
        snapshot: {
          undo: ({ state, widget: { container, component } }) => {
            const percent = state.zoom / zoom
            container.style.top = Math.floor(parseInt(prev.top, 10) * percent) + 'px'
            container.style.left = Math.floor(parseInt(prev.left, 10) * percent) + 'px'
            component.style.width = prev.width
            component.style.height = prev.height
          },
          redo: ({ state, widget: { container, component } }) => {
            const percent = state.zoom / zoom
            container.style.top = Math.floor(parseInt(current.top, 10) * percent) + 'px'
            container.style.left = Math.floor(parseInt(current.left, 10) * percent) + 'px'
            component.style.width = current.width
            component.style.height = current.height
          },
          free: () => {
            prev = null
            current = null
          },
        },
      })
    },
    ...mapActions('canvas', [ADD_CANVAS_WIDGET_UPDATE_SNAPSHOT]),
  },
}
</script>
