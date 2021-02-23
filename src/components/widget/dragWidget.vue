<template>
  <widget :data-source="dataSource">
    <drag-widget
      v-for="widget in dataSource.children"
      :key="widget.id"
      :data-source="widget"
    />
  </widget>
</template>

<script>
import { on, off } from '@/utils/dom'
import Widget from './index'

export default {
  name: 'DragWidget',
  components: {
    Widget,
  },
  props: {
    dataSource: {
      type: Object,
      required: true,
    },
  },
  mounted() {
    this.addEventListener()
  },
  beforeDestroy() {
    const el = this.$el
    off(el, 'dragstart', this.dragstart)
    off(el, 'dragend', this.dragend)
  },
  methods: {
    dragstart(evt) {
      evt.target.style.transform = 'translateZ(0)'
      evt.dataTransfer.setData('dataSource', JSON.stringify({
        id: evt.target.id,
        offsetX: evt.offsetX,
        offsetY: evt.offsetY,
      }))
    },
    dragend(evt) {
      evt.target.style.transform = ''
    },
    addEventListener() {
      const el = this.$el
      on(el, 'dragstart', this.dragstart)
      on(el, 'dragend', this.dragend)
    },
  },
}
</script>
