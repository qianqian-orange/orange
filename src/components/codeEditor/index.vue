<template>
  <div
    :style="{
      width,
      height,
    }"
  >
    <codemirror
      :value="value"
      :options="options"
      @input="onInput"
    />
  </div>
</template>

<script>
import { codemirror } from 'vue-codemirror'
import 'codemirror/mode/javascript/javascript.js'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/base16-dark.css'

export default {
  name: 'CodeEditor',
  components: {
    codemirror,
  },
  model: {
    prop: 'value',
    event: 'input',
  },
  props: {
    value: {
      type: String,
      default: 'console.log(\'hello world\')',
    },
    options: {
      type: Object,
      default: () => ({
        tabSize: 4,
        mode: 'text/javascript',
        theme: 'base16-dark',
        lineNumbers: true, // 是否显示行号
        line: true,
      }),
    },
    width: {
      type: String,
      default: '480px',
    },
    height: {
      type: String,
      default: '300px',
    },
  },
  methods: {
    onInput(value) {
      this.$emit('input', value)
    },
  },
}
</script>
