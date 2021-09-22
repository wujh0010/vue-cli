import http from '../../plugins/axios';
import config from '../config';
import to from 'await-to-js';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const queryProductList = async (params: any) => {
  const url: string = config().api + '/api/product/v1/product/query_product_for_page';
  return await to(http.post(url, params));
};

export default {
  queryProductList
}
