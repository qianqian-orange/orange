<template>
  <div class="workspace-header">
    <ul class="toolbar">
      <li
        :class="['tool', !undoEnable && 'disabled']"
        @click="UNDO"
      >
        <i class="iconfont icon-undo" />
        <span class="text">撤销</span>
      </li>
      <li
        :class="['tool', !redoEnable && 'disabled']"
        @click="REDO"
      >
        <i class="iconfont icon-redo" />
        <span class="text">重做</span>
      </li>
    </ul>
  </div>
</template>

<script>
import {
  mapGetters,
  mapMutations,
} from 'vuex'
import {
  UNDO,
  REDO,
} from '@/store/modules/snapshot/mutation-types'

export default {
  name: 'WorkspaceHeader',
  computed: {
    ...mapGetters('snapshot', [
      'undoEnable',
      'redoEnable',
    ]),
  },
  methods: {
    ...mapMutations('snapshot', [
      UNDO,
      REDO,
    ]),
  },
}
</script>

<style lang="less" scoped>
  .workspace {
    &-header {
      box-sizing: border-box;
      height: 52px;
      padding-left: 248px;
      border-bottom: 1px solid @dark;
      background-color: @headerBgColor;
    }

    .toolbar {
      display: flex;
      height: 100%;
      color: @textPrimaryColor;
      font-size: 12px;

      .tool {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 44px;
        height: 100%;

        &:hover {
          color: @greyWhite;
          background-color: @shallowDark;
          cursor: pointer;
        }

        &.disabled {
          color: @textSecondaryColor;
        }
      }
    }
  }
</style>
