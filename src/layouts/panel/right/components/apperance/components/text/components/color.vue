<template>
  <color-picker
    :value="value"
    @input="onInput"
  />
</template>

<script>
import store from '@/material/store'
import { UPDATE_WIDGET } from '@/material/store/mutation-types'

export default {
  name: 'TextColor',
  inject: ['store'],
  computed: {
    value() {
      const { component } = this.store.dataSource
      return component.style.color
    },
  },
  methods: {
    onInput(value) {
      store.emit(UPDATE_WIDGET, {
        log: {
          source: 'layouts -> panel -> right -> components -> apperance -> components -> text -> components -> color',
          reason: '修改文本字体颜色',
        },
        update: () => {
          const { component } = this.store.dataSource
          component.style.color = value
        },
      })
    },
  },
}
</script>
