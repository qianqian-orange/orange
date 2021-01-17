<template>
  <div
    id="app"
    class="workspace"
  >
    <workspace-header />
    <div class="workspace-main">
      <workspace-left-panel />
      <workspace-screen />
      <div class="workspace-right-panel">
        right-panel
      </div>
    </div>
  </div>
</template>

<script>
import WorkspaceHeader from './components/layout/header'
import WorkspaceLeftPanel from './components/layout/leftPanel'
import WorkspaceScreen from './components/layout/screen'

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
    display: flex;
    flex-direction: column;

    &-main {
      display: flex;
      flex: 1;
    }

    &-right-panel {
      width: 230px;
      background-color: @black;
    }
  }
</style>
