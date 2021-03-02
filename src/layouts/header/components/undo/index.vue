<template>
  <li
    :class="['tool-container', !undoEnable && 'disabled']"
    @click="undo"
  >
    <orange-icon type="icon-undo" />
    <span>撤销</span>
  </li>
</template>

<script>
import {
  mapGetters,
  mapMutations,
} from 'vuex'
import { UNDO } from '@/store/modules/snapshot/mutation-types'

export default {
  name: 'Redo',
  computed: {
    ...mapGetters('snapshot', ['undoEnable']),
  },
  methods: {
    undo() {
      if (!this.undoEnable) return
      this[UNDO]()
    },
    ...mapMutations('snapshot', [UNDO]),
  },
}
</script>

<style lang="less" scoped>
@import "~@/layouts/header/index.less";
</style>
