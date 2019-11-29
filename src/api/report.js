import request from '@/utils/request'
import qs from 'qs'



export function getBreakDownEquip(){
  return request({
    url: '/report/basic/getBreakDownEquip',
    method: 'get'
  })
}


export function getHistoryList(){
  return request({
    url: '/report/basic/getHistoryList',
    method: 'get'
  })
}

export function getHistoryDetails(createTime){
  return request({
    url: '/report/basic/getHistoryDetails',
    method: 'get',
    params: { createTime }
  })
}

export function getHistoryByDistrict(createTime){
  return request({
    url: '/report/basic/getHistoryByDistrict',
    method: 'get',
    params: { createTime }
  })
}
