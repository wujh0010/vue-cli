import Vue from 'vue';
import Error from "@/components/error.vue";

const components: any = {
  Error
}

const install = (Vue: any) => {
  Object.keys(components).forEach((key) => {
    Vue.component(key, components[key]);
  });
};
install(Vue);

