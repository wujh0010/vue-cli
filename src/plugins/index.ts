import Vue from "vue";
import axios from 'axios';
import lodash from 'lodash';

const plugins: any = {
  _: lodash,
  $axios: axios
};
const install = () => {
  Object.keys(plugins).forEach((key: string) => {
    Vue.prototype[key] = plugins[key];
  });
};

Vue.use(install);
