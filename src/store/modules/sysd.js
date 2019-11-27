import { getAllStation,getAllUser,getAllDistrict,addStation,addDistrict,getAllEquip,addEquip } from '@/api/sysd'

const state = {
  
}

const mutations = {}

const actions = {
  getAllStation({ commit },info){
    const { page,pageSize } = info
    return new Promise((resolve,reject) => {
      getAllStation(page,pageSize).then(response => {
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
  },
  addDistrict({ commit },info){
    const { id,name } = info
    return new Promise((resolve,reject) => {
      addDistrict({id:id,name:name}).then(response => {
        if(response.status == 200){
          resolve(response)
        }
      }).catch(error => {
        reject(error)
      })
    })
  },
  getAllEquip({ commit }){
    return new Promise((resolve,reject) => {
      getAllEquip().then(response => {
        if(response.status == 200){
          resolve(response)
        }
      }).catch(error => {
        reject(error)
      })
    })
  },
  addEquip({ commit },info){
    let { id,name,model,productiontime,availabletime,productionplace,status,stationId } = info
    productiontime = new Date(productiontime)
    return new Promise((resolve,reject) => {
      addEquip({id:id,name:name,model:model,productiontime:productiontime,availabletime:availabletime,productionplace,productionplace,status:status,station:{id:stationId}}).then(response => {
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
