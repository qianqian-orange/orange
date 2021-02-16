<template>
  <div class="rich-text-container" />
</template>

<script>
import E from 'wangeditor'

export default {
  name: 'OrangeRichText',
  data() {
    return {
      getInstance: null,
    }
  },
  computed: {
    editor() {
      return this.getInstance()
    },
  },
  mounted() {
    this.getInstance = () => new E(this.$el)
    this.editor.config.focus = false
    this.editor.config.placeholder = ''
    this.editor.create()
    this.editor.txt.html('<p>文本</p>') // 重新设置编辑器内容
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
  },
}
</script>

<style lang="less">
  .rich-text-container {
    // 这里需要z-index的值，因为富文本的层级要比glass要高
    position: relative;
    z-index: 0;
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
        margin: 0 0 5px 0;
        line-height: 20px;
      }

      p:last-child {
        margin: 0;
      }
    }
  }
</style>
