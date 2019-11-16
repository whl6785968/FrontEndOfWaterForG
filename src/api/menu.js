import request from '@/utils/request'
import qs from 'qs'

export function getRoles(){
  return request({
    url: '/sys/menu/getRoles',
    method: 'get'
  })
}

export function getAllMenuTree(activeNames){
  return request({
    url: '/sys/menu/getAllMenuTree/'+activeNames,
    method: 'get'
  })
}

export function updateRoleMenu(menuData){
  const { role_id,mids } = menuData
//alert(role_id)
  return request({
    url: '/sys/menu/updateRoleMenu',
    method: 'post',
    params: {role_id:role_id,mids:mids},
    paramsSerializer: params => {
      return qs.stringify(params,{ indices: false})
    }
  })
}
