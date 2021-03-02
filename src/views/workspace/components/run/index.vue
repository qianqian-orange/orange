<template>
  <div class="workspace-run-container">
    <div class="workspace-run-header">
      <div
        class="workspace-run-header-goback"
        @click="goback"
      >
        <a-icon type="left" />
      </div>
    </div>
    <div class="workspace-run-main">
      <el-scrollbar>
        <div :style="{ width, height }">
          <sandbox
            v-if="widgets.length"
            :widgets="widgets"
          />
        </div>
      </el-scrollbar>
      <a-spin :spinning="loading" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import store from '@/material/store'
import { UPDATE_WIDGET } from '@/material/store/mutation-types'
import { WORKSPACE } from '@/const/router'
import Sandbox from './sandbox'

export default {
  name: 'WorkspaceRun',
  components: {
    Sandbox,
  },
  data() {
    return {
      loading: true,
    }
  },
  computed: {
    widgets() {
      return store.widgets
    },
    ...mapState('canvas', {
      zoom: state => state.zoom,
      width: state => state.width,
      height: state => state.height,
    }),
  },
  watch: {
    widgets() {
      this.loading = false
    },
  },
  mounted() {
    if (this.widgets.length) this.loading = false
  },
  methods: {
    goback() {
      store.emit(UPDATE_WIDGET, {
        log: {
          source: 'views -> workspace -> components -> run',
          reason: '从预览页面返回到控制台时组件需要适应当前画布缩放因子',
        },
        update: (state) => {
          state.widgets.forEach((widget) => {
            widget.zoom = this.zoom
          })
        },
      })
      this.$router.push({ name: WORKSPACE })
    },
  },
}
</script>

<style lang="less" scoped>
  .workspace-run {
    &-container {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      // 这里层级不能太大，不然会遮住a-select的下拉框
      z-index: 1000;
    }

    &-main {
      position: relative;
      z-index: 0;
      height: calc(100% - 52px);
      background-color: #fff;

      .ant-spin {
        position: absolute;
        top: 80px;
        left: 50%;
        transform: translate(-50%);
      }
    }
  }

  .workspace-run-header {
    height: 52px;
    border-bottom: 1px solid @deepBlack;
    background-color: @lightBlack;

    &-goback {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 44px;
      height: 100%;
      color: @greyWhite;
      font-size: 14px;
      cursor: pointer;

      &:hover {
        background-color: @deepBlack;
      }
    }
  }
</style>
