import request from '@/utils/request'
import qs from 'qs'


export function getCountByLevel(){
  return request({
    url: '/getCountByLevel',
    method: 'get'
  })
}

export function getBreakDownEquip(){
  return request({
    url: '/getBreakDownEquip',
    method: 'get'
  })
}
