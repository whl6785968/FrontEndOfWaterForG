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

import moment from 'moment'
Vue.filter('dateFormat', function(dataStr, pattern = "YYYY-MM-DD HH:mm:ss") {
  return moment(dataStr).format(pattern)
})

Vue.use(ElementUI)
Vue.prototype.$echarts = echarts

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