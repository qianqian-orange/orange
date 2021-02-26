<template>
  <div class="setting-item-container">
    <p class="setting-item-title">
      画布
    </p>
    <div class="setting-item-block">
      <orange-input-number
        :value="width"
        label="宽"
        :hover="false"
        :min="320"
        :max="1920"
        @change="onChange('width', ...arguments)"
      />
      <a-icon type="close" />
      <orange-input-number
        :value="height"
        label="高"
        :hover="false"
        :min="568"
        :max="1080"
        @change="onChange('height', ...arguments)"
      />
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { UPDATE_CANVAS_DATA } from '@/store/modules/canvas/mutation-types'

export default {
  name: 'ProjectCanvas',
  computed: {
    ...mapState('canvas', {
      width: ({ width, zoom }) => Math.floor(parseInt(width, 10) / zoom),
      height: ({ height, zoom }) => Math.floor(parseInt(height, 10) / zoom),
    }),
  },
  methods: {
    onChange(key, value) {
      this[UPDATE_CANVAS_DATA]({
        log: {
          source: 'layouts -> panel -> right -> components -> project -> components -> canvas',
          reason: '调整画布大小',
        },
        update: (state) => {
          state[key] = `${Math.floor(value * state.zoom)}px`
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
