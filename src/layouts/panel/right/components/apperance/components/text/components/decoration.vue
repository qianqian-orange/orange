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
  name: 'TextDecoration',
  mixins: [base],
  computed: {
    items() {
      const { style: { fontWeight, fontStyle, textDecoration } } = this.component
      const items = []
      items.push({
        type: 'icon-bold',
        tip: '加粗',
        active: fontWeight === 'bold',
        update: (active) => {
          this.component.style.fontWeight = active ? 'normal' : 'bold'
        },
      }, {
        type: 'icon-italic',
        tip: '斜体',
        active: fontStyle === 'italic',
        update: (active) => {
          this.component.style.fontStyle = active ? 'normal' : 'italic'
        },
      }, {
        type: 'icon-underline',
        tip: '下划线',
        active: textDecoration === 'underline',
        update: (active) => {
          this.component.style.textDecoration = active ? 'none' : 'underline'
        },
      }, {
        type: 'icon-strikethrough',
        tip: '删除线',
        active: textDecoration === 'line-through',
        update: (active) => {
          this.component.style.textDecoration = active ? 'none' : 'line-through'
        },
      })
      return items
    },
  },
  methods: {
    onClick({ update, active }) {
      this.update({
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
