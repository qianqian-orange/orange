<template>
  <div class="setting-item-container">
    <p class="setting-item-title">
      网格
    </p>
    <div>
      <a-checkbox
        :checked="grid"
        @change="onChange"
      />
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { UPDATE_CANVAS_DATA } from '@/store/modules/canvas/mutation-types'

export default {
  name: 'ProjectGrid',
  computed: {
    ...mapState('canvas', {
      grid: state => state.grid,
    }),
  },
  methods: {
    onChange({ target }) {
      this[UPDATE_CANVAS_DATA]({
        log: {
          source: 'layouts -> panel -> right -> components -> project -> components -> grid',
          reason: '控制网格显示',
        },
        update: (state) => {
          state.grid = target.checked
        },
      })
    },
    ...mapMutations('canvas', [UPDATE_CANVAS_DATA]),
  },
}
</script>

<style lang="less" scoped>
@import url("../index.less");
</style>
