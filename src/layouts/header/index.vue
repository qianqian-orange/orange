<template>
  <div class="workspace-header">
    <ul class="toolbar">
      <undo />
      <redo />
      <zoom />
      <save />
    </ul>
  </div>
</template>

<script>
import Undo from './components/undo'
import Redo from './components/redo'
import Zoom from './components/zoom'
import Save from './components/save'

export default {
  name: 'WorkspaceHeader',
  components: {
    Undo,
    Redo,
    Zoom,
    Save,
  },
}
</script>

<style lang="less" scoped>
  .workspace-header {
    box-sizing: border-box;
    height: 52px;
    padding-left: 248px;
    border-bottom: 1px solid @deepBlack;
    background-color: @lightBlack;

    .toolbar {
      display: flex;
      height: 100%;
      color: @textPrimaryColor;
      font-size: 12px;
    }
  }
</style>
