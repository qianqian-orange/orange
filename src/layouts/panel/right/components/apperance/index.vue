<template>
  <div class="apperance-container">
    <apperance-general />
    <a-collapse
      :active-key="items.map(({ key }) => key)"
      expand-icon-position="right"
    >
      <a-collapse-panel
        v-for="item in items"
        :key="item.key"
        :header="item.header"
      >
        <component :is="item.component" />
      </a-collapse-panel>
    </a-collapse>
  </div>
</template>

<script>
import ApperanceGeneral from './components/general'
import ApperanceText from './components/text'
import ApperanceBorder from './components/border'

export default {
  name: 'Apperance',
  components: {
    ApperanceGeneral,
    ApperanceText,
    ApperanceBorder,
  },
  inject: ['store'],
  computed: {
    items() {
      const items = []
      const { props: { editable } } = this.store.dataSource
      if (editable.text) {
        items.push({
          key: 'text',
          header: '文本',
          component: ApperanceText,
        })
      }
      if (editable.border) {
        items.push({
          key: 'border',
          header: '边框',
          component: ApperanceBorder,
        })
      }
      return items
    },
  },
}
</script>

<style lang="less">
  .apperance-container .ant-collapse {
    border-color: @black;
    background-color: @black;

    & > .ant-collapse-item {
      border-color: @deepBlack;
      font-size: 12px;

      & > .ant-collapse-header {
        padding: 14px;
        color: @greyWhite;
      }

      .ant-collapse-arrow {
        font-size: 10px;
      }

      .ant-collapse-content {
        border-top: none;
        color: @textPrimaryColor;
        background-color: @black;
      }

      .ant-collapse-content > .ant-collapse-content-box {
        padding: 0 14px 14px;
      }
    }
  }
</style>
