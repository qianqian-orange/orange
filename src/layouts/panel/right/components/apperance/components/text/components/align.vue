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
  name: 'TextAlign',
  inject: ['store'],
  computed: {
    items() {
      const { component } = this.store.dataSource
      const { style: { textAlign } } = component
      const items = []
      items.push({
        type: 'icon-align-left',
        active: textAlign === 'left',
        update: (active) => {
          component.style.textAlign = active ? 'inherit' : 'left'
        },
      }, {
        type: 'icon-align-center',
        active: textAlign === 'center',
        update: (active) => {
          component.style.textAlign = active ? 'inherit' : 'center'
        },
      }, {
        type: 'icon-align-right',
        active: textAlign === 'right',
        update: (active) => {
          component.style.textAlign = active ? 'inherit' : 'right'
        },
      })
      return items
    },
  },
  methods: {
    onClick({ update, active }) {
      store.emit(UPDATE_WIDGET, {
        log: {
          source: 'layouts -> panel -> right -> components -> apperance -> components -> text -> components -> align',
          reason: '修改文本字体水平对齐方式',
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

  .text-operator-list {
    width: 75.5px;
  }
</style>
