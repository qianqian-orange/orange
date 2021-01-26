<template>
  <div
    class="grid-container"
    :style="gridStyle"
  >
    <svg
      width="100%"
      height="100%"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern
          id="smallGrid"
          width="10"
          height="10"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M 10 0 L 0 0 0 10"
            fill="none"
            stroke="rgba(207, 207, 207, 0.3)"
            stroke-width="1"
          />
        </pattern>
        <pattern
          id="grid"
          width="50"
          height="50"
          patternUnits="userSpaceOnUse"
        >
          <rect
            width="50"
            height="50"
            fill="url(#smallGrid)"
          />
          <path
            d="M 50 0 L 0 0 0 50"
            fill="none"
            stroke="rgba(186, 186, 186, 0.5)"
            stroke-width="1"
          />
        </pattern>
      </defs>
      <rect
        width="100%"
        height="100%"
        fill="url(#grid)"
      />
    </svg>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Grid',
  computed: {
    gridStyle() {
      return {
        width: this.canvas.width,
        height: this.canvas.height,
      }
    },
    ...mapState('canvas', {
      canvas: state => state,
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
