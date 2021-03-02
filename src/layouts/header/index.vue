<template>
  <div class="workspace-header">
    <ul class="toolbar">
      <component
        :is="item"
        v-for="item in items"
        :key="item.name"
      />
    </ul>
  </div>
</template>

<script>
import Undo from './components/undo'
import Redo from './components/redo'
import Zoom from './components/zoom'
import Save from './components/save'
import Run from './components/run'

export default {
  name: 'WorkspaceHeader',
  data() {
    return {
      items: [Undo, Redo, Zoom, Save, Run],
    }
  },
}
</script>

<style lang="less" scoped>
  .workspace-header {
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
