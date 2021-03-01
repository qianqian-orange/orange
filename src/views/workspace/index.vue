<template>
  <div class="workspace-container">
    <workspace-header />
    <div class="workspace-main clearfix">
      <workspace-left-panel />
      <workspace-screen />
      <workspace-right-panel />
    </div>
  </div>
</template>

<script>
import WorkspaceHeader from '@/layouts/header'
import WorkspaceLeftPanel from '@/layouts/panel/left'
import WorkspaceScreen from '@/layouts/screen'
import WorkspaceRightPanel from '@/layouts/panel/right'

export default {
  name: 'WorkSpace',
  components: {
    WorkspaceHeader,
    WorkspaceLeftPanel,
    WorkspaceScreen,
    WorkspaceRightPanel,
  },
}
</script>

<style lang="less" scoped>
  .workspace {
    &-container {
      height: 100%;
    }

    &-main {
      height: calc(100% - 52px);
    }
  }
</style>

<style lang="less">
@import url("./theme.less");
</style>
