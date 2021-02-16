import Vue from 'vue'
import * as R from 'ramda'
import Antd from 'ant-design-vue'
import Scroll from './components/scrollbar'
import router from './router'
import store from './store'
import App from './App.vue'
import { OrangeRichText } from './material'
import './lib/document'
import 'ant-design-vue/dist/antd.css'
import './less/index.less'

Vue.prototype.$R = R

Vue.use(Scroll)
Vue.use(Antd)
Vue.use(OrangeRichText)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')

console.log('hello world')

if (module && module.hot) {
  module.hot.accept()
}
