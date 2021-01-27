<template>
  <div
    class="workspace-screen-view"
    :style="screenViewStyle"
  >
    <el-scrollbar
      ref="scrollbar"
      @scroll="scroll"
      @scroll-end="scrollEnd"
    >
      <div
        class="workspace-screen-container"
        :style="screenContainerStyle"
      >
        <grid />
        <screen-canvas />
      </div>
    </el-scrollbar>
    <ruler
      v-if="rulerState.visible"
      @scroll-to="scrollTo"
    />
    <hover-menu />
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { UPDATE_GLOBAL_DATA } from '@/store/modules/global/mutation-types'
import { UPDATE_RULER_DATA } from '@/store/modules/ruler/mutation-types'
import Grid from './components/grid'
import ScreenCanvas from './components/canvas'
import HoverMenu from '@/components/menu/hoverMenu'
import Ruler from './components/ruler'
import scroll from './mixins/scroll'

export default {
  name: 'WorkspaceScreen',
  components: {
    Grid,
    ScreenCanvas,
    HoverMenu,
    Ruler,
  },
  mixins: [scroll],
  computed: {
    screenViewStyle() {
      let paddingTop = 0
      let paddingLeft = 0
      if (this.rulerState.visible) {
        paddingTop = `${this.rulerState.size}px`
        paddingLeft = `${this.rulerState.size}px`
      }
      return {
        paddingTop,
        paddingLeft,
      }
    },
    screenContainerStyle() {
      const {
        width,
        height,
      } = this.globalState.screen.container
      return {
        width,
        height,
      }
    },
    ...mapState('global', {
      globalState: state => state,
    }),
    ...mapState('ruler', {
      rulerState: state => state,
    }),
  },
  watch: {
    'rulerState.visible'() {
      this.$nextTick(() => {
        this.$refs.scrollbar.update()
      })
    },
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
    this[UPDATE_RULER_DATA]({
      log: {
        source: 'WorkspaceScreen -> mounted',
        reason: '更新ruler视图的宽高尺寸',
      },
      update: ({ view }) => {
        view.width = offsetWidth + 'px'
        view.height = offsetHeight + 'px'
      },
    })
  },
  methods: {
    ...mapMutations('global', [UPDATE_GLOBAL_DATA]),
    ...mapMutations('ruler', [UPDATE_RULER_DATA]),
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
