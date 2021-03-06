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

//获取案例详情
export function getCaseDetail(params, callback) {
  getAxios(productBaseUrl + '/apiwithout/v1/getCaseInfoById', params, callback, 'get')
};

//获取产品详情
export function getProductDetail(params, callback) {
  getAxios(productBaseUrl + '/apiwithout/v1/caseProductInfo', params, callback, 'get')
};

//获取贷款记录（关联案例）
export function getCaseLoanRecord(params, callback) {
  getAxios(parisBaseUrl + '/apiwithout/v1/caseProDetail', params, callback, 'get')
};





//news
let pandoraBaseUrl = 'pandora-backend';
let nireusBaseUrl = 'nireus-backend';

//取得资讯首页Title和栏目
export function getNewsTabTitleInfo(params, callback) {
  getAxios(pandoraBaseUrl + '/apinoauth/v2/getTitleInfo', params, callback, 'get')
};
//取得资讯列表
export function getNewsListByThemeId(params, callback) {
  getAxios(pandoraBaseUrl + '/apinoauth/v2/getInfoList', params, callback, 'get')
};
//获取新闻详情
export function getInfoDetail(params, callback) {
    getAxios(nireusBaseUrl + '/apiwithout/v1/getInfoDetail', params, callback, 'get')
};

//获取相关新闻
export function getRelevantNewsById(params, callback) {
    getAxios(pandoraBaseUrl + '/apinoauth/v2/getRelevantInfoList', params, callback, 'get')
};

//获取资讯评论
export function getComments(params, callback) {
    getAxios(pandoraBaseUrl + '/apinoauth/v1/getComments', params, callback, 'get')
};

//增加评论
export function addComments(params, callback) {
    getAxios(pandoraBaseUrl + '/api/v2/addComments', params, callback, 'post')
};

//收藏取消收藏
export function toggleCollectInfo(isCollected, params, callback) {
    if (!isCollected) {
        //收藏
        getAxios(nireusBaseUrl + '/api/v1/addInfoCollect', params, callback, 'post')
    } else {
        //取消收藏
        getAxios(nireusBaseUrl + '/api/v1/removeInfoCollect', params, callback, 'post')
    }
};




//登陆信息接口
//获取短信验证码
export function getIndentifyMessage(params, callback) {
    getAxios('thor-backend/api/v1/sendMessage', params, callback, 'post')
};

//用户登录
export function userLogin(params, callback) {
    getAxios('thor-backend/v2/normalLogin', params, callback, 'post')
};

//获取用户信息
export function getUserInfo(params, callback) {
    getAxios('thor-backend/api/v1/getSortUserInfo', params, callback, 'get')
};



