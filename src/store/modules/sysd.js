import { getAllStation,getAllUser,getAllDistrict,addStation } from '@/api/sysd'

const state = {
  
}

const mutations = {}

const actions = {
  getAllStation({ commit }){
    return new Promise((resolve,reject) => {
      getAllStation().then(response => {
        if(response.status == 200){
          resolve(response)
        }
      }).catch(error => {
        reject(error)
      })
    })
  },
   getAllUser({ commit }){
    return new Promise((resolve,reject) => {
      getAllUser().then(response => {
        if(response.status == 200){
          resolve(response)
        }
      }).catch(error => {
        reject(error)
      })
    })
  },
   getAllDistrict({ commit }){
    return new Promise((resolve,reject) => {
      getAllDistrict().then(response => {
        if(response.status == 200){
          resolve(response)
        }
      }).catch(error => {
        reject(error)
      })
    })
  },
  addStation( {commit },info){
    const { id,name,longtitude,latitude,currLevel,preLevel,user,district } = info
    return new Promise((resolve,reject) => {
      addStation({id:id,name:name,longtitude:longtitude,latitude:latitude,currlevel:currLevel,prelevel:preLevel,responsible:user,district:{id:district}}).then(response => {
        if(response.status == 200){
          resolve(response)
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
