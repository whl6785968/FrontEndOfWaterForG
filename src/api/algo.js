import request from '@/utils/request'

export function errCheck(){
  return request({
    url: '/algo/basic/errCheck',
    method: 'get'
  })
}

export function trainIsoForest(){
  return request({
    url: '/algo/basic/trainIsoForest',
    method: 'get'
  })
}

export function isError(data){
  return request({
    url: '/algo/basic/isError',
    method: 'post',
    data
  })
}

export function tst(){
  return request({
    url: '/algo/basic/tst',
    method: 'get'
  })
}

export function getErrRecord(){
  return request({
    url: '/algo/basic/getErrRecord',
    method: 'get'
  })
}
