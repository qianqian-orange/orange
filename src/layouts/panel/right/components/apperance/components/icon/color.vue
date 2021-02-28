<template>
  <color-picker
    :value="store.iconColor"
    @input="onInput"
  />
</template>

<script>
export default {
  name: 'IconColor',
  inject: ['store'],
  methods: {
    onInput(value) {
      this.store.iconColor = value
    },
  },
}
</script>
