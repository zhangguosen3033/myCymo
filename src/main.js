// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import VueScroller from 'vue-scroller'

import Vuex from 'vuex'
import {
  AlertPlugin,
  ToastPlugin,
  ConfirmPlugin,
  LoadingPlugin
} from 'vux'

Vue.config.productionTip = false

Vue.use(VueScroller)


Vue.use(Vuex)
Vue.use(AlertPlugin)
Vue.use(ToastPlugin)
Vue.use(ConfirmPlugin)
Vue.use(LoadingPlugin)

// 设置路由跳转
Vue.prototype.$goRoute = function(index) {
  this.$router.push(index)
}
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})


router.afterEach((to, from, next) => {
    window.scrollTo(0, 0);  //全局的监听  路由跳转之后 滚动到屏幕首页 
});
