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
import lodash from 'lodash'
import { mapState, mapActions } from 'vuex'
import uuid from '@/utils/uid'
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
    ...mapState('global', {
      globalState: state => state,
    }),
    ...mapState('canvas', {
      canvasState: state => state,
    }),
  },
  methods: {
    drop(evt) {
      evt.preventDefault()
      const {
        id,
        offsetX,
        offsetY,
      } = JSON.parse(evt.dataTransfer.getData('dataSource'))
      const widget = lodash.cloneDeep(this.globalState.widgetListMap[id])
      widget.id = `${widget.component}-${uuid()}`
      widget.style.container = {
        position: 'absolute',
        top: evt.offsetY - offsetY + 'px',
        left: evt.offsetX - offsetX + 'px',
        transformOrigin: '0 0',
        transform: `scale(${this.canvasState.zoom})`,
      }
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
