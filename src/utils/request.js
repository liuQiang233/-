import axios from 'axios'
import store from '@/store'
import router from '@/router'
import { Message } from 'element-ui'

export const baseURL = 'http://big-event-vue-api-t.itheima.net'
const myAxios = axios.create({
  baseURL: baseURL
})

// 定义请求拦截器
myAxios.interceptors.request.use(function (config) {
  if (store.state.token) {
    config.headers.Authorization = store.state.token
  }

  return config
}, function (error) {
  return Promise.reject(error)
})
// 定义响应拦截器
myAxios.interceptors.response.use(function (response) {
  // 响应状态码为 2xx 时触发成功的回调，形参中的 response 是“成功的结果”
  return response
}, function (error) {
  // 响应状态码不是 2xx 时触发失败的回调，形参中的 error 是“失败的结果”

  if (error.response.status === 401) {
    store.commit('updataToken', '')
    store.commit('updataUserInfo', {})

    router.push('/')
    Message.error('token过期')
  }
  return Promise.reject(error)
})
export default myAxios
