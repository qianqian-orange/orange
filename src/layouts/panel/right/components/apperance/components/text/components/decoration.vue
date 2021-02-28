<template>
  <ul class="text-operator-list">
    <li
      v-for="item in items"
      :key="item.type"
      :class="['text-operator-item', item.active && 'active']"
      @click="item.update(item.active)"
    >
      <a-tooltip placement="bottom">
        <template #title>
          <span>{{ item.tip }}</span>
        </template>
        <a-icon :type="item.type" />
      </a-tooltip>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'TextDecoration',
  inject: ['store'],
  computed: {
    items() {
      const items = []
      items.push({
        type: 'bold',
        tip: '加粗',
        active: this.store.fontWeight === 'bold',
        update: (active) => {
          this.store.fontWeight = active ? 'normal' : 'bold'
        },
      }, {
        type: 'italic',
        tip: '斜体',
        active: this.store.fontStyle === 'italic',
        update: (active) => {
          this.store.fontStyle = active ? 'normal' : 'italic'
        },
      }, {
        type: 'underline',
        tip: '下划线',
        active: this.store.textDecoration === 'underline',
        update: (active) => {
          this.store.textDecoration = active ? 'none' : 'underline'
        },
      }, {
        type: 'strikethrough',
        tip: '删除线',
        active: this.store.textDecoration === 'line-through',
        update: (active) => {
          this.store.textDecoration = active ? 'none' : 'line-through'
        },
      })
      return items
    },
  },
}
</script>

<style lang="less" scoped>
@import url("./index.less");
</style>
