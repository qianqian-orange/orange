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
  name: 'TextAlign',
  inject: ['store'],
  computed: {
    items() {
      const { textAlign } = this.store
      const items = []
      items.push({
        type: 'align-left',
        tip: '左对齐',
        active: textAlign === 'left',
        update: (active) => {
          this.store.textAlign = active ? 'inherit' : 'left'
        },
      }, {
        type: 'align-center',
        tip: '水平居中',
        active: textAlign === 'center',
        update: (active) => {
          this.store.textAlign = active ? 'inherit' : 'center'
        },
      }, {
        type: 'align-right',
        tip: '右对齐',
        active: textAlign === 'right',
        update: (active) => {
          this.store.textAlign = active ? 'inherit' : 'right'
        },
      })
      return items
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
