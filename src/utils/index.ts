import Vue from 'vue';
import dateTime from '@/utils/date-time';
import validator from "@/utils/validator";

const install = () => {
  Vue.prototype.$tools = {
    dateTime,
    validator
  };
}

Vue.use(install);
