import Vue from 'vue'

const axios = Vue.prototype.$axios

function getCanvasData({ params = {}, headers = {} } = {}) {
  return axios.get('/api/data', {
    headers,
    params,
  })
}

function saveCanvasData(data, headers) {
  return axios.post('/api/save', data, headers)
}

export default {
  getCanvasData,
  saveCanvasData,
}
