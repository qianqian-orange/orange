<template>
  <div class="general-container">
    <p class="general-title">
      通用
    </p>
    <div class="general-block">
      <orange-input-number
        v-for="item in items"
        :key="item.label"
        :style="{ marginBottom: '4px' }"
        v-bind="item.props"
        size="small"
        @change="item.update"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'ApperanceGeneral',
  inject: ['store'],
  computed: {
    items() {
      const items = []
      const { props: { editable } } = this.store.dataSource
      const { stretch, move } = editable
      items.push({
        props: {
          label: 'X',
          value: this.store.left,
          min: -1000,
          max: 3000,
          disabled: !move,
        },
        update: (value) => {
          this.store.left = value
        },
      }, {
        props: {
          label: 'Y',
          value: this.store.top,
          min: -1000,
          max: 3000,
          disabled: !move,
        },
        update: (value) => {
          this.store.top = value
        },
      }, {
        props: {
          label: 'W',
          value: this.store.width,
          min: 8,
          max: 3000,
          disabled: !(stretch.w || stretch.e),
        },
        update: (value) => {
          this.store.width = value
        },
      }, {
        props: {
          label: 'H',
          value: this.store.height,
          min: 8,
          max: 3000,
          disabled: !(stretch.n || stretch.s),
        },
        update: (value) => {
          this.store.height = value
        },
      })
      return items
    },
  },
}
</script>

<style lang="less" scoped>
  .general {
    &-container {
      padding: 14px 14px 6px 10px;
      border-bottom: 1px solid @deepBlack;
    }

    &-title {
      padding-left: 4px;
      margin-bottom: 8px;
      color: @greyWhite;
      font-size: 12px;
    }

    &-block {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
    }
  }
</style>
