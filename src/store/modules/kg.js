import { save,search,search2,getEntities,getRelation,createEntitiy,tstPython } from '@/api/kg'

const state = {
  
}

const mutations = {
  
}

const actions = {
  save({ commit },data){
    const { entity,
          entityAmbiguous,
          entityLink,
          startLabel,
          relation,
          des,
          value,
          valueAmbiguous,
          valueLink,
          endLabel} = data
    return new Promise((resolve,reject) => {
      save(entity,
          entityAmbiguous,
          entityLink,
          startLabel,
          relation,
          des,
          value,
          valueAmbiguous,
          valueLink,
          endLabel).then(response => {
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
        if(response.status==200){
          resolve(response.obj)
        }
      }).catch(error => {
        reject(error)
      })
    })
  },
  search2({commit},infos){
//  alert(entityName)
    const {entityName,entityId} = infos
    return new Promise((resolve,reject) => {
      search2(entityName,entityId).then(response => {
        if(response.status==200){
          resolve(response)
        }
      }).catch(error => {
        reject(error)
      })
    })
  },
  getEntities({commit},infos){
//  alert(entityName)
    const {entityName,entityAmbiguous,page,pageSize} = infos
    return new Promise((resolve,reject) => {
      getEntities(entityName,entityAmbiguous,page,pageSize).then(response => {
        if(response.status==200){
          resolve(response)
        }
      }).catch(error => {
        reject(error)
      })
    })
  },
  getRelation({commit},entityId){
    return new Promise((resolve,reject) => {
      getRelation(entityId).then(response => {
        if(response.status==200){
          resolve(response)
        }
      }).catch(error => {
        reject(error)
      })
    })
  },
  createEntitiy({commit},infos){
    const { entityName,entityAmbiguous,entityLink,label } = infos
    return new Promise((resolve,reject) => {
      createEntitiy(entityName,entityAmbiguous,entityLink,label).then(response => {
        if(response.status==200){
          resolve(response)
        }
        else{
          this.$message.error(response.msg)
        }
      }).catch(error => {
        reject(error)
      })
    })
  },
  tstPython({commit}){
    return new Promise((resolve,reject) => {
      tstPython().then(response => {
        if(response.status==200){
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

