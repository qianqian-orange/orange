import Vue from 'vue'
import VueRouter from 'vue-router'
import { WORKSPACE } from '@/const/router'

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
  },
  {
    path: '/test',
    component: () => import('@/views/test'),
    children: [
      {
        path: 'form-item',
        component: () => import('@/views/test/form-item'),
      },
      {
        path: 'icon',
        component: () => import('@/views/test/icon'),
      },
      {
        path: 'text',
        component: () => import('@/views/test/text'),
      },
    ],
  },
]

export default new VueRouter({
  mode: 'history',
  routes,
})
