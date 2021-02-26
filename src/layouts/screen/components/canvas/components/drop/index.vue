<template>
  <div
    v-show="visible"
    class="screen-drop-container"
    @drop="drop"
    @dragover="dragover"
  />
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import store from '@/material/store'
import Bus, {
  WIDGET_DRAG_START,
  WIDGET_DRAG_END,
} from '@/utils/bus'
import { ADD_WIDGET } from '@/material/store/mutation-types'

export default {
  name: 'DropContainer',
  data() {
    return {
      visible: false,
    }
  },
  computed: {
    ...mapGetters('widget', ['widgetMap']),
    ...mapGetters('canvas', ['origin']),
    ...mapState('canvas', {
      zoom: state => state.zoom,
    }),
  },
  mounted() {
    Bus.$on(WIDGET_DRAG_START, this.dragstart)
    Bus.$on(WIDGET_DRAG_END, this.dragend)
  },
  methods: {
    dragstart() {
      this.visible = true
    },
    dragend() {
      this.visible = false
    },
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
      style.top = (evt.offsetY - offsetY - this.origin.y) / this.zoom + 'px'
      style.left = (evt.offsetX - offsetX - this.origin.x) / this.zoom + 'px'
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
  .screen-drop-container {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1;
  }
</style>
