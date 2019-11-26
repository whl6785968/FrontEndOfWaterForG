import request from '@/utils/request'
import qs from 'qs'

export function getAllStation(){
  return request({
    url: '/sys/data/getAllStation',
    method: 'get'
  })
}

export function getAllUser(){
  return request({
    url: '/sys/data/getAllUser',
    method: 'get'
  })
}

export function getAllDistrict(){
  return request({
    url: '/sys/data/getAllDistrict',
    method: 'get'
  })
}

export function addStation(data){
  return request({
    url: '/sys/data/addStation',
    method: 'post',
    data
  })
}
