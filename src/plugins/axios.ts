import Vue from 'vue';
import axios from 'axios';
import config from '@/business/config';
import { v4 as uuidv4 } from 'uuid';
// import Cookies from 'js-cookie';

// declare const window: Window & { __sgm__: any; reportBusinessInfo: any; reportSellingApiError: any };

// // 正式环境，增加接口业务监控
// const handleErrInfoReport = (response: any) => {
//   const code: any = parseInt(response.data.code, 10);
//   if (config().name === 'prod' && (response.status !== 200 || code !== 0)) {
//     const mfs_lsy_sessionb: any = Cookies.get('mfs_lsy_sessionb');
//     const sp_lsy_session: any = Cookies.get('sp_lsy_session');
//     const mfs_lsy_pinb: any = Cookies.get('mfs_lsy_pinb');
//     const app_code: any = Cookies.get('app_code');
//     // 店铺类型：0 内贸 1：外贸
//     const shop_type: any = Cookies.get('shop_type');
//     const sp_lsy_vd: any = Cookies.get('sp_lsy_vd');
//
//     const warningParam: any = {
//       status: response.status,
//       url: response.config.url,
//       method: response.config.method,
//       cookieInfo: {
//         mfs_lsy_sessionb,
//         sp_lsy_session,
//         mfs_lsy_pinb,
//         app_code,
//         shop_type,
//         sp_lsy_vd
//       },
//       baseUrl: response.config.baseURL,
//       responseData: response.data,
//       requestData: JSON.parse(response.config.data),
//     };
//
//     // 子应用添加自己的code，code信息为固定格式，必须以 _b_Error 结尾
//     window.__sgm__.custom({ type: 2, code: 'product_b_Error', msg: warningParam });
//   }
// };

const axiosHttp: any = axios.create({
  baseURL: config().api,
  timeout: 2 * 60 * 1000,
  headers: {}
});

// 处理 request
axiosHttp.interceptors.request.use(
  (config: any) => {
    // 携带cookie
    config.withCredentials = true;
    // 固定参数
    const tmpParams: any = {
      // 1：内销
      channel: 1,
      // 请求跟踪标识，每次请求生产不同的标识
      traceId: uuidv4(),
      // 平台：1：pc
      platform: 1,
      // 1: "商羚
      source: 1,
    };

    // get请求
    if (config.method === 'get') {
      const params = config.params || {};
      return {
        ...config,
        params: {
          ...params,
          ...tmpParams
        }
      };
    }

    // post 请求
    if (config.method === 'post') {
      const params = config.data || {};
      return {
        ...config,
        data: {
          ...params,
          ...tmpParams
        }
      };
    }

    return config;
  },
  (err: any) => {
    console.log(err);
  }
);

// response拦截器，返回数据处理
axiosHttp.interceptors.response.use(
  (response: any) => {
    console.log(response);
    // const code: any = parseInt(response.data.code, 10);
    // 跳转登陆
    // if (code === 999999) {
    //   const url: any = (location.origin || `${location.protocol}//${location.host}`) + '/overview';
    //   Vue.prototype.$logout(url);
      // window.location.href = `${config().apiLogin}&returnUrl=${url}`;
    // }
    // 未选择店铺或者店铺cookie过期是，跳转店铺选择
    // if (code === 30002) {
      // window.location.href = config().microShop + '/shop-list';
      // window.location.href = config().microShop + '/shop-list?returnUrl=' + window.location.href;
    // }

    // 错误监控，拦截所有接口错误信息
    // window.handleErrInfoReport && window.handleErrInfoReport(response, 'product_api');

    return response.data;
  },
  (err: any) => {
    console.log(err);
    // 监控跨域、500、400等错误信息
    // window.reportSellingApiError && window.reportSellingApiError('error', 'product_api_reject', err);
    return {};
  }
);

export default axiosHttp;
