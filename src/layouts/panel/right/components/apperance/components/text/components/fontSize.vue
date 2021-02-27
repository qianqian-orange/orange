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
import base from '@/layouts/panel/right/components/apperance/mixins/base'

export default {
  name: 'TextFontSize',
  mixins: [base],
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
      return parseInt(this.component.style.fontSize, 10)
    },
  },
  methods: {
    onInput(value) {
      this.update({
        log: {
          source: 'layouts -> panel -> right -> components -> apperance -> components -> text -> components -> fontSize',
          reason: '修改文本字体大小',
        },
        update: () => {
          this.component.style.fontSize = `${value}px`
          this.store.dataSource.emit('fontSize', value)
        },
      })
    },
  },
}
</script>
