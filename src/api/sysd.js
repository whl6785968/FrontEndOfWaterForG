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

export function getAllDistrict(page,pageSize){
  return request({
    url: '/sys/data/getAllDistrict',
    method: 'get',
    params: { page,pageSize }
  })
}

export function addStation(data){
  return request({
    url: '/sys/data/addStation',
    method: 'post',
    data
  })
}

export function modifyStation(data){
  return request({
    url: '/sys/data/modifyStation',
    method: 'post',
    data
  })
}

export function deleteStation(stationId){
  alert(stationId)
  return request({
    url: '/sys/data/deleteStation',
    method: 'delete',
    params: { stationId }
  })
}
export function addDistrict(data){
  return request({
    url: '/sys/data/addDistrict',
    method: 'post',
    data
  })
}

export function modifyDistrict(data){
  return request({
    url: '/sys/data/modifyDistrict',
    method: 'post',
    data
  })
}

export function deleteDistrict(id){
  return request({
    url: '/sys/data/deleteDistrict',
    method: 'delete',
    params: { id }
  })
}

export function getAllEquip(page,pageSize){
  return request({
    url: '/sys/data/getAllEquip',
    method: 'get',
    params: { page,pageSize }
  })
}

export function addEquip(data){
  return request({
    url: '/sys/data/addEquip',
    method: 'post',
    data
  })
}

export function modifyEquip(data){
//alert(data.id)
  return request({
    url: '/sys/data/modifyEquip',
    method: 'post',
    data
  })
}
