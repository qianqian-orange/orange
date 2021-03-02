<template>
  <!-- 这里两层结构是为了方便实现缩放效果 -->
  <div
    :id="id"
    :class="[disabled && 'glass']"
  >
    <div
      class="rich-text-container"
      :style="{
        width: `${100 / zoom}%`,
        transform: `scale(${zoom})`,
      }"
    />
  </div>
</template>

<script>
import E from 'wangeditor'
import uuid from '@/utils/uid'
import styleTag from './mixins/styleTag'

export default {
  name: 'OrangeRichText',
  mixins: [styleTag],
  props: {
    disabled: {
      type: Boolean,
      required: true,
    },
    lineHeight: {
      type: String,
      required: true,
    },
    margin: {
      type: String,
      required: true,
    },
    zoom: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      id: `rich-text-${uuid()}`,
      getInstance: null,
      styleEl: null,
    }
  },
  computed: {
    editor() {
      return this.getInstance()
    },
  },
  mounted() {
    this.getInstance = () => new E(this.$el.firstChild)
    this.editor.config.placeholder = ''
    this.editor.config.focus = false
    this.editor.config.onchange = (html) => {
      const index = html.lastIndexOf('<p>')
      this.$emit('change', {
        text: this.text(),
        html: html.substring(0, index).replace(/<p>/gim, `<p style="line-height: ${this.lineHeight}; margin-bottom: ${this.margin};">`) +
        html.substring(index).replace(/<p>/gim, `<p style="line-height: ${this.lineHeight}; margin: 0px;">`),
      })
    }
    this.editor.create()
    this.$emit('bootstrap', this)
  },
  beforeDestroy() {
    this.editor.destroy()
  },
  methods: {
    selectAll() {
      this.editor.cmd.do('selectAll')
    },
    clearWindowSelectionRange() {
      this.editor.selection.clearWindowSelectionRange()
    },
    setContent(content) {
      this.editor.txt.html(content)
    },
    html() {
      return this.editor.txt.html()
    },
    text() {
      return this.editor.txt.text()
    },
    enable() {
      this.editor.enable()
    },
    disable() {
      this.editor.disable()
    },
  },
}
</script>

<style lang="less">
  .rich-text-container {
    // 这里需要z-index的值，因为富文本的层级要比glass要高
    position: relative;
    z-index: 0;
    // 由于父元素使用flex布局，但缩放因子为50%时，子元素会因为父元素宽度不够而减少宽度
    // 所以通过设置flex-shrink解决这个问题
    flex-shrink: 0;
    transform-origin: 0 0;
  }

  .rich-text-container .w-e-toolbar {
    display: none;
  }

  .rich-text-container .w-e-text-container {
    height: auto !important;
    border: none !important;
    background-color: transparent;

    .w-e-text {
      padding: 0;

      p {
        margin: 0;
        white-space: pre-wrap;
        word-break: break-word;
      }
    }

    .placeholder {
      top: 0;
      left: 0;
      color: inherit;
      font-size: inherit;
      list-style: inherit;
    }
  }
</style>
