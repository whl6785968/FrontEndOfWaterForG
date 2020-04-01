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

export function getReadableMsg(userId){
  return request({
    url: '/msg/basic/getReadableMsg',
    method: 'get',
    params: { userId }
  })
}

export function getUnReviewMsgDetail(postId){
  return request({
    url: '/msg/basic/getMsgDetail',
    method: 'get',
    params: { postId }
    
  })
}

export function getReply(post_id){
  return request({
    url: '/msg/basic/getReply',
    method: 'get',
    params: { post_id }
  })
}

export function reply(post_id,user_id,content){
  return request({
    url: '/msg/basic/reply',
    method: 'post',
    params: { post_id,user_id,content }
  })
}

export function passPost(postId,userId){
  return request({
    url: '/sys/msg/passPost',
    method: 'get',
    params: { postId,userId }
  })
}

export function notPass(postId){
  return request({
    url: '/sys/msg/notPass',
    method: 'get',
    params:{ postId }
  })
}

export function getUnReadMsgCountByUser(userId){
  return request({
    url: '/msg/basic/getUnReadMsgCountByUser',
    method: 'get',
    params: { userId }
  })
}

export function hasRead(postId,userId){
  return request({
    url: '/msg/basic/hasRead',
    method: 'get',
    params: { postId,userId }
  })
}

export function deletePost(postId,userId){
  return request({
    url: '/msg/basic/deletePost',
    method: 'delete',
    params: { postId,userId }
  })
}
