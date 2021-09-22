import Vue from 'vue';
import i18n from './i18n';

const transformLang = (key: string, params?: any) => {
  return i18n.it(key, params);
};

/**
 * 初始化 语言
 * 1、i18n 初始化，确定当前是什么语言
 * 2、初始化 $t 函数
 * */
const init = () => {
  i18n.init();
  Vue.prototype.$t = transformLang;
}

Vue.use(init);
