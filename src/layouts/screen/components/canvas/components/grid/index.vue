<template>
  <div class="grid-container">
    <grid
      v-show="grid"
      :small-grid-size="smallGridSize"
      :big-grid-size="bigGridSize"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Grid from '@/components/grid'

export default {
  name: 'CanvasGrid',
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
      interval: state => state.interval,
      zoom: state => state.zoom,
      grid: state => state.grid,
    }),
  },
}
</script>

<style lang="less" scoped>
  .grid-container {
    position: absolute;
    z-index: -1;
    background-color: #fff;
  }
</style>
