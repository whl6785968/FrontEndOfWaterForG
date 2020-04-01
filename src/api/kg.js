import request from '@/utils/request'

export function save(entity,
          entityAmbiguous,
          entityLink,
          startLabel,
          relation,
          des,
          value,
          valueAmbiguous,
          valueLink,
          endLabel){
  return request({
    url: '/kg/saveEntity',
    method: 'get',
    params: { entity,
          entityAmbiguous,
          entityLink,
          startLabel,
          relation,
          des,
          value,
          valueAmbiguous,
          valueLink,
          endLabel }
  })
}

export function search(entityName){
  return request({
    url: '/kg/search',
    method: 'get',
    params: { entityName }
  })
}

export function search2(entityName,entityId){
  return request({
    url: '/kg/search2',
    method: 'get',
    params: { entityName,entityId }
  })
}

export function getEntities(entityName,entityAmbiguous,page,pageSize){
//alert(pageSize)
  return request({
    url: '/kg/getEntities',
    method: 'get',
    params: { entityName,entityAmbiguous,page,pageSize }
  })
}

export function getRelation(entityId){
  return request({
    url: '/kg/getRelation',
    method: 'get',
    params: { entityId }
  })
}

export function createEntitiy(entityName,entityAmbiguous,entityLink,label){
  return request({
    url: '/kg/createEntitiy',
    method: 'post',
    params: {entityName,entityAmbiguous,entityLink,label}
  })
}

export function tstPython(){
  return request({
    url: '/kg/tstPython',
    method: 'get'
  })
}
