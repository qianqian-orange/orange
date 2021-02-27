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
  name: 'TextAlign',
  mixins: [base],
  computed: {
    items() {
      const { style: { textAlign } } = this.component
      const items = []
      items.push({
        type: 'icon-align-left',
        tip: '左对齐',
        active: textAlign === 'left',
        update: (active) => {
          this.component.style.textAlign = active ? 'inherit' : 'left'
        },
      }, {
        type: 'icon-align-center',
        tip: '水平居中',
        active: textAlign === 'center',
        update: (active) => {
          this.component.style.textAlign = active ? 'inherit' : 'center'
        },
      }, {
        type: 'icon-align-right',
        tip: '右对齐',
        active: textAlign === 'right',
        update: (active) => {
          this.component.style.textAlign = active ? 'inherit' : 'right'
        },
      })
      return items
    },
  },
  methods: {
    onClick({ update, active }) {
      this.update({
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
