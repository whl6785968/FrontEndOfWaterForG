import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import user from './modules/user'
import menu from './modules/menu'
import datar from './modules/datar'
import msg from './modules/msg'

const store = new Vuex.Store({
  state: {
    routes: [],
    routesLength: 0,
    role: '',
    currUserId: ''
  },
  mutations: {
     initMenu(state, menus){
      state.routes = menus
      state.routesLength = menus.length
     },
     storageRole(state,role){
       state.role = role.roleName
       sessionStorage.setItem('role',role.roleName);
     }
  },
  modules: {
    user,
    menu,
    datar,
    msg
  }
})

export default store
