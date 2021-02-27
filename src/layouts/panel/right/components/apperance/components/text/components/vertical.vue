<template>
  <ul class="text-operator-list">
    <li
      v-for="item in items"
      :key="item.type"
      :class="['text-operator-item', item.active && 'active']"
      @click="onClick(item)"
    >
      <a-tooltip placement="bottom">
        <template #title>
          <span>{{ item.tip }}</span>
        </template>
        <orange-icon :type="item.type" />
      </a-tooltip>
    </li>
  </ul>
</template>

<script>
import base from '@/layouts/panel/right/components/apperance/mixins/base'

export default {
  name: 'TextVertical',
  mixins: [base],
  computed: {
    items() {
      const { style: { alignItems } } = this.component
      const items = []
      items.push({
        type: 'icon-dingduiqi',
        tip: '顶对齐',
        active: alignItems === 'flex-start',
        update: (active) => {
          this.component.style.alignItems = active ? 'normal' : 'flex-start'
        },
      }, {
        type: 'icon-vertical-align-middl',
        tip: '垂直对齐',
        active: alignItems === 'center',
        update: (active) => {
          this.component.style.alignItems = active ? 'normal' : 'center'
        },
      }, {
        type: 'icon-diduiqi',
        tip: '底对齐',
        active: alignItems === 'flex-end',
        update: (active) => {
          this.component.style.alignItems = active ? 'normal' : 'flex-end'
        },
      })
      return items
    },
  },
  methods: {
    onClick({ update, active }) {
      this.update({
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
