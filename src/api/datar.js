import request from '@/utils/request'
export function getEquipAndStation(data){
  return request({
    url: '/data/basic/getEquipAndStation',
    method: 'post',
    data
  })
}

export function searchDataOnCond(data){
  return request({
      url: '/data/basic/searchDataOnCond',
      method: 'post',
      data
  })
}

export function getWaterData(eid){
  return request({
    url: '/data/basic/getWaterData',
    method: 'get',
    params: { eid }
  })
}

export function getStationForMap(district,responsible,level,page,pageSize){
  return request({
    url: '/data/basic/getAllInfoForStation',
    method: 'get',
    params: { district,responsible,level }
  })
}
