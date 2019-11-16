import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import login from '@/components/login'
import dashboard from '@/components/dashboard'
import authControl from '@/components/userManager/authControl/index.vue'
import checkData from '@/components/dataRelated/'
import homepage from '@/components/homePage/'
import menuConfig from '@/components/userManager/menuConfig/'
import page404 from '@/components/404/'
import dataDetils from '@/components/dataRelated/DataDeatils/'

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
          path: '/dataDetails/:id',
          component: dataDetils
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