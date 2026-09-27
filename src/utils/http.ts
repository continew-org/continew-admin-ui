import axios from 'axios'
import qs from 'query-string'
import type { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { useTenantStore } from '@/stores/modules/tenant'
import { useUserStore } from '@/stores'
import {
  clearAccessToken,
  getAccessToken,
  getAuthGeneration,
} from '@/features/auth-session/access-token'
import modalErrorWrapper from '@/utils/modal-error-wrapper'
import messageErrorWrapper from '@/utils/message-error-wrapper'
import notificationErrorWrapper from '@/utils/notification-error-wrapper'
import router from '@/router'
import { withAuthLifecycleLock } from '@/features/auth-session/lifecycle'

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
  504: '网络超时(504)',
}

const http: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_PREFIX ?? import.meta.env.VITE_API_BASE_URL,
  timeout: 30 * 1000,
  // Refresh Token 由后端写入 HttpOnly Cookie，浏览器必须允许跨域请求携带 Cookie。
  withCredentials: true,
})

interface RefreshableRequestConfig extends AxiosRequestConfig {
  /** 请求发起时的认证代次，用于拒绝过期响应清除新会话。 */
  __authGeneration?: number
  /** 标记该请求已经重试过，防止 Access Token 失效时无限循环。 */
  __isRetryRequest?: boolean
  /** 刷新请求自身失败时禁止再次触发刷新。 */
  __skipRefresh?: boolean
}

interface AccessTokenResp {
  accessToken?: string
  tenantId?: string | number | null
}

// 单例 Promise 让同一时间的多个 401 请求共用一次刷新，避免 Refresh Token 被并发轮换。
let refreshPromise: Promise<string> | null = null
let authFailureShown = false

const isAuthEndpoint = (url?: string) => {
  if (!url) return false
  return url.endsWith('/auth/login') || url.endsWith('/auth/refresh') || url.endsWith('/auth/logout')
}

// 账号类登录以显式租户编码为准；社交登录回调没有租户编码，必须保留授权前选择的
// 租户 ID。刷新和退出始终以服务端 Refresh Session 为准。
const isTenantIndependentAuthEndpoint = (config: AxiosRequestConfig) => {
  const url = config.url
  if (url?.endsWith('/auth/refresh') || url?.endsWith('/auth/logout')) return true
  if (!url?.endsWith('/auth/login')) return false
  const data = config.data
  return typeof data !== 'object' || data?.authType !== 'SOCIAL'
}

const showReLogin = async (failedGeneration: number, message?: string) => {
  let clearedGeneration: number | undefined
  let redirectPath: string | undefined
  await withAuthLifecycleLock(async () => {
    // 旧请求的 401 到达时，新登录或刷新可能已经建立了下一代会话，不能清除它。
    if (authFailureShown || failedGeneration !== getAuthGeneration()) return
    authFailureShown = true
    clearAccessToken()
    redirectPath = router.currentRoute.value.fullPath
    // 已确认当前登录态失效时立即清理持久化的角色、权限、租户和动态路由，避免
    // 用户停留在弹窗期间仍看到上一会话的菜单。
    await useUserStore().logoutCallBack()
    clearedGeneration = getAuthGeneration()
    // 客户端确认当前会话失效后，主动让服务端清理 HttpOnly Cookie。
    try {
      await http.post('/auth/logout', undefined, {
        withCredentials: true,
        __skipRefresh: true,
      } as RefreshableRequestConfig)
    } catch {
      // 服务端不可用时继续走本地重新登录流程。
    }
  })
  if (clearedGeneration === undefined) return
  // 服务端能把"被顶下线/被踢下线"区分开，优先用它给的提示让用户知道发生了什么。
  modalErrorWrapper({
    title: '提示',
    content: message || '登录状态已失效，请重新登录',
    maskClosable: false,
    escToClose: false,
    okText: '重新登录',
    async onOk() {
      // 用户在弹窗期间重新登录时，不允许旧弹窗把新会话重置或重定向到登录页。
      if (clearedGeneration !== getAuthGeneration()) return
      await router.replace(`/login?redirect=${encodeURIComponent(redirectPath || '/')}`)
    },
  })
}

const refreshAccessToken = () => {
  if (!refreshPromise) {
    refreshPromise = withAuthLifecycleLock(async () => {
      const response = await http.post<ApiRes<AccessTokenResp>>('/auth/refresh', undefined, {
        withCredentials: true,
        __skipRefresh: true,
      } as RefreshableRequestConfig)
      const accessToken = response.data?.data?.accessToken
      if (!response.data?.success || !accessToken) {
        throw new Error(response.data?.msg || '刷新登录状态失败，请稍后重试')
      }
      // 同步 Pinia 中供页面展示使用的内存状态；HTTP 请求仍以本模块的单一令牌值为准。
      useUserStore().updateAccessToken(accessToken)
      // 租户功能关闭或后端未返回租户时也要清除旧值，避免下一次开启租户功能后误用旧租户。
      useTenantStore().setTenantId(response.data.data.tenantId)
      authFailureShown = false
      return accessToken
    })
      .finally(() => {
        refreshPromise = null
      })
  }
  return refreshPromise
}

// 刷新失败是否为终态失败：重试不会改变结果，应引导用户重新登录。
const isTerminalRefreshFailure = (error: unknown): boolean => {
  if ((error as AxiosError)?.isAxiosError) {
    // HTTP 层失败中只有 401 表示 Refresh Token 确定失效；403、429、5xx 和
    // 网络故障都可能是暂时性问题，保留 Cookie 供下一次请求继续重试。
    return (error as AxiosError).response?.status === 401
  }
  // 非 Axios 错误来自业务层拒绝（HTTP 200 + success=false，如客户端认证
  // 配置变更），是确定性失败；停留在重试循环只会让用户反复看到请求失败。
  return true
}

