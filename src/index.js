import Vue from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue'
import Scroll from './components/scrollbar'
import store from './store'
import './lib/document'
import 'ant-design-vue/dist/antd.css'
import './less/index.less'

Vue.use(Scroll)
Vue.use(Antd)

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')

console.log('hello world')

if (module && module.hot) {
  module.hot.accept()
}
