  import { initMenu,getroleById } from '@/api/user'
import { constantRoutes } from '@/router'
import page404 from '@/components/404/'

import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export const getRoleById = (store,userid) => {
return new Promise((resolve,reject) => {
    getroleById(userid).then(response => {
      if(response.status == 200){
        const role = response.obj
        store.commit('storageRole',role)
        resolve(role)
      }
    }).catch(error => {
      reject(error)
    })
})
}

export const initmenu = (router,store,userId) => {
  var fmtRoutes
  initMenu(userId).then(response => {
    if (response){
      fmtRoutes = fmtRouters(response.obj)
//    alert(JSON.stringify(fmtRoutes))
      store.commit('initMenu', fmtRoutes)
//    resetRouter()
      router.matcher = new Router({mode:'hash'}).matcher
      router.options.routes = constantRoutes
      router.addRoutes(constantRoutes)
      router.addRoutes(fmtRoutes)
      router.options.routes.push({
        path: "*",
        component: page404
      })
      
    }
  })
  console.log(router)
  return router.options.routes
} 

export const fmtRouters = (routes) => {
  let fmtRoutes = [];
  routes.forEach(router => {
    let {
      path,
      component,
      title,
      iconcls,
      keepalive,
      requireauth,
      enable,
      children
    } = router;
    
    if(children && children instanceof Array){
      children =fmtRouters(children)
    }
    var cname = '';
    if(component.startsWith('dash')){
      cname = () => import('../components/dashboard.vue')
    }
    else if(component.startsWith('auth')){
      cname = () => import('../components/userManager/authControl/')
    }
    else if(component.startsWith('check')){
      cname = () => import('../components/dataRelated/')
    }
    else if(component.startsWith('menuConfig')){
       
      cname = () => import('../components/userManager/menuConfig/')
    }
    else if(component.startsWith('data')){
//    alert(1)
      cname = () => import('../components/dataRelated/DataDeatils/')
    }
    else if(component.startsWith('map')){
      cname = () => import('../components/dataRelated/map/')
    }
    else if(component.startsWith('posting')){
      cname = () => import('../components/msg/posting/')
    }
    else if(component.startsWith('readable')){
      cname = () => import('../components/msg/readablePost/')
    }
    else if(component.startsWith('review')){
      cname = () => import('../components/msg/review/')
    }
    else if(component.startsWith('postDetail')){
      cname = () => import('../components/msg/postDetail/')
    }
//  alert(cname);
    let fmRouter = {
      path: path,
      component: cname,
      name: title,
      children:children,
      meta: {
        title: title,
        iconCls: iconcls,
        keepAlive: keepalive,
        requireAuth: requireauth,
        enable: enable
      }
    };   
    fmtRoutes.push(fmRouter)
  })
  return fmtRoutes
}
