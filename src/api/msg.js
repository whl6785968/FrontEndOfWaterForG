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
    url: '/posting',
    method: 'post',
    data
  })
}

export function getUnReviewMsg(isReviewed){
  return request({
    url: '/getUnReviewMsg',
    method: 'get',
    params: { isReviewed }    
  })
}

export function getUnReviewMsgDetail(postId){
  return request({
    url: '/getUnReviewMsgDetail',
    method: 'get',
    params: { postId }
    
  })
}

export function passPost(postId){
  return request({
    url: '/passPost',
    method: 'get',
    params: { postId }
  })
}

export function notPass(postId){
  return request({
    url: '/notPass',
    method: 'get',
    params:{ postId }
  })
}
