import request from '@/utils/request'

export function save(entityFrom,startLabel,relation,entityTo,endLabel){
  return request({
    url: '/kg/saveEntity',
    method: 'get',
    params: { entityFrom,startLabel,relation,entityTo,endLabel }
  })
}

export function search(entityName){
  return request({
    url: '/kg/search',
    method: 'get',
    params: { entityName }
  })
}
