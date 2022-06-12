import axios from 'axios'
import { stringify } from 'qs'
import Swal from 'sweetalert2'

const getCookie = cname => {
  const name = cname + '='
  const ca = document.cookie.split(';')
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i]
    while (c.charAt(0) == ' ') {
      c = c.substring(1)
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length)
    }
  }
  return ''
}

const config = {
  baseURL: 'https://mapleweb.herokuapp.com/',
  paramsSerializer: params => stringify(params, { arrayFormat: 'repeat' }),
  headers: {},
}

const instance = axios.create(config)

/**
 *  request 攔截器
 */
instance.interceptors.request.use(
  request => {
    // 在送出請求之前做的事 (EX:塞 token)
    const accessToken = getCookie('accessToken')
    const headers = {
      ...request.headers,
      Authorization: accessToken ? `Bearer ${getCookie('accessToken')}` : '',
    }
    return { ...request, headers } // Authorization 就是 assess token
  },
  error => {
    // 請求錯誤時做的事
    return Promise.reject(error)
  }
)

/**
 *  response 攔截器
 */
instance.interceptors.response.use(
  response => {
    // 對 response 做些事
    return response
  },
  error => {
    // 請求錯誤時做些事 EX: 403 抓 refresh token; api 錯誤顯示彈窗
    Swal.fire({
      title: error.response.data.result[0],
      icon: 'error',
      confirmButtonText: '確認',
    })
    return Promise.reject(error)
  }
)

export default instance
