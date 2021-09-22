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

// eslint-disable-next-line
const {name} = require('../package');

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount(`#${name}`)
