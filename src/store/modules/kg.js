import { save,search } from '@/api/kg'

const state = {
  
}

const mutations = {
  
}

const actions = {
  save({ commit },data){
    const { entityFrom,startLabel,relation,entityTo,endLabel } = data
    return new Promise((resolve,reject) => {
      save(entityFrom,startLabel,relation,entityTo,endLabel).then(response => {
        if(response.status){
          resolve(response)
        }
        else{
          this.$message({
            message: response.msg,
            type: 'error'
          })
        }
      }).catch(error => {
        reject(error)
      })
    })
  },
  search({ commit },entityName){
//  alert(entityName)
    return new Promise((resolve,reject) => {
      search(entityName).then(response => {
        if(response.status){
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

