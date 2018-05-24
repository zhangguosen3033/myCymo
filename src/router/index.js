import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import tabbar from '@/components/tabbar/tabbar'
import home from '@/views/home'
import news from '@/views/news'
import loan from '@/views/loan'
import mine from '@/views/mine'
import productData from '@/views/product/productData'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  routes: [{
      path: '/',
      redirect: '/home',
      name: 'tabbar',
      component: tabbar, //保证下列界面有tabbar
      children: [{
          path: '/home',
          component: home,
        },
        {
          path: '/loan',
          component: loan
        },
        {
          path: '/news',
          component: news
        },
        {
          path: '/mine',
          component: mine
        }
      ]
    },
    {
      path: '/product/productData',
      component: productData,

    },
  ]
})
