//产品接口
import getAxios from './getAxios.js';

let productBaseUrl = 'prometheus-backend';

//热销产品接口
export function getHotProduct(params, callback) {
  getAxios(productBaseUrl + '/apiwithout/v1/getTopicPro', params, callback, 'get')
};