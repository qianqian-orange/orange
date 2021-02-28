<template>
  <orange-input-select
    :value="store.fontSize"
    :min="12"
    :max="48"
    @input="onInput"
  >
    <a-select-option
      v-for="option in options"
      :key="option.value"
      :value="option.value"
    >
      {{ option.label }}
    </a-select-option>
  </orange-input-select>
</template>

<script>
export default {
  name: 'TextFontSize',
  inject: ['store'],
  data() {
    return {
      options: [12, 14, 16, 18, 20, 28, 36, 48].map(item => ({
        label: item,
        value: item,
      })),
    }
  },
  methods: {
    onInput(value) {
      this.store.fontSize = value
    },
  },
}
</script>
