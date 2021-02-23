<template>
  <div
    class="screen-canvas-container"
    @drop="drop"
    @dragover="dragover"
  >
    <mouse-widget
      v-for="widget in widgets"
      :key="widget.id"
      :data-source="widget"
    />
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import store from '@/material/store'
import { ADD_WIDGET } from '@/material/store/mutation-types'
import menu from './mixins/menu'
import MouseWidget from '@/components/widget/mouseWidget'

export default {
  name: 'ScreenCanvas',
  components: {
    MouseWidget,
  },
  mixins: [menu],
  computed: {
    widgets() {
      return store.widgets
    },
    ...mapState('canvas', {
      zoom: state => state.zoom,
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
      const { style } = widget.container
      style.position = 'absolute'
      // widget的zoom属性做了set拦截，当值改变时会自动计算container, componet的样式值
      style.top = (evt.offsetY - offsetY) / this.zoom + 'px'
      style.left = (evt.offsetX - offsetX) / this.zoom + 'px'
      widget.zoom = this.zoom
      store.emit(ADD_WIDGET, {
        widget,
        log: {
          source: 'layouts -> screen -> components -> canvas -> drop',
          reason: '添加组件',
        },
      })
    },
    dragover(evt) {
      evt.preventDefault()
    },
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
