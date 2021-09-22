import Vue from 'vue'
import VueRouter, {RouteConfig} from 'vue-router'
import ROUTER_PATH from '@/router/router-path';

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: ROUTER_PATH.INDEX,
    name: 'index',
    component: () => import('../views/demo.vue')
  },
  {
    path: ROUTER_PATH.ERROR,
    component: () => import('../components/error.vue')
  },
  {
    path: '*',
    redirect: ROUTER_PATH.ERROR
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
