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
  name: 'TextVertical',
  inject: ['store'],
  computed: {
    items() {
      const { component } = this.store.dataSource
      const { style: { alignItems } } = component
      const items = []
      items.push({
        type: 'icon-dingduiqi',
        active: alignItems === 'flex-start',
        update: (active) => {
          component.style.alignItems = active ? 'normal' : 'flex-start'
        },
      }, {
        type: 'icon-vertical-align-middl',
        active: alignItems === 'center',
        update: (active) => {
          component.style.alignItems = active ? 'normal' : 'center'
        },
      }, {
        type: 'icon-diduiqi',
        active: alignItems === 'flex-end',
        update: (active) => {
          component.style.alignItems = active ? 'normal' : 'flex-end'
        },
      })
      return items
    },
  },
  methods: {
    onClick({ update, active }) {
      store.emit(UPDATE_WIDGET, {
        log: {
          source: 'layouts -> panel -> right -> components -> apperance -> components -> text -> components -> flex',
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
