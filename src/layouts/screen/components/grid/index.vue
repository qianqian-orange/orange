<template>
  <div
    class="grid-container"
    :style="{
      width,
      height,
    }"
  >
    <grid
      :small-grid-size="smallGridSize"
      :big-grid-size="bigGridSize"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Grid from '@/components/grid'

export default {
  name: 'ScreenGrid',
  components: {
    Grid,
  },
  computed: {
    smallGridSize() {
      return this.interval * this.zoom
    },
    bigGridSize() {
      return this.smallGridSize * 5
    },
    ...mapState('canvas', {
      width: state => state.width,
      height: state => state.height,
      interval: state => state.interval,
      zoom: state => state.zoom,
    }),
  },
}
</script>

<style lang="less" scoped>
  .grid-container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: -1;
    background-color: #fff;
  }
</style>
