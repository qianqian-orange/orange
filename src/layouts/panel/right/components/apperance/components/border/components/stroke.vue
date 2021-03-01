<template>
  <div class="border-item-container">
    <!-- 边框颜色 -->
    <div>
      <a-checkbox
        :checked="store.stroke.open"
        @change="onChange"
      />
      <color-picker
        :value="store.borderColor"
        @input="update('borderColor', ...arguments)"
      />
      <span class="border-item-text">描边</span>
    </div>
    <div>
      <!-- 边框样式 -->
      <a-select
        class="border-style-select"
        :value="store.borderStyle"
        size="small"
        dropdown-class-name="orange-select-dropdown"
        @select="update('borderStyle', ...arguments)"
      >
        <a-select-option
          v-for="item in items"
          :key="item"
          :value="item"
        >
          <div :class="`border-style-${item}`" />
        </a-select-option>
      </a-select>
      <!-- 边框宽度 -->
      <orange-input-select
        width="50px"
        :value="store.borderWidth"
        :min="0"
        :max="1000"
        @input="update('borderWidth', ...arguments)"
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
export default {
  name: 'BorderStroke',
  inject: ['store'],
  data() {
    return {
      items: ['solid', 'dashed', 'dotted'],
      options: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(item => ({
        label: item,
        value: item,
      })),
    }
  },
  methods: {
    onChange({ target: { checked } }) {
      this.store.update({
        log: {
          source: 'layouts -> panel -> right -> components -> apperance -> components -> border -> components -> stroke',
          reason: '是否显示方框描边',
          detail: {
            open: checked,
          },
        },
        update: () => {
          this.store.stroke.open = checked
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

    &:last-child {
      margin-top: 10px;

      ::v-deep.ant-select.border-style-select {
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
