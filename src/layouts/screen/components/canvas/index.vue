<template>
  <div
    class="screen-canvas-container"
    :data-identification="identification"
    @drop="drop"
    @dragover="dragover"
  >
    <mouse-widget
      v-for="widget in canvasState.mouseWidgetList"
      :key="widget.id"
      :data-source="widget"
    />
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import { ADD_WIDGET } from '@/store/modules/canvas/action-types'
import menu from './mixins/menu'
import MouseWidget from '@/components/widget/mouseWidget'

export default {
  name: 'ScreenCanvas',
  components: {
    MouseWidget,
  },
  mixins: [menu],
  data() {
    return {
      identification: 'screen-canvas',
    }
  },
  computed: {
    ...mapState('canvas', {
      canvasState: state => state,
    }),
    ...mapGetters('widget', [
      'widgetMap',
    ]),
  },
  methods: {
    drop(evt) {
      evt.preventDefault()
      const {
        id,
        offsetX,
        offsetY,
      } = JSON.parse(evt.dataTransfer.getData('dataSource'))
      const widget = this.widgetMap[id].clone()
      widget.draggable = false
      widget.children.forEach((item) => { item.draggable = false })
      const { style } = widget.container
      style.position = 'absolute'
      style.top = evt.offsetY - offsetY + 'px'
      style.left = evt.offsetX - offsetX + 'px'
      style.transformOrigin = '0 0'
      style.transform = `scale(${this.canvasState.zoom})`
      this[ADD_WIDGET](widget)
    },
    dragover(evt) {
      evt.preventDefault()
    },
    ...mapActions('canvas', [
      ADD_WIDGET,
    ]),
  },
}
</script>

<style lang="less" scoped>
  .screen-canvas-container {
    position: relative;
    overflow: hidden;
    width: 100%;
    height: 100%;
  }
</style>
