import { errCheck,trainIsoForest,isError,tst,getErrRecord } from '@/api/algo'

const state = {
  
}

const mutations = {
  
}

const actions = {
  errCheck({ commit }){
    return new Promise((resolve,reject) => {
      errCheck().then(response => {
        if(response.status == 200){
          resolve(response)
        }
      }).catch(error => {
        reject(error)
      })
    })
  },
  trainIsoForest({ commit }){
    return new Promise((resolve,reject) => {
      trainIsoForest().then(response => {
        if(response.status == 200){
          resolve(response)
        }
      }).catch(error => {
        reject(error)
      })
    })
  },
  isError({ commit },data){
    const { ph,disslove,nh,kmno,totalp } = data
    return new Promise((resolve,reject) => {
      isError({ph:ph,disslove:disslove,nh:nh,kmno:kmno,totalp:totalp}).then(response => {
        if(response.status == 200){
          resolve(response)
        }
      }).catch(error => {
        reject(error)
      })
    })
  },
  tst({ commit }){
    return new Promise((resolve,reject) => {
      tst().then(response => {
        if(response.status == 200){
          resolve(response)
        }
      }).catch(error => {
        reject(error)
      })
    })
  },
  getErrRecord({ commit }){
    return new Promise((resolve,reject) => {
      getErrRecord().then(response => {
        if(response.status == 200){
          resolve(response.obj)
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
