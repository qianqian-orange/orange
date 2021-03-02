module.exports = {
  root: true,
  env: {
    node: true,
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: 'babel-eslint',
  },
  extends: [
    'plugin:vue/vue3-recommended',
    'standard',
  ],
  rules: {
    'no-debugger': process.env.NODE_ENV === 'development' ? 'off' : 'error',
    'comma-dangle': ['error', 'always-multiline'],
    'space-before-function-paren': ['error', {
      'named': 'never',
    }],
    'vue/no-deprecated-destroyed-lifecycle': 0,
    'vue/require-explicit-emits': 0,
    'vue/no-deprecated-dollar-listeners-api': 0,
    'no-prototype-builtins': 0,
    'vue/no-v-html': 0,
    'no-eval': 0,
  },
}
