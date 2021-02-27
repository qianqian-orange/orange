import Vue from 'vue'
import * as R from 'ramda'
import Antd, { Icon } from 'ant-design-vue'
import Scroll from './components/scrollbar'
import OrangeCheckbox from '@/components/checkbox'
import OrangeInputNumber from '@/components/inputNumber'
import OrangeInputSelect from '@/components/inputSelect'
import ColorPicker from '@/components/colorpicker'
import OrangeSelect from '@/components/select'
import {
  OrangeRectangle,
  OrangeRichText,
  OrangeLine,
} from './material'
import router from './router'
import store from './store'
import App from './App.vue'
import './lib/document'
import 'ant-design-vue/dist/antd.css'
import './less/index.less'

Vue.prototype.$R = R

Vue.use(Antd)
Vue.use(Scroll)
Vue.use(OrangeRectangle)
Vue.use(OrangeRichText)
Vue.use(OrangeLine)

;[
  OrangeCheckbox, OrangeInputNumber,
  OrangeInputSelect, ColorPicker,
  OrangeSelect,
].forEach((component) => {
  Vue.component(component.name, component)
})

const OrangeIcon = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1878848_8iefdpjja5j.js',
})
Vue.component('OrangeIcon', OrangeIcon)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')

console.log('hello world')

if (module && module.hot) {
  module.hot.accept()
}
