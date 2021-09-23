import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/plugins';
import '@/business';
import '@/components';
import '@/utils';
import '@/assets/style/index.less';
import '../lang/index';
import actions from '@/plugins/actions';

// eslint-disable-next-line
const {name} = require('../package');

Vue.config.productionTip = false
let instance: any = null;

function render (props = {}) {
  if (props) {
    console.log(777)
    // 注入 actions 实例
    // actions.setActions(props);
  }
  // 注册观察者函数
  // onGlobalStateChange 第二个参数为 true，表示立即执行一次观察者函数
  actions.onGlobalStateChange((state: any) => {
    // 挂载到vue原型上
    Vue.prototype.$father = state;
  }, true);

  instance = new Vue({
    router: router(props),
    store,
    render: h => h(App)
  }).$mount(`#${name}`);
}

export async function bootstrap () {
  console.log('[vue] vue app bootstraped');
}

export async function mount (props: any) {
  console.log('[vue] props from main framework', props);
  // storeTest(props);
  render(props);
}

export async function unmount () {
  instance.$destroy();
  instance.$el.innerHTML = '';
  instance = null;
}

if (!window.__POWERED_BY_QIANKUN__) {
  render();
}


