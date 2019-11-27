import request from '@/utils/request'
import qs from 'qs'

export function getAllStation(page,pageSize){
  return request({
    url: '/sys/data/getAllStation',
    method: 'get',
    params: { page,pageSize }
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

export function addDistrict(data){
  return request({
    url: '/sys/data/addDistrict',
    method: 'post',
    data
  })
}

export function getAllEquip(){
  return request({
    url: '/sys/data/getAllEquip',
    method: 'get'
  })
}

export function addEquip(data){
  return request({
    url: '/sys/data/addEquip',
    method: 'post',
    data
  })
}
