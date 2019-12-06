import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import login from '@/components/login'
import dashboard from '@/components/dashboard'
import homepage from '@/components/homePage/'
import page404 from '@/components/404/'
import dataManager from '@/components/dataManager/'
import algo from '@/components/algo/'

Vue.use(Router)

export const constantRoutes = [
  {
      path: '/',
      component: dashboard,
      children: [
        {
          path: '/',
          redirect: '/homepage'
        },
        {
          path: '/homepage',
          component: homepage
        },
        {
          path: '/dataManager',
          component: dataManager
        },
        {
          path: '/algo',
          component: algo
        }
      ]
    },
    {
      path:'/login',
      name:'login',
      component: login,
    },
    {
      path: '/404',
      name: '404',
      component: page404
    }
]


export default new Router({
  mode: 'hash',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})



const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
};