<template>
  <div class="workspace-screen-view">
    <el-scrollbar
      ref="scrollbar"
      @scroll="scroll"
    >
      <div
        class="workspace-screen-container"
        :style="screenStyle"
      >
        <grid />
        <div
          ref="canvas-container"
          class="canvas-container"
          :data-identification="identification"
          @drop="drop"
          @dragover="dragover"
        >
          <mark-line />
          <resizer />
          <mouse-widget
            v-for="widget in canvas.mouseWidgetList"
            :key="widget.id"
            :data-source="widget"
          />
        </div>
      </div>
    </el-scrollbar>
    <ruler
      :start-x="ruler.startX"
      :start-y="ruler.startY"
      :container="{
        width: screen.width,
        height: screen.height,
      }"
      @back="back2origin"
    />
    <hover-menu />
  </div>
</template>

<script>
import lodash from 'lodash'
import {
  mapState,
  mapActions,
  mapGetters,
} from 'vuex'
import uuid from '@/utils/uid'
import { ADD_WIDGET } from '@/store/modules/canvas/action-types'
import Grid from './components/grid'
import MouseWidget from '@/components/widget/mouseWidget'
import MarkLine from '@/components/markLine'
import Resizer from '@/components/resizer'
import HoverMenu from '@/components/menu/hoverMenu'
import Ruler from '@/components/ruler'
import menu from './mixins/menu'
import ruler from './mixins/ruler'

export default {
  name: 'WorkspaceScreen',
  components: {
    Grid,
    MouseWidget,
    MarkLine,
    Resizer,
    HoverMenu,
    Ruler,
  },
  mixins: [menu, ruler],
  data() {
    return {
      identification: 'canvas',
    }
  },
  computed: {
    screenStyle() {
      return {
        width: this.screen.width,
        height: this.screen.height,
      }
    },
    ...mapGetters('canvas', ['origin']),
    ...mapState('global', {
      screen: state => state.screen,
      widgetListMap: state => state.widgetListMap,
    }),
    ...mapState('canvas', {
      canvas: state => state,
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
      const widget = lodash.cloneDeep(this.widgetListMap[id])
      widget.id = `${widget.component}-${uuid()}`
      widget.style.container = {
        position: 'absolute',
        top: evt.offsetY - offsetY + 'px',
        left: evt.offsetX - offsetX + 'px',
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
  .workspace-screen {
    &-view {
      float: left;
      position: relative; // 给标尺定位用到
      overflow: hidden; // 隐藏标尺的刻度线用到
      width: calc(100% - 251px - 230px);
      height: 100%;
      padding-top: 18px;
      padding-left: 18px;
      background-color: @deepBlack;
    }

    &-container {
      position: relative;
      z-index: 0; // 这里设置z-index是为了让container产生层级上下文，这样container的背景色就不会把grid遮住
      background-color: @deepBlack;
    }
  }

  .canvas-container {
    position: relative;
    overflow: hidden;
    width: 100%;
    height: 100%;
  }
</style>
