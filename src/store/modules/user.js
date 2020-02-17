import { getToken, setToken, removeToken } from '@/utils/auth'
import { getUser,login,getUserRole,getRoleByUserId,changeRole,getUserInfo,updateUserInfo,updatePassword } from '@/api/user'
import { MessageBox, Message } from 'element-ui'

const state = {
  token: getToken(),
  id: ''
}

const mutations = {
  SET_TOKEN: (state,token) => {
    state.token = token
  },
  SET_ID: (state,id) => {
    state.id = id
  }
}

const actions = {
  getInfo({commit,state}){
    return new Promise((resolve,reject)=> {
      getUser(state.token).then(response => {
        const data = response
        if(!data) {
                reject('Verification failed, please Login again.')
        }
        commit('SET_ID',data.obj)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  login({ commit },userInfo){
    const { username,password } = userInfo
    return new Promise((resolve,reject) => {
      login({username:username,password:password}).then(response => {
        if(response.status == 200){
          console.log(response.obj.token)
          commit('SET_TOKEN', response.obj.token)
          setToken(response.obj.token)
//        getInfo()
          resolve(response.obj)
        }
        else{
           Message({
              message: response.msg || 'Error',
              type: 'error',
              duration: 5 * 1000
            })
            reject(new Error(response.msg || 'Error'))
        }
      }).catch(error => {
        reject(error)
      })
    })
  },
  getUserRole({ commit }){
    return new Promise((resolve,reject) => {
        getUserRole().then(response => {
          if(response.status == 200){
            resolve(response.obj)
          }
          else{
            Message({
              message:response.msg,
              type: 'error'
            })
            reject(new Error(response.msg))
          }
        }).catch(error => {
          reject(error)
        })
    })
  },
  getRoleByUserId({ commit },user_id){
    return new Promise((resolve,reject) => {
        getRoleByUserId(user_id).then(response => {
          if(response.status == 200){
            resolve(response.obj)
          }
          else{
            Message({
              message:response.msg,
              type: 'error'
            })
            reject(new Error(response.msg))
          }
        }).catch(error => {
          reject(error)
        })
    })
  },
  changeRole({ commit },form){
    const { id,username,role } = form
    const user_id = username
    const role_id = role
    return new Promise((resolve,reject) => {
        changeRole(id,user_id,role_id).then(response => {
          if(response.status == 200){
            resolve(response.status)
          }
          else{
            Message({
              message:response.msg,
              type: 'error'
            })
            reject(new Error(response.msg))
          }
        }).catch(error => {
          reject(error)
        })
    })
  },
  getUserInfo({commit},userid){
    return new Promise((resolve,reject) => {
      getUserInfo(userid).then(response => {
        if(response.status == 200){
          resolve(response)
        }
        else{
          Message({
            message: resoonse.msg,
            type: 'error'
          })
          reject(new Error(response.msg))
        }
      }).catch(error => {
        reject(error)
      })
    })
  },
  updateUserInfo({commit},info){
    const link = info.link
    const descr = info.descr
    const userid = info.userid
    return new Promise((resolve,reject) => {
      updateUserInfo(link,descr,userid).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    }) 
  },
  updatePassword({commit},info){
    const userid = info.userid
    const pass = info.password
    return new Promise((resolve,reject) => {
      updatePassword(userid,pass).then(response => {
        resolve(response)
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
