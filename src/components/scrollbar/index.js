// element-ui的scrollbar

import Scrollbar from './scrollbar.vue'

Scrollbar.install = function (Vue) {
  Vue.component(Scrollbar.name, Scrollbar)
}

export default Scrollbar
