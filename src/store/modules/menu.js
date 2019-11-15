import { MessageBox, Message } from 'element-ui'
import { getRoles,getAllMenuTree,updateRoleMenu } from '@/api/menu'

const state = {
  
}

const mutations = {
  
}

const actions = {
  getRoles({ commit }){
    return new Promise((resolve,reject) => {
      getRoles().then(response => {
        if(response.status == 200){
          resolve(response.obj)
        }
        else{
          Message({
              message: response.msg || 'Error',
              type: 'error',
            })
            reject(new Error(response.msg || 'Error'))
        }
      }).catch(error => {
        reject(error)
      })
    })
  },
  getAllMenuTree({ commit },ativeNames){
    return new Promise((resolve,reject) => {
      getAllMenuTree(ativeNames).then(response => {
        if(response.status == 200){
          resolve(response.obj)
        }
        else{
          Message({
              message: response.msg || 'Error',
              type: 'error',
            })
            reject(new Error(response.msg || 'Error'))
        }
      }).catch(error => {
        reject(error)
      })
    })
  },
  updateRoleMenu({ commit },menuData){
    const { role_id,mids } = menuData
//  alert(role_id)
    return new Promise((resolve,reject) => {
      updateRoleMenu({ role_id:role_id,mids:mids }).then(response => {
        if(response.status == 200){
          resolve(response)
        }
        else{
          Message({
              message: response.msg || 'Error',
              type: 'error',
            })
            reject(new Error(response.msg || 'Error'))
        }
      }).catch(error => {
        reject(error)
      })
    })
  }
  
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
