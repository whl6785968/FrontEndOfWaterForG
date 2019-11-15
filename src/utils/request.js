import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
import qs from 'qs'

const service = axios.create({
//http://localhost:8088
baseURL: 'http://localhost:8088',
timeout: 20000
})

service.interceptors.request.use(
  config => {
    if(store.state.user.token) {
      config.headers['X-Token'] = getToken()
//    config.headers.common = {
//    'Content-Type': "application/json",
//    'Access-Control-Allow-Origin':'*',
//    'Access-Control-Allow-Headers':'X-Requested-With,Content-Type,Access-Control-Allow-Origin',
//    'Access-Control-Allow-Methods':'PUT,POST,GET,DELETE,OPTIONS',
//    'X-Token': getToken()
//    }
    }
    return config
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    const res = response.data
   if(res == "")
   {
      Message({
        message: res.msg || 'Error',
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject(new Error(res.msg || 'Error'))
   }
    else {
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }

)

export default service