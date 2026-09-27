// Access Token 只保存在当前页面进程内，避免 XSS 后长期凭证从 localStorage 被直接读取。
// 页面重载后的登录态由 HttpOnly Refresh Token Cookie 恢复。
let accessToken: string | null = null
let authGeneration = 0
const accessTokenEvents = new EventTarget()
const ACCESS_TOKEN_CHANGE_EVENT = 'change'

const isLogin = () => {
  return !!accessToken
}

const getAccessToken = () => {
  return accessToken
}

/** 当前认证代次；每次 Access Token 变更都会递增，用于忽略迟到的认证失败响应。 */
const getAuthGeneration = () => {
  return authGeneration
}

const setAccessToken = (value: string) => {
  if (accessToken !== value) {
    authGeneration += 1
  }
  accessToken = value
  accessTokenEvents.dispatchEvent(new CustomEvent(ACCESS_TOKEN_CHANGE_EVENT, { detail: value }))
}

const clearAccessToken = () => {
  if (accessToken !== null) {
    authGeneration += 1
  }
  accessToken = null
  accessTokenEvents.dispatchEvent(new CustomEvent(ACCESS_TOKEN_CHANGE_EVENT, { detail: null }))
}

const onAccessTokenChange = (listener: (token: string | null) => void) => {
  const handler = (event: Event) => listener((event as CustomEvent<string | null>).detail)
  accessTokenEvents.addEventListener(ACCESS_TOKEN_CHANGE_EVENT, handler)
  return () => accessTokenEvents.removeEventListener(ACCESS_TOKEN_CHANGE_EVENT, handler)
}

/**
 * 读取 Access Token 绑定的登录会话 ID（JWT 中的 sid 声明）。
 *
 * 仅用于前端展示判断（例如在线用户列表禁用“强退自己”），不作为任何鉴权依据，
 * 服务端仍然独立校验操作人。令牌本身不可信时返回 undefined。
 */
const getSessionId = (): string | undefined => {
  if (!accessToken) return undefined
  const payload = accessToken.split('.')[1]
  if (!payload) return undefined
  try {
    const base64 = payload.replace(/-/g, '+').replace(/_/g, '/')
    // 只按 ASCII 模式匹配 sid，避免解码载荷中可能存在的非 UTF-8 字节。
    return atob(base64).match(/"sid"\s*:\s*"([^"]+)"/)?.[1]
  } catch {
    return undefined
  }
}

export {
  isLogin,
  getAccessToken,
  getAuthGeneration,
  getSessionId,
  setAccessToken,
  clearAccessToken,
  onAccessTokenChange,
}
