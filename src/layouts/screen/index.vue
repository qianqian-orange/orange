<template>
  <div class="workspace-screen-view">
    <el-scrollbar
      ref="scrollbar"
      @scroll="scroll"
      @scroll-end="scrollEnd"
    >
      <div
        class="workspace-screen-container"
        :style="{
          width: screen.container.width,
          height: screen.container.height,
        }"
      >
        <grid />
        <screen-canvas />
        <screen-mark-line />
        <screen-resizer />
      </div>
    </el-scrollbar>
    <screen-ruler @scroll-to="scrollTo" />
    <hover-menu />
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { UPDATE_GLOBAL_DATA } from '@/store/modules/global/mutation-types'
import Grid from './components/grid'
import ScreenCanvas from './components/canvas'
import ScreenMarkLine from './components/markLine'
import ScreenResizer from './components/resizer'
import HoverMenu from '@/components/menu/hoverMenu'
import ScreenRuler from './components/ruler'
import scroll from './mixins/scroll'

export default {
  name: 'WorkspaceScreen',
  components: {
    Grid,
    ScreenCanvas,
    ScreenMarkLine,
    ScreenResizer,
    HoverMenu,
    ScreenRuler,
  },
  mixins: [scroll],
  computed: {
    ...mapState('global', {
      screen: state => state.screen,
    }),
  },
  mounted() {
    const {
      offsetWidth,
      offsetHeight,
    } = this.$el
    this[UPDATE_GLOBAL_DATA]({
      log: {
        source: 'WorkspaceScreen -> mounted',
        reason: '更新screen视图的宽高尺寸',
      },
      update: ({ screen: { view } }) => {
        view.width = offsetWidth + 'px'
        view.height = offsetHeight + 'px'
      },
    })
  },
  methods: {
    ...mapMutations('global', [UPDATE_GLOBAL_DATA]),
  },
}
</script>

<style lang="less" scoped>
  .workspace-screen {
    &-view {
      float: left;
      position: relative; // 给标尺定位用到
      overflow: hidden; // 隐藏标尺的参考线用到
      width: calc(100% - 251px - 230px);
      height: 100%;
      background-color: @deepBlack;
    }

    &-container {
      position: relative;
      z-index: 0; // 这里设置z-index是为了让container产生层级上下文，这样container的背景色就不会把grid遮住
      background-color: @deepBlack;
    }
  }
</style>
