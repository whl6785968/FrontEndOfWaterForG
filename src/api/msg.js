import request from '@/utils/request'

export function deleteFile(path){
  return request({
    url: '/deletePic',
    method: 'delete',
    params: { path }
  })
}

export function posting(data){
  return request({
    url: '/msg/basic/posting',
    method: 'post',
    data
  })
}

export function getUnReviewMsg(){
  return request({
    url: '/sys/msg/getUnReviewMsg',
    method: 'get'   
  })
}

export function getReadableMsg(){
  return request({
    url: '/msg/basic/getReadableMsg',
    method: 'get'
  })
}

export function getUnReviewMsgDetail(postId){
  return request({
    url: '/msg/basic/getMsgDetail',
    method: 'get',
    params: { postId }
    
  })
}

export function passPost(postId){
  return request({
    url: '/sys/msg/passPost',
    method: 'get',
    params: { postId }
  })
}

export function notPass(postId){
  return request({
    url: '/sys/msg/notPass',
    method: 'get',
    params:{ postId }
  })
}
