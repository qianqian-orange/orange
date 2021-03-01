<template>
  <div
    class="screen-canvas-wrap"
    data-hovermenu="true"
    @click.self="onClick"
  >
    <grid :style="containerStyle" />
    <div
      ref="screen-canvas-container"
      class="screen-canvas-container"
      :style="containerStyle"
      data-hovermenu="true"
      @click.self="onClick"
    >
      <mouse-widget
        v-for="widget in widgets"
        :key="widget.id"
        :data-source="widget"
        data-hovermenu="true"
      />
      <mark-line @adjust="adjust" />
      <resizer @adjust="adjust" />
    </div>
    <drop-container />
    <hover-menu ref="hoverMenu" />
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import store from '@/material/store'
import Bus, { APPERANCE_EVENT_DATASOURCE } from '@/utils/bus'
import menu from './mixins/menu'
import Grid from './components/grid'
import MouseWidget from '@/components/widget/mouseWidget'
import MarkLine from './components/markLine'
import Resizer from './components/resizer'
import DropContainer from './components/drop'
import HoverMenu from '@/components/menu/hoverMenu'

export default {
  name: 'ScreenCanvas',
  components: {
    Grid,
    MouseWidget,
    MarkLine,
    Resizer,
    DropContainer,
    HoverMenu,
  },
  mixins: [menu],
  computed: {
    container() {
      return this.$refs['screen-canvas-container']
    },
    containerStyle() {
      return {
        top: `${this.origin.y}px`,
        left: `${this.origin.x}px`,
        width: this.width,
        height: this.height,
      }
    },
    widgets() {
      return store.widgets
    },
    ...mapGetters('canvas', ['origin']),
    ...mapState('canvas', {
      width: state => state.width,
      height: state => state.height,
    }),
  },
  methods: {
    onClick() {
      // 隐藏左面板的外观和事件模块
      Bus.$emit(APPERANCE_EVENT_DATASOURCE, null)
    },
    adjust({ widget, el }) {
      // 如果点击的组件在其它组件内，那么调整resizer或者markline节点的位置
      if (widget.parent) widget.parent.getInstance().$el.appendChild(el)
      else this.container.appendChild(el)
    },
  },
}
</script>

<style lang="less" scoped>
  .screen-canvas-wrap {
    position: relative;
    overflow: hidden;
    width: 100%;
    height: 100%;
  }

  .screen-canvas-container {
    position: absolute;
    z-index: 0;
  }
</style>

<style lang="less">
  .screen-canvas-container {
    .anticon svg {
      width: 100%;
      height: 100%;
    }
  }
</style>
