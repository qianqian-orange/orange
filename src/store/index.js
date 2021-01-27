import Vue from 'vue'
import Vuex from 'vuex'
import global from './modules/global'
import canvas from './modules/canvas'
import snapshot from './modules/snapshot'
import ruler from './modules/ruler'
import { isDev } from '@/config'

Vue.use(Vuex)

const store = new Vuex.Store({
  strict: isDev,
  modules: {
    global,
    canvas,
    snapshot,
    ruler,
  },
})

export default store
