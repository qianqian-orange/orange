<template>
  <div
    id="app"
    class="workspace"
  >
    <workspace-header />
    <div class="workspace-main clearfix">
      <workspace-left-panel />
      <workspace-screen />
      <div class="workspace-right-panel">
        right-panel
      </div>
    </div>
  </div>
</template>

<script>
import WorkspaceHeader from './layouts/header'
import WorkspaceLeftPanel from './layouts/leftPanel'
import WorkspaceScreen from './layouts/screen'

export default {
  name: 'App',
  components: {
    WorkspaceHeader,
    WorkspaceLeftPanel,
    WorkspaceScreen,
  },
}
</script>

<style lang="less" scoped>
  #app {
    width: 100%;
    height: 100%;
  }

  .workspace {
    &-main {
      height: calc(100% - 52px);
    }

    &-right-panel {
      float: right;
      width: 230px;
      height: 100%;
      min-width: 230px;
      background-color: @black;
    }
  }
</style>
