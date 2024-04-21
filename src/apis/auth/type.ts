/** 用户类型 */
export interface UserInfo {
  id: string
  username: string
  nickname: string
  gender: 0 | 1 | 2
  email: string
  phone: string
  avatar: string
  pwdResetTime: string
  registrationDate: string
  deptName: string
  roles: string[]
  permissions: string[]
}

/** 路由类型 */
export interface RouteItem {
  id: string
  title: string
  parentId: string
  type: 1 | 2 | 3
  path: string
  name: string
  component: string
  redirect: string
  icon: string
  isExternal: boolean
  isHidden: boolean
  isCache: boolean
  permission: string
  roles: string[]
  sort: number
  status: 0 | 1
  children: RouteItem[]
  activeMenu: string
  alwaysShow: boolean
  breadcrumb: boolean
  showInTabs: boolean
  affix: boolean
}

export interface AccountLoginReq {
  username: string
  password: string
  captcha: string
  uuid: string
}

// 登录响应类型
export interface LoginResp {
  token: string
}

// 第三方登录授权类型
export interface SocialAuthAuthorizeResp {
  authorizeUrl: string
}
