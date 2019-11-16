import { getEquipAndStation,searchDataOnCond } from '@/api/datar'

const state = {
  
}

const mutations = {
  
}

const actions = {
  getEquipAndStation({ commit },searchCondition){
    const { id,equipName,equipModel,station,status,level } = searchCondition
    return new Promise((resolve,reject) => {
      getEquipAndStation({id:id,equipName:equipName,equipModel:equipModel,station:station,status:status,level:level}).then(response => {
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
  }
//searchDataOnCond({ commit },searchCondition){
//  const { id,equipName,equipModel,station,status,level } = searchCondition
//  return new Promise((resolve,reject) => {
//   searchDataOnCond({id:id,equipName:equipName,equipModel:equipModel,station:station,status:status,level:level}).then(response => {
//     if(response.status == 200){
//       resolve(response)
//     }
//   }).catch(error => {
//     reject(error)
//   })
//  })
//}
}


export default {
  namespaced: true,
  state,
  mutations,
  actions
}
