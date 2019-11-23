import { MessageBox, Message } from 'element-ui'
import { deleteFile,posting,getUnReviewMsg,getUnReviewMsgDetail,passPost,notPass,getReadableMsg } from '@/api/msg'

const state = {
  
}

const mutations = {
  
}

const actions = {
  deleteFile({ commit },path){
    return new Promise((resolve,reject) => {
      deleteFile(path).then(response => {
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
  },
  posting({ commit },sizeForm){
    let { name,type,isEmergency,content,imgList,uid } = sizeForm
//  alert(isEmergency)
    return new Promise((resolve,reject) => {
      posting({title:name,content:content,imglist:imgList.toString(),isemergency:isEmergency,type:type.toString(),uid:uid}).then(response => {       
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
  },
  getUnReviewMsg( {commit }){
    return new Promise((resolve,reject) => {
      getUnReviewMsg().then(response => {
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
  },
  getReadableMsg( {commit }){
    return new Promise((resolve,reject) => {
      getReadableMsg().then(response => {
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
  },
  getUnReviewMsgDetail({ commit },postId){
    return new Promise((resolve,reject) => {
      getUnReviewMsgDetail(postId).then(response => {
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
  },
  passPost({ commit },postId){
    return new Promise((resolve,reject) => {
      passPost(postId).then(response => {
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
  },
  notPass({ commit },postId){
    return new Promise((resolve,reject) => {
      notPass(postId).then(response => {
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
