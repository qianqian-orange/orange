<template>
  <li
    :class="['tool-container', (!widgets.length || loading) && 'disabled']"
    @click="save"
  >
    <a-icon type="save" />
    <span>保存</span>
  </li>
</template>

<script>
import store from '@/material/store'

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
      if (!this.widgets.length) return
      const widgets = store.widgets.map(widget => widget.save())
      widgets.sort((a, b) => a.container.style.zIndex - b.container.style.zIndex)
      widgets.forEach((widget, index) => {
        widget.container.style.zIndex = index + 1
      })
      this.loading = true
      this.$axios.post('/api/save', {
        widgets,
        zIndex: widgets.length + 1,
      }).then(({ data }) => {
        if (data.code) {
          this.$message.error('上传失败!')
          return
        }
        this.$message.success('上传成功!')
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
