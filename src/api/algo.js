import request from '@/utils/request'

export function errCheck(){
  return request({
    url: '/errCheck',
    method: 'get'
  })
}

export function trainIsoForest(){
  return request({
    url: '/trainIsoForest',
    method: 'get'
  })
}

export function isError(data){
  return request({
    url: '/isError',
    method: 'post',
    data
  })
}
