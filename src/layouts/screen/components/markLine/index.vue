<template>
  <mark-line
    ref="markLine"
    :target="target"
    :zoom="zoom"
    @adsorb="adsorb"
  />
</template>

<script>
import { mapState } from 'vuex'
import { getTarget } from '@/lib/document'
import Bus, {
  DOCUMENT_MOUSE_MOVE,
  CANVAS_WIDGET_MOUSEDOWN,
} from '@/utils/bus'
import { COORDINATE_DIRECTION_MAP } from '@/const/canvas'
import MarkLine from '@/components/markLine'

export default {
  name: 'ScreenMarkLine',
  components: {
    MarkLine,
  },
  data() {
    return {
      target: {
        top: 0,
        left: 0,
        width: 0,
        height: 0,
      },
    }
  },
  computed: {
    ...mapState('canvas', {
      zoom: state => state.zoom,
      mouseWidgetList: state => state.mouseWidgetList,
    }),
  },
  mounted() {
    Bus.$on(CANVAS_WIDGET_MOUSEDOWN, this.mousedown)
    Bus.$on(DOCUMENT_MOUSE_MOVE, this.mousemove)
  },
  beforeDestroy() {
    Bus.$off(CANVAS_WIDGET_MOUSEDOWN, this.mousedown)
    Bus.$off(DOCUMENT_MOUSE_MOVE, this.mousemove)
  },
  methods: {
    mousedown() {
      const el = getTarget()
      const {
        id,
        offsetWidth,
        offsetHeight,
        offsetTop,
        offsetLeft,
      } = el
      this.target.top = offsetTop
      this.target.left = offsetLeft
      this.target.width = Math.floor(offsetWidth * this.zoom)
      this.target.height = Math.floor(offsetHeight * this.zoom)

      this.$refs.markLine.setData({
        neighbors: this.mouseWidgetList.filter(widget => widget.id !== id)
          .map(({ style: { container, component } }) => ({
            top: parseInt(container.top, 10),
            left: parseInt(container.left, 10),
            width: Math.floor(parseInt(component.width, 10) * this.zoom),
            height: Math.floor(parseInt(component.height, 10) * this.zoom),
          })),
      })
    },
    mousemove() {
      const el = getTarget()
      const {
        offsetTop,
        offsetLeft,
      } = el
      this.target.top = offsetTop
      this.target.left = offsetLeft
    },
    adsorb(direction, interval) {
      const el = getTarget()
      if (direction === COORDINATE_DIRECTION_MAP.yAxis) {
        this.target.left += interval
        el.style.left = this.target.left + 'px'
        el.position.startX += interval
      } else {
        this.target.top += interval
        el.style.top = this.target.top + 'px'
        el.position.startY += interval
      }
    },
  },
}
</script>
