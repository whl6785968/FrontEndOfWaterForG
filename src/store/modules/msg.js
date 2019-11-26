import { MessageBox, Message,notify } from 'element-ui'
import { deleteFile,posting,getUnReviewMsg,getUnReviewMsgDetail,passPost,notPass,getReadableMsg,getUnReadMsgCountByUser,hasRead,deletePost } from '@/api/msg'

import Stomp from 'stompjs'
import SockJS from 'sockjs-client'

const state = {
  currCount: 0,
  stomp: '',
  noticeCount: 0
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
  getReadableMsg( {commit },userId){
    return new Promise((resolve,reject) => {
      getReadableMsg(userId).then(response => {
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
  passPost({ commit },info){
    const { postId,userId } = info
    return new Promise((resolve,reject) => {
      passPost(postId,userId).then(response => {
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
  },
  connect({ commit },infoCount){
    state.currCount = infoCount
    state.noticeCount = infoCount
    state.stomp = Stomp.over(new SockJS("http://localhost:8088/ws/pullMsg"))
    const userId = sessionStorage.getItem("username")
    state.stomp.connect({},frame => {
      state.stomp.subscribe("/topic/pullMsg",message => {
        return new Promise((resolve,reject) => {
          getUnReadMsgCountByUser(userId).then(response => {
            state.noticeCount = response.obj
            resolve(response)
          }).catch(error => {
            reject(error)
          })
        })
      })
    })
  },
  closeConnect({ commit }){
    if(state.stomp != null){
      state.stomp.disconnect()
    }
  },
  send({ commit }){
    const username = sessionStorage.getItem("username")
    state.stomp.send("/app/getMsgCount")
  },
  getUnReadMsgCountByUser( {commit }){
    const userId = sessionStorage.getItem("username")
    return new Promise((resolve,reject) =>{
      getUnReadMsgCountByUser(userId).then(response => {
        if(response.status == 200){
          resolve(response.obj)
        }
      }).catch(error => {
        reject(error)
      })
    })
  },
  hasRead({ commit },info){
    const { postId,userId } = info
    return new Promise((resolve,reject) => {
      hasRead(postId,userId).then(response => {
        if(response.status == 200){
          resolve(response)
        }
      }).catch(error => {
        reject(error)
      })
    })
  },
  deletePost({ commit },info){
    const { postId,userId } = info
    return new Promise((resolve,reject) => {
      deletePost(postId,userId).then(response => {
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
