import { getCountByLevel,getBreakDownEquip } from '@/api/report'

const state = {
  
}

const mutations = {
  
}

const actions = {
  getCountByLevel({ commit }){
    return new Promise((resolve,reject) => {
      getCountByLevel().then(response => {
        if(response.status == 200){
          resolve(response)
        }
      }).catch(error => {
        reject(error)
      })
    })
  },
  getBreakDownEquip({ commit }){
    return new Promise((resolve,reject) => {
      getBreakDownEquip().then(response => {
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