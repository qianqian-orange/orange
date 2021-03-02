import Vue from 'vue'
import axios from 'axios'

axios.defaults.baseURL = '/orange'

Vue.prototype.$axios = axios
