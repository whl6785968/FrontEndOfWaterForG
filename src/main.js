// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import { getToken } from '@/utils/auth'
import store from './store'

Vue.config.productionTip = false

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import echarts from 'echarts'
import { initmenu, getRoleById } from '@/utils/menuUtil'
import $ from 'jquery'
//import 'bootstrap4/dist/css/bootstrap.css'
//import 'bootstrap4/dist/js/bootstrap.js'

import 'bootstrap/dist/css/bootstrap.min.css'

//import Viewer from 'viewerjs'
//import 'viewerjs/dist/viewer.css'

Vue.filter('ellipsis',function(str){
  if(str.length > 20){
    return str.substring(0,20) + "..."
  }
  return str
})

import moment from 'moment'
Vue.filter('dateFormat', function(dataStr, pattern = "YYYY-MM-DD HH:mm:ss") {
  return moment(dataStr).format(pattern)
})

Vue.use(ElementUI)
Vue.prototype.$echarts = echarts

import BMap from 'vue-baidu-map'

Vue.use(BMap,{
  ak: 'uzs5G9t190lBpWmcohwIHFcgPKmdTnGb'
})

const whiteList = ['/login']
var getRouter

router.beforeEach((to, from, next) => {
  const hasToken = getToken()
  if(hasToken) {
    if(!getRouter) {
      if(to.path == 'login') {
        next({
          path: '/'
        })
        return
      } else {
        store.dispatch('user/getInfo', hasToken).then(response => {
          const userid = response.obj
          getRoleById(store,userid)
          getRouter = initmenu(router, store, userid)
          next()
        })
      }
    } else {
      const routes = store.state.routes
      next()
    }
  } else {
    if(whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/login')
    }
  }

})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>',
  store
})