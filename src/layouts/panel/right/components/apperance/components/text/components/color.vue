<template>
  <color-picker
    :value="value"
    @input="onInput"
  />
</template>

<script>
import base from '@/layouts/panel/right/components/apperance/mixins/base'

export default {
  name: 'TextColor',
  mixins: [base],
  computed: {
    value() {
      return this.component.style.color
    },
  },
  methods: {
    onInput(value) {
      this.update({
        log: {
          source: 'layouts -> panel -> right -> components -> apperance -> components -> text -> components -> color',
          reason: '修改文本字体颜色',
        },
        update: () => {
          this.component.style.color = value
        },
      })
    },
  },
}
</script>
