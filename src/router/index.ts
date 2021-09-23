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

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const makeRouter = (props: any) => {
  return new VueRouter({
    mode: 'history',
    base: window.__POWERED_BY_QIANKUN__ ? props.baseRoute : process.env.BASE_URL,
    routes
  })
}

export default makeRouter
