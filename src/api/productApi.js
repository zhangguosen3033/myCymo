//产品接口
import getAxios from './getAxios.js';

let productBaseUrl = 'prometheus-backend';
let parisBaseUrl = 'paris-backend';
let crmBaseUrl = 'thea-backend';

//热销产品接口
export function getHotProduct(params, callback) {
  getAxios(productBaseUrl + '/apiwithout/v1/getTopicPro', params, callback, 'get')
};

//首页banner广告、贷款页banner广告
export function getBannerConfig(params, callback) {
  getAxios(parisBaseUrl + '/apiwithout/v1/queryBannerConfig', params, callback, 'get')
};

//首页产品'立即申请'Banner配置
export function getHomeProductCfg(params, callback) {
  getAxios(productBaseUrl + '/apiwithout/v1/queryLoanApplyCfg', params, callback, 'get')
};

//首页文字滚动轮播
export function getHomeScrollData(params, callback) {
  getAxios(crmBaseUrl + '/apiwhthout/v1/queryHomeScrollData', params, callback, 'get')
};

//获取产品分类
export function getProductCate(params, callback) {
  getAxios(productBaseUrl + '/apiwithout/v2/getCaseHeadType', params, callback, 'get')
};
