<template>
  <li
    :class="['tool-container', !redoEnable && 'disabled']"
    @click="redo"
  >
    <orange-icon type="icon-redo" />
    <span>重做</span>
  </li>
</template>

<script>
import {
  mapGetters,
  mapMutations,
} from 'vuex'
import { REDO } from '@/store/modules/snapshot/mutation-types'

export default {
  name: 'Redo',
  computed: {
    ...mapGetters('snapshot', ['redoEnable']),
  },
  methods: {
    redo() {
      if (!this.redoEnable) return
      this[REDO]()
    },
    ...mapMutations('snapshot', [REDO]),
  },
}
</script>

<style lang="less" scoped>
@import "~@/layouts/header/index.less";
</style>
