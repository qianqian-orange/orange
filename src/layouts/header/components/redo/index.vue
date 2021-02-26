<template>
  <li
    :class="['tool-container', !redoEnable && 'disabled']"
    @click="REDO"
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
    ...mapMutations('snapshot', [REDO]),
  },
}
</script>

<style lang="less" scoped>
@import "~@/layouts/header/index.less";
</style>