// 从一个或多个 axios 错误里取出后端 401/R.fail 的 msg；按顺序优先使用。
const extractInvalidMessage = (...candidates: unknown[]) => {
  for (const candidate of candidates) {
    const data = (candidate as AxiosError<{ msg?: string }>)?.response?.data
    if (data && typeof data.msg === 'string' && data.msg) {
      return data.msg
    }
  }
  return undefined
}

const retryAfterRefresh = async (config: AxiosRequestConfig, error?: unknown) => {
  const retryConfig = config as RefreshableRequestConfig
  if (retryConfig.__skipRefresh || isAuthEndpoint(retryConfig.url)) {
    throw error || new Error('认证请求失败')
  }
  if (retryConfig.__isRetryRequest) {
    const reason = extractInvalidMessage(error)
    await showReLogin(retryConfig.__authGeneration ?? getAuthGeneration(), reason)
    throw error || new Error('登录状态已失效，请重新登录')
  }

  try {
    const accessToken = await refreshAccessToken()
    retryConfig.__isRetryRequest = true
    retryConfig.__authGeneration = getAuthGeneration()
    retryConfig.headers = retryConfig.headers || {}
    retryConfig.headers.Authorization = `Bearer ${accessToken}`
    return http.request(retryConfig)
  } catch (refreshError) {
    if (isTerminalRefreshFailure(refreshError)) {
      // 业务请求的 401 通常带更精确的失效原因（被踢/被顶/会话失效），优先展示。
      const reason = extractInvalidMessage(error, refreshError)
      await showReLogin(retryConfig.__authGeneration ?? getAuthGeneration(), reason)
    }
    throw refreshError
  }
}

const handleError = (msg: string) => {
  if (msg.length >= 15) {
    return notificationErrorWrapper({
      content: msg || '服务器端错误',
      duration: 5 * 1000,
    })
  }
  return messageErrorWrapper({
    content: msg || '服务器端错误',
    duration: 5 * 1000,
  })
}

// 请求拦截器
http.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const refreshableConfig = config as RefreshableRequestConfig
    if (refreshableConfig.__authGeneration === undefined) {
      refreshableConfig.__authGeneration = getAuthGeneration()
    }
    const accessToken = getAccessToken()
    if (!config.headers) {
      config.headers = {}
    }
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }
    const tenantStore = useTenantStore()
    if (!isTenantIndependentAuthEndpoint(config)
      && tenantStore.tenantEnabled && tenantStore.tenantId) {
      config.headers['X-Tenant-Id'] = tenantStore.tenantId
    } else {
      // 重试请求会复用原 headers；认证接口或租户状态变化时必须删除旧租户 ID，
      // 避免刷新/退出时把上一次会话的租户上下文带到服务端。
      delete config.headers['X-Tenant-Id']
    }
    return refreshableConfig
  },
  (error) => Promise.reject(error),
)

// 响应拦截器
http.interceptors.response.use(
  (response: AxiosResponse) => {
    const { data } = response
    const { success, code, msg } = data

    if (response.request.responseType === 'blob') {
      const contentType = data.type
      if (contentType.startsWith('application/json')) {
        const reader = new FileReader()
        reader.readAsText(data)
        reader.onload = () => {
          const { success, msg } = JSON.parse(reader.result as string)
          if (!success) {
            handleError(msg)
          }
        }
        return Promise.reject(msg)
      } else {
        return response
      }
    }

    if (success) {
      if (response.config.url?.endsWith('/auth/login')) {
        authFailureShown = false
      }
      return response
    }

    handleError(msg)
    return Promise.reject(new Error(msg || `请求失败（${code}）`))
  },
  async (error: AxiosError) => {
    if (!error.response) {
      handleError('网络连接失败，请检查您的网络')
      return Promise.reject(error)
    }
    const status = error.response?.status
    if (status === 401) {
      return retryAfterRefresh(error.config, error)
    }
    const errorMsg = StatusCodeMessage[status] || '服务器暂时未响应，请刷新页面并重试。若无法解决，请联系管理员'
    handleError(errorMsg)
    return Promise.reject(error)
  },
)

const request = async <T = unknown>(config: AxiosRequestConfig): Promise<ApiRes<T>> => {
  return http.request<T>(config)
    .then((res: AxiosResponse) => res.data)
    .catch((err: { msg: string }) => Promise.reject(err))
}

const requestNative = async <T = unknown>(config: AxiosRequestConfig): Promise<AxiosResponse> => {
  return http.request<T>(config)
    .then((res: AxiosResponse) => res)
    .catch((err: { msg: string }) => Promise.reject(err))
}

const createRequest = (method: string) => {
  return <T = any>(url: string, params?: object, config?: AxiosRequestConfig): Promise<ApiRes<T>> => {
    return request({
      method,
      url,
      [method === 'get' ? 'params' : 'data']: params,
      ...(method === 'get'
        ? {
            paramsSerializer: (obj) => qs.stringify(obj),
          }
        : {}),
      ...config,
    })
  }
}

const download = (url: string, params?: object, config?: AxiosRequestConfig): Promise<AxiosResponse> => {
  return requestNative({
    method: 'get',
    url,
    responseType: 'blob',
    params,
    paramsSerializer: (obj) => qs.stringify(obj),
    ...config,
  })
}

export default {
  get: createRequest('get'),
  post: createRequest('post'),
  put: createRequest('put'),
  patch: createRequest('patch'),
  del: createRequest('delete'),
  request,
  requestNative,
  download,
}
