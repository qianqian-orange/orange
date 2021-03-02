<template>
  <li
    :class="['tool-container', loading && 'disabled']"
    @click="save"
  >
    <a-icon type="save" />
    <span>保存</span>
  </li>
</template>

<script>
import store from '@/material/store'
import canvasApi from '@/api/canvas'

export default {
  name: 'Save',
  data() {
    return {
      loading: false,
    }
  },
  computed: {
    widgets() {
      return store.widgets
    },
  },
  methods: {
    save() {
      const widgets = store.widgets.map(widget => widget.save())
      widgets.sort((a, b) => a.container.style.zIndex - b.container.style.zIndex)
      widgets.forEach((widget, index) => {
        widget.container.style.zIndex = index + 1
      })
      this.loading = true
      canvasApi.saveCanvasData({
        widgets,
        zIndex: widgets.length + 1,
      }).then(({ data }) => {
        if (data.code) {
          this.$message.error('保存失败!')
          return
        }
        this.$message.success('保存成功!')
      }).finally(() => {
        this.loading = false
      })
    },
  },
}
</script>

<style lang="less" scoped>
@import "~@/layouts/header/index.less";
</style>
