<template>
  <a-popover
    v-model="visible"
    :title="title"
    trigger="click"
    :placement="placement"
    overlay-class-name="orange-popover"
  >
    <template #content>
      <chrome-picker
        :value="value"
        @input="onInput"
      />
      <a-icon
        type="close"
        @click="hide"
      />
    </template>
    <div class="color-picker-block-container">
      <div
        class="color-picker-block"
        :style="{ backgroundColor: value }"
      />
    </div>
  </a-popover>
</template>

<script>
import { Chrome } from 'vue-color'

export default {
  name: 'ColorPicker',
  components: {
    'chrome-picker': Chrome,
  },
  model: {
    prop: 'value',
    event: 'input',
  },
  props: {
    value: {
      type: String,
      default: '#000',
    },
    title: {
      type: String,
      default: '颜色设置',
    },
    placement: {
      type: String,
      default: 'left',
    },
  },
  data() {
    return {
      visible: false,
    }
  },
  methods: {
    hide() {
      this.visible = false
    },
    onInput({ rgba: { r, g, b, a } }) {
      this.$emit('input', `rgba(${r}, ${g}, ${b}, ${a})`)
    },
  },
}
</script>

<style lang="less">
  .color-picker-block-container {
    width: 16px;
    height: 16px;
    border: 1px solid @deepGrey;
    background-image:
      linear-gradient(45deg, rgb(204, 204, 204) 25%, transparent 0),
      linear-gradient(-45deg, rgb(204, 204, 204) 25%, transparent 0),
      linear-gradient(45deg, transparent 75%, rgb(204, 204, 204) 0),
      linear-gradient(-45deg, transparent 75%, rgb(204, 204, 204) 0);
    background-position: 0 0, 0 5px, 5px -5px, -5px 0;
    background-size: 10px 10px;
    transition: border-color 0.2s ease-out;
    border-radius: 1px;
    background-clip: padding-box;
    cursor: pointer;

    &:hover {
      border-color: @textSecondaryColor;
    }
  }

  .color-picker-block {
    width: 100%;
    height: 100%;
  }

  .orange-popover {
    .vc-chrome {
      box-shadow: none;
    }
  }
</style>
