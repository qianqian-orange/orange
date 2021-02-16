<template>
  <svg
    width="100%"
    height="100%"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <pattern
        id="smallGrid"
        :width="smallGridSize"
        :height="smallGridSize"
        patternUnits="userSpaceOnUse"
      >
        <path
          :d="`M ${smallGridSize} 0 L 0 0 0 ${smallGridSize}`"
          fill="none"
          stroke="rgba(207, 207, 207, 0.3)"
          stroke-width="1"
        />
      </pattern>
      <pattern
        id="grid"
        :width="bigGridSize"
        :height="bigGridSize"
        patternUnits="userSpaceOnUse"
      >
        <rect
          :width="bigGridSize"
          :height="bigGridSize"
          fill="url(#smallGrid)"
        />
        <path
          :d="`M ${bigGridSize} 0 L 0 0 0 ${bigGridSize}`"
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
</template>

<script>
export default {
  name: 'Grid',
  props: {
    smallGridSize: {
      type: Number,
      default: 10,
    },
    bigGridSize: {
      type: Number,
      default: 50,
    },
  },
}
</script>
