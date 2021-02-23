<template>
  <mark-line
    ref="markLine"
    :rect="rect"
    @adsorb="adsorb"
  />
</template>

<script>
import store from '@/material/store'
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
      rect: {
        top: 0,
        left: 0,
        width: 0,
        height: 0,
      },
    }
  },
  computed: {
    widgets() {
      return store.widgets
    },
    markLine() {
      return this.$refs.markLine
    },
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
      const widget = el[el.id]
      this.$emit('adjust', {
        widget,
        el: this.markLine.$el,
      })
      const {
        offsetWidth,
        offsetHeight,
        offsetTop,
        offsetLeft,
      } = el
      this.rect.top = offsetTop
      this.rect.left = offsetLeft
      this.rect.width = offsetWidth
      this.rect.height = offsetHeight
      const widgets = widget.parent ? widget.parent.children : this.widgets
      this.markLine.setData({
        neighbors: widgets.filter(item => item !== widget)
          .map(({ container, component }) => ({
            top: parseInt(container.style.top, 10),
            left: parseInt(container.style.left, 10),
            width: parseInt(component.style.width, 10),
            height: parseInt(component.style.height, 10),
          })),
      })
    },
    mousemove() {
      const el = getTarget()
      const {
        offsetTop,
        offsetLeft,
      } = el
      this.rect.top = offsetTop
      this.rect.left = offsetLeft
    },
    adsorb(direction, interval) {
      const el = getTarget()
      if (direction === COORDINATE_DIRECTION_MAP.yAxis) {
        this.rect.left += interval
        el.style.left = this.rect.left + 'px'
        el.position.startX += interval
      } else {
        this.rect.top += interval
        el.style.top = this.rect.top + 'px'
        el.position.startY += interval
      }
    },
  },
}
</script>
