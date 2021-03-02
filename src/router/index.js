import Vue from 'vue'
import VueRouter from 'vue-router'
import { WORKSPACE, WORKSPACE_RUN } from '@/const/router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/workspace',
  },
  {
    path: '/workspace',
    name: WORKSPACE,
    component: () => import('@/views/workspace'),
    children: [{
      path: 'run',
      name: WORKSPACE_RUN,
      component: () => import('@/views/workspace/components/run'),
    }],
  },
]

export default new VueRouter({
  mode: 'history',
  routes,
})
