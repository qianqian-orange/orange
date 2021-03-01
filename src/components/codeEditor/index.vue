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
import 'codemirror/addon/selection/active-line'
import 'codemirror/addon/lint/lint'
import 'codemirror/addon/lint/json-lint'
import 'codemirror/addon/lint/javascript-lint'
import 'codemirror/addon/display/autorefresh'

import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/base16-dark.css'
import 'codemirror/addon/lint/lint.css'

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
    config: {
      type: Object,
      default: () => ({}),
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
  computed: {
    options() {
      return this.$R.mergeDeepRight({
        tabSize: 4,
        mode: 'text/javascript',
        theme: 'base16-dark',
        lineNumbers: true, // 是否显示行号
        line: true,
        lineWrapping: true, // 是否换行
        lint: true,
        styleActiveLine: true,
        autoRefresh: true,
        gutters: ['CodeMirror-lint-markers'], // 可以标记错误的行
      }, this.config)
    },
  },
  methods: {
    onInput(value) {
      this.$emit('input', value)
    },
  },
}
</script>
