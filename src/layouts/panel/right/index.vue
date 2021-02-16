<template>
  <div class="workspace-right-panel">
    right-panel
  </div>
</template>

<script>
export default {
  name: 'WorkspaceRightPanel',
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
