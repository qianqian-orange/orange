<template>
  <div
    :id="dataSource.id"
    class="glass"
    :style="dataSource.style"
  >
    <component
      :is="dataSource.component"
      v-bind="dataSource.prop"
    >
      {{ dataSource.text }}
    </component>
    <slot name="markline" />
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
