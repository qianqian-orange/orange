<template>
  <div class="border-item-container">
    <div>
      <a-checkbox
        :checked="store.shadow.open"
        @change="onChange"
      />
      <color-picker
        :value="store.shadowColor"
        @input="update('shadowColor', ...arguments)"
      />
      <span class="border-item-text">阴影</span>
    </div>
    <ul class="border-shadow-input-number-list">
      <li
        v-for="item in items"
        :key="item.key"
        class="border-shadow-input-number-item"
      >
        <orange-input-number
          :hover="false"
          size="small"
          v-bind="item.props"
          @change="update(item.key, ...arguments)"
        />
        <span class="border-shaow-input-number-label">{{ item.label }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'BorderShadow',
  inject: ['store'],
  computed: {
    items() {
      const items = []
      const { shadowOffsetX, shadowOffsetY, shadowBlur, shadowSpread } = this.store
      items.push({
        key: 'shadowOffsetX',
        label: 'X',
        props: {
          value: shadowOffsetX,
          min: -100,
          max: 100,
        },
      }, {
        key: 'shadowOffsetY',
        label: 'Y',
        props: {
          value: shadowOffsetY,
          min: -100,
          max: 100,
        },
      }, {
        key: 'shadowBlur',
        label: '模糊',
        props: {
          value: shadowBlur,
          min: 0,
          max: 100,
        },
      }, {
        key: 'shadowSpread',
        label: '扩散',
        props: {
          value: shadowSpread,
          min: -100,
          max: 100,
        },
      })
      return items
    },
  },
  methods: {
    onChange({ target: { checked } }) {
      this.store.update({
        log: {
          source: 'layouts -> panel -> right -> components -> apperance -> components -> border -> components -> shadow',
          reason: '是否显示方框阴影',
          detail: {
            open: checked,
          },
        },
        update: () => {
          this.store.shadow.open = checked
        },
      })
    },
    update(key, value) {
      this.store[key] = value
    },
  },
}
</script>

<style lang="less" scoped>
  @import url("./index.less");

  .border-item-container > div {
    display: flex;
    align-items: center;
    width: 100%;

    ::v-deep.border-style-select {
      width: 118px;
      margin: 0 6px 0 26px;

      .ant-select-selection-selected-value {
        width: 92%;
      }
    }
  }

  .border-shadow-input-number {
    &-list {
      display: flex;
      width: 100%;
      padding-left: 26px;
      margin-top: 10px;
    }

    &-item {
      display: flex;
      flex: 1;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      height: 50px;

      ::v-deep.orange-input-number-container .ant-input-number {
        width: 100%;
        border-radius: 0;
      }

      &:first-child {
        ::v-deep.orange-input-number-container .ant-input-number {
          border-top-left-radius: 4px;
          border-bottom-left-radius: 4px;
        }
      }

      &:last-child {
        ::v-deep.orange-input-number-container .ant-input-number {
          border-top-right-radius: 4px;
          border-bottom-right-radius: 4px;
        }
      }
    }

    &-label {
      color: @textPrimaryColor;
      font-size: 12px;
    }
  }
</style>
