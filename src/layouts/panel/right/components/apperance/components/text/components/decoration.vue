<template>
  <ul class="text-operator-list">
    <li
      v-for="item in items"
      :key="item.type"
      :class="['text-operator-item', item.active && 'active']"
      @click="onClick(item)"
    >
      <orange-icon :type="item.type" />
    </li>
  </ul>
</template>

<script>
import store from '@/material/store'
import { UPDATE_WIDGET } from '@/material/store/mutation-types'

export default {
  name: 'TextDecoration',
  inject: ['store'],
  computed: {
    items() {
      const { component } = this.store.dataSource
      const { style: { fontWeight, fontStyle, textDecoration } } = component
      const items = []
      items.push({
        type: 'icon-bold',
        active: fontWeight === 'bold',
        update: (active) => {
          component.style.fontWeight = active ? 'normal' : 'bold'
        },
      }, {
        type: 'icon-italic',
        active: fontStyle === 'italic',
        update: (active) => {
          component.style.fontStyle = active ? 'normal' : 'italic'
        },
      }, {
        type: 'icon-underline',
        active: textDecoration === 'underline',
        update: (active) => {
          component.style.textDecoration = active ? 'none' : 'underline'
        },
      }, {
        type: 'icon-strikethrough',
        active: textDecoration === 'line-through',
        update: (active) => {
          component.style.textDecoration = active ? 'none' : 'line-through'
        },
      })
      return items
    },
  },
  methods: {
    onClick({ update, active }) {
      store.emit(UPDATE_WIDGET, {
        log: {
          source: 'layouts -> panel -> right -> components -> apperance -> components -> text -> components -> decoration',
          reason: '修改文本字体外观',
        },
        update: () => {
          update(active)
        },
      })
    },
  },
}
</script>

<style lang="less" scoped>
@import url("./index.less");
</style>
