<template>
  <div
    id="rich-text-container"
    class="rich-text-container"
    :style="{
      fontSize: '14px',
    }"
  />
</template>

<script>
import E from 'wangeditor'

export default {
  data() {
    return {
      editor: null,
    }
  },
  mounted() {
    this.editor = new E('#rich-text-container')
    this.editor.config.focus = false
    this.editor.config.placeholder = ''
    this.editor.config.onchange = (val) => {
      console.log(val)
    }
    this.editor.create()
    this.editor.txt.html('<p>文本</p>') // 重新设置编辑器内容
  },
  beforeDestroy() {
    this.editor.destroy()
  },
}
</script>

<style lang="less">
  .rich-text-container {
    display: inline-block;
    line-height: 0;
  }

  .rich-text-container .w-e-toolbar {
    display: none;
  }

  .rich-text-container .w-e-text-container {
    display: inline-block;
    height: auto !important;
    border: none !important;

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
