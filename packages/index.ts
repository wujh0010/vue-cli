import Error from './error.vue';

declare const window: Window & { Vue: any };

const components: any = {
  Error
};

/*
  定义install 方法，接收Vue作为参数，如果使用use注册插件，则所有的组件都将被注册
*/
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const install: any = function (Vue: any) {
  // 判断是否安装
  if (install.installed) {
    return;
  }

  for (const key of components) {
    components[key].install = (Vue: any) => {
      Vue.component(key, components[key]);
    };
  }
};

// 判断是否引入文件
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export {
  Error
};

export default {
  install
};
