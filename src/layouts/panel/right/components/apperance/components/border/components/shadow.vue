<template>
  <div class="border-item-container">
    <div>
      <orange-checkbox
        :checked="shadow.open"
        @change="onChange(shadow, 'open', value => value.target.checked, ...arguments)"
      />
      <color-picker
        :value="shadow.color"
        @input="onChange(shadow, 'color', value => value, ...arguments)"
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
          @change="onChange(shadow, item.key, value => value, ...arguments)"
        />
        <span class="border-shaow-input-number-label">{{ item.label }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import base from '@/layouts/panel/right/components/apperance/mixins/base'

export default {
  name: 'BorderShadow',
  mixins: [base],
  computed: {
    shadow() {
      return this.component.props.shadow
    },
    items() {
      const items = []
      const { x, y, dim, spread } = this.shadow
      items.push({
        key: 'x',
        label: 'X',
        props: {
          value: x,
          min: -100,
          max: 100,
        },
      }, {
        key: 'y',
        label: 'Y',
        props: {
          value: y,
          min: -100,
          max: 100,
        },
      }, {
        key: 'dim',
        label: '模糊',
        props: {
          value: dim,
          min: 0,
          max: 100,
        },
      }, {
        key: 'spread',
        label: '扩散',
        props: {
          value: spread,
          min: -100,
          max: 100,
        },
      })
      return items
    },
  },
  methods: {
    onChange(target, key, computed, value) {
      this.update({
        log: {
          source: 'layouts -> panel -> right -> components -> apperance -> components -> border -> components -> stroke',
          reason: '修改边框阴影样式',
        },
        update: () => {
          target[key] = computed(value)
        },
      })
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
