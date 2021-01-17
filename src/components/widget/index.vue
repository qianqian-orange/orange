<template>
  <div
    :id="dataSource.id"
    class="glass"
    :style="dataSource.style.container"
  >
    <component
      :is="dataSource.component"
      v-bind="dataSource.prop"
      :style="dataSource.style.component"
    >
      {{ dataSource.text }}
    </component>
  </div>
</template>

<script>
export default {
  name: 'Widget',
  props: {
    dataSource: {
      type: Object,
      required: true,
    },
  },
}
</script>
