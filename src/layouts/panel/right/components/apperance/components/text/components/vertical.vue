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
  name: 'TextVertical',
  inject: ['store'],
  computed: {
    items() {
      const { alignItems } = this.store
      const items = []
      items.push({
        type: 'vertical-align-top',
        tip: '顶对齐',
        active: alignItems === 'flex-start',
        update: (active) => {
          this.store.alignItems = active ? 'normal' : 'flex-start'
        },
      }, {
        type: 'vertical-align-middle',
        tip: '垂直对齐',
        active: alignItems === 'center',
        update: (active) => {
          this.store.alignItems = active ? 'normal' : 'center'
        },
      }, {
        type: 'vertical-align-bottom',
        tip: '底对齐',
        active: alignItems === 'flex-end',
        update: (active) => {
          this.store.alignItems = active ? 'normal' : 'flex-end'
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
