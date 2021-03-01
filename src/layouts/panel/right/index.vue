<template>
  <div class="workspace-right-panel">
    <a-tabs>
      <a-tab-pane
        v-for="item in items"
        :key="item.key"
        :tab="item.tab"
      >
        <el-scrollbar>
          <component :is="item.is" />
        </el-scrollbar>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import createStore from './store'
import OrangeProject from './components/project'
import OrangeApperance from './components/apperance'
import OrangeAttribute from './components/attribute'
import OrangeEvent from './components/event'

export default {
  name: 'WorkspaceRightPanel',
  components: {
    OrangeProject,
    OrangeApperance,
    OrangeAttribute,
    OrangeEvent,
  },
  provide() {
    return {
      store: this.store,
    }
  },
  data() {
    return {
      store: createStore(),
    }
  },
  computed: {
    items() {
      const tabPanels = []
      if (!this.store.dataSource) {
        tabPanels.push({
          is: 'orange-project',
          key: 'project',
          tab: '项目设置',
        })
      } else {
        tabPanels.push({
          is: 'orange-apperance',
          key: 'apperance',
          tab: '外观',
        }, {
          is: 'orange-attribute',
          key: 'attribute',
          tab: '属性',
        }, {
          is: 'orange-event',
          key: 'event',
          tab: '事件',
        })
      }
      return tabPanels
    },
  },
  beforeDestroy() {
    this.store.destroy()
  },
}
</script>

<style lang="less" scoped>
  .workspace {
    &-right-panel {
      float: right;
      width: 230px;
      height: 100%;
      min-width: 230px;
      background-color: @black;
    }
  }
</style>

<style lang="less">
  .workspace-right-panel .ant-tabs {
    height: 100%;
    color: @textSecondaryColor;

    .ant-tabs-bar {
      margin-bottom: 0;
      border-bottom: 1px solid @deepBlack;
    }

    .ant-tabs-nav-container {
      font-size: 12px;
    }

    .ant-tabs-nav {
      .ant-tabs-tab {
        padding: 11px 0;
        margin: 0 10px 0 0;
      }

      .ant-tabs-tab:first-child {
        margin-left: 10px;
      }

      .ant-tabs-tab-active {
        color: #fff;
      }

      .ant-tabs-tab:not(.ant-tabs-tab-active):hover {
        color: @textPrimaryColor;
      }
    }

    .ant-tabs-content {
      height: calc(100% - 39px);
    }

    .ant-tabs-ink-bar {
      background-color: #fff;
    }
  }

  .workspace-right-panel .el-scrollbar {
    .el-scrollbar__view {
      width: 100%;
    }
  }
</style>
