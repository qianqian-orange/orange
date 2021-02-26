<template>
  <orange-input-select
    :value="value"
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
import store from '@/material/store'
import { UPDATE_WIDGET } from '@/material/store/mutation-types'

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
  computed: {
    value() {
      const { component } = this.store.dataSource
      return parseInt(component.style.fontSize, 10)
    },
  },
  methods: {
    onInput(value) {
      store.emit(UPDATE_WIDGET, {
        log: {
          source: 'layouts -> panel -> right -> components -> apperance -> components -> text -> components -> fontSize',
          reason: '修改文本字体大小',
        },
        update: () => {
          const { component } = this.store.dataSource
          component.style.fontSize = `${value}px`
          this.store.dataSource.emit('fontSize', value)
        },
      })
    },
  },
}
</script>
