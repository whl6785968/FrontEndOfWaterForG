import request from '@/utils/request'

export function getEquipAndStation(data){
  return request({
    url: '/data/basic/getEquipAndStation',
    method: 'post',
    data
  })
}

export function searchDataOnCond(data){
//alert(JSON.stringify(searchCondition))
  return request({
      url: '/data/basic/searchDataOnCond',
      method: 'post',
      data
  })
}
