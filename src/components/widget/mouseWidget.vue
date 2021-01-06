<template>
  <widget
    :data-source="dataSource"
  >
    <template #markline>
      <slot name="markline" />
    </template>
  </widget>
</template>

<script>
import Widget from './index'
import { setTarget } from '@/lib/document'
import Bus, { CANVAS_WIDGET_BOOTSTRAP } from '@/utils/bus'
import widgetMixin from './mixins'

export default {
  name: 'MouseWidget',
  components: {
    Widget,
  },
  mixins: [widgetMixin],
  mounted() {
    this.addEventListener()
    Bus.$emit(CANVAS_WIDGET_BOOTSTRAP, this)
  },
  beforeDestroy() {
    this.removeEventListener()
  },
  methods: {
    addEventListener() {
      const el = this.$el
      this.mousedown = (evt) => {
        const target = evt.target
        target.position = {
          startX: target.offsetLeft,
          startY: target.offsetTop,
          clientX: evt.clientX,
          clientY: evt.clientY,
        }
        setTarget(target)
      }
      el.addEventListener('mousedown', this.mousedown)
    },
    removeEventListener() {
      const el = this.$el
      el.removeEventListener('mousedown', this.mousedown)
    },
  },
}
</script>
