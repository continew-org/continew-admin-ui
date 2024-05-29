import axios from 'axios'
import qs from 'query-string'
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import NProgress from 'nprogress'
import { useUserStore } from '@/stores'
import { getToken } from '@/utils/auth'
import modalErrorWrapper from '@/utils/modal-error-wrapper'
import messageErrorWrapper from '@/utils/message-error-wrapper'
import notificationErrorWrapper from '@/utils/notification-error-wrapper'
import 'nprogress/nprogress.css'
import router from '@/router'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

interface ICodeMessage {
  [propName: number]: string
}

const StatusCodeMessage: ICodeMessage = {
  200: '服务器成功返回请求的数据',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）',
  204: '删除数据成功',
  400: '请求错误(400)',
  401: '未授权，请重新登录(401)',
  403: '拒绝访问(403)',
  404: '请求出错(404)',
  408: '请求超时(408)',
  500: '服务器错误(500)',
  501: '服务未实现(501)',
  502: '网络错误(502)',
  503: '服务不可用(503)',
  504: '网络超时(504)'
}

const http: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_PREFIX ?? import.meta.env.VITE_API_BASE_URL,
  timeout: 30 * 1000
})

// 请求拦截器
http.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    NProgress.start() // 进度条
    const token = getToken()
    if (token) {
      if (!config.headers) {
        config.headers = {}
      }
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
http.interceptors.response.use(
  (response: AxiosResponse) => {
    const { data } = response
    const { success, code, msg } = data
    if (response.request.responseType === 'blob') {
      NProgress.done()
      return response
    }
    // 成功
    if (success) {
      NProgress.done()
      return response
    }

    // Token 失效
    if (code === 401 && response.config.url !== '/auth/user/info') {
      modalErrorWrapper({
        title: '提示',
        content: msg,
        maskClosable: false,
        escToClose: false,
        okText: '重新登录',
        async onOk() {
          NProgress.done()
          const userStore = useUserStore()
          userStore.logoutCallBack()
          router.replace('/login')
        }
      })
    } else {
      NProgress.done()
      // 如果错误信息长度过长，使用 Notification 进行提示
      if (msg.length <= 15) {
        messageErrorWrapper({
          content: msg || '服务器端错误',
          duration: 5 * 1000
        })
      } else {
        notificationErrorWrapper(msg || '服务器端错误')
      }
    }
    return Promise.reject(new Error(msg || '服务器端错误'))
  },
  (error) => {
    NProgress.done()
    const response = Object.assign({}, error.response)
    response
    && messageErrorWrapper({
      content: StatusCodeMessage[response.status] || '服务器暂时未响应，请刷新页面并重试。若无法解决，请联系管理员',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

const request = <T = unknown>(config: AxiosRequestConfig): Promise<ApiRes<T>> => {
  return new Promise((resolve, reject) => {
    http
      .request<T>(config)
      .then((res: AxiosResponse) => resolve(res.data))
      .catch((err: { msg: string }) => reject(err))
  })
}

const requestNative = <T = unknown>(config: AxiosRequestConfig): Promise<AxiosResponse> => {
  return new Promise((resolve, reject) => {
    http
      .request<T>(config)
      .then((res: AxiosResponse) => resolve(res))
      .catch((err: { msg: string }) => reject(err))
  })
}

const get = <T = any>(url: string, params?: object, config?: AxiosRequestConfig): Promise<ApiRes<T>> => {
  return request({
    method: 'get',
    url,
    params,
    paramsSerializer: (obj) => {
      return qs.stringify(obj)
    },
    ...config
  })
}

const post = <T = any>(url: string, params?: object, config?: AxiosRequestConfig): Promise<ApiRes<T>> => {
  return request({
    method: 'post',
    url,
    data: params,
    ...config
  })
}

const put = <T = any>(url: string, params?: object, config?: AxiosRequestConfig): Promise<ApiRes<T>> => {
  return request({
    method: 'put',
    url,
    data: params,
    ...config
  })
}

const patch = <T = any>(url: string, params?: object, config?: AxiosRequestConfig): Promise<ApiRes<T>> => {
  return request({
    method: 'patch',
    url,
    data: params,
    ...config
  })
}

const del = <T = any>(url: string, params?: object, config?: AxiosRequestConfig): Promise<ApiRes<T>> => {
  return request({
    method: 'delete',
    url,
    data: params,
    ...config
  })
}
const download = (url: string, params?: object, config?: AxiosRequestConfig): Promise<AxiosResponse> => {
  return requestNative({
    method: 'get',
    url,
    responseType: 'blob',
    params,
    paramsSerializer: (obj) => {
      return qs.stringify(obj)
    },
    ...config
  })
}
export default { get, post, put, patch, del, request, requestNative, download }
