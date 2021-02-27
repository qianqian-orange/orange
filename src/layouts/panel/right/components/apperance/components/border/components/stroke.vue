<template>
  <div class="border-item-container">
    <!-- 边框颜色 -->
    <div>
      <orange-checkbox
        :checked="stroke.open"
        @change="onChange(stroke, 'open', value => value.target.checked, ...arguments)"
      />
      <color-picker
        :value="color"
        @input="onChange(stroke.style, 'borderColor', value => value, ...arguments)"
      />
      <span class="border-item-text">描边</span>
    </div>
    <div>
      <!-- 边框样式 -->
      <orange-select
        class="border-style-select"
        :value="style"
        @select="onChange(stroke.style, 'borderStyle', value => value, ...arguments)"
      >
        <a-select-option
          v-for="item in items"
          :key="item"
          :value="item"
        >
          <div :class="`border-style-${item}`" />
        </a-select-option>
      </orange-select>
      <!-- 边框宽度 -->
      <orange-input-select
        width="50px"
        :value="width"
        :min="0"
        :max="1000"
        @input="onChange(stroke.style, 'borderWidth', value => `${value}px`, ...arguments)"
      >
        <a-select-option
          v-for="option in options"
          :key="option.value"
          :value="option.value"
        >
          {{ option.label }}
        </a-select-option>
      </orange-input-select>
    </div>
  </div>
</template>

<script>
import base from '@/layouts/panel/right/components/apperance/mixins/base'

export default {
  name: 'BorderStroke',
  mixins: [base],
  data() {
    return {
      items: ['solid', 'dashed', 'dotted'],
      options: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(item => ({
        label: item,
        value: item,
      })),
    }
  },
  computed: {
    stroke() {
      return this.component.props.stroke
    },
    color() {
      return this.stroke.style.borderColor
    },
    style() {
      return this.stroke.style.borderStyle
    },
    width() {
      return parseInt(this.stroke.style.borderWidth, 10)
    },
  },
  methods: {
    onChange(target, key, computed, value) {
      this.update({
        log: {
          source: 'layouts -> panel -> right -> components -> apperance -> components -> border -> components -> stroke',
          reason: '修改边框属性和样式',
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

    &:last-child {
      margin-top: 10px;

      ::v-deep.border-style-select {
        width: 118px;
        margin: 0 6px 0 26px;

        .ant-select-selection-selected-value {
          width: 92%;
        }
      }
    }
  }

  .border-style {
    &-solid,
    &-dashed,
    &-dotted {
      width: 100%;
      margin-top: 9px;
      border-width: 1px;
      border-color: @lightGreyWhite;
    }

    &-solid {
      border-style: solid;
    }

    &-dashed {
      border-style: dashed;
    }

    &-dotted {
      border-style: dotted;
    }
  }
</style>
