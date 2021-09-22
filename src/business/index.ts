import Vue from 'vue';
import config from './config';
import api from '@/business/api';

const business: any = {
  $config: config,
  $api: api
}

const install = () => {
  Object.keys(business).forEach((key: string) => {
    Vue.prototype[key] = business[key];
  })
}

Vue.use(install);
