import { isDev } from '@/config'

export default {
  data() {
    return {
      styleTag: null,
    }
  },
  watch: {
    lineHeight() {
      this.setStyleText()
    },
    margin() {
      this.setStyleText()
    },
  },
  mounted() {
    this.styleTag = document.createElement('style')
    this.setStyleText()
    document.body.appendChild(this.styleTag)
  },
  beforeDestroy() {
    document.body.removeChild(this.styleTag)
  },
  methods: {
    setStyleText() {
      let text = ''
      if (isDev) text += '/* 这个style标签是在文本组件mounted的时候挂载的，源码在styleTag.js文件中，通过mixin的方式使用 */'
      const selector = `#${this.id} p`
      text += selector +
        '{' +
          `margin-bottom: ${this.margin};` +
          `line-height: ${this.lineHeight};` +
        '}'
      text += `${selector}:last-child { margin-bottom: 0px; }`
      this.styleTag.innerText = text
    },
  },
}
