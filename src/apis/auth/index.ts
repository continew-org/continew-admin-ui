import type * as T from './type'
import http from '@/utils/http'

export type * from './type'

const BASE_URL = '/auth'

const login = (req: T.AccountLoginReq | T.PhoneLoginReq | T.EmailLoginReq, tenantCode?: string) => {
  const headers = {}
  if (tenantCode) {
    headers['X-Tenant-Code'] = tenantCode
  }
  return http.post<T.LoginResp>(`${BASE_URL}/login`, req, {
    headers,
  })
}

/** @desc 账号登录 */
export function accountLogin(req: T.AccountLoginReq, tenantCode?: string) {
  return login(req, tenantCode)
}

/** @desc 邮箱登录 */
export function emailLogin(req: T.EmailLoginReq, tenantCode?: string) {
  return login(req, tenantCode)
}

/** @desc 手机号登录 */
export function phoneLogin(req: T.PhoneLoginReq, tenantCode?: string) {
  return login(req, tenantCode)
}

/** @desc 三方账号登录 */
export function socialLogin(req: any) {
  return http.post<T.LoginResp>(`${BASE_URL}/login`, req)
}

/** @desc 使用 HttpOnly Cookie 中的 Refresh Token 换取新的 Access Token */
export function refreshToken() {
  return http.post<T.LoginResp>(`${BASE_URL}/refresh`, undefined, {
    withCredentials: true,
  })
}

/** @desc 三方账号登录授权 */
export function socialAuth(source: string) {
  return http.get<T.SocialAuthAuthorizeResp>(`${BASE_URL}/${source}`)
}

/** @desc 退出登录 */
export function logout() {
  return http.post(`${BASE_URL}/logout`)
}

/** @desc 获取用户信息 */
export const getUserInfo = () => {
  return http.get<T.UserInfo>(`${BASE_URL}/user/info`)
}

/** @desc 获取路由信息 */
export const getUserRoute = () => {
  return http.get<T.RouteItem[]>(`${BASE_URL}/user/route`)
}
