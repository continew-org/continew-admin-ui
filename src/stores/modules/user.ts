import { defineStore } from 'pinia'
import { computed, reactive, ref } from 'vue'
import { useTenantStore } from './tenant'
import { resetRouter } from '@/router'
import {
  type AccountLoginReq,
  AuthTypeConstants,
  type EmailLoginReq,
  type LoginResp,
  type PhoneLoginReq,
  type UserInfo,
  accountLogin as accountLoginApi,
  emailLogin as emailLoginApi,
  getUserInfo as getUserInfoApi,
  logout as logoutApi,
  phoneLogin as phoneLoginApi,
  refreshToken as refreshTokenApi,
  socialLogin as socialLoginApi,
} from '@/apis'
import {
  clearAccessToken,
  getAccessToken,
  setAccessToken,
} from '@/features/auth-session/access-token'
import { resetHasRouteFlag } from '@/router/guard'
import { withAuthLifecycleLock } from '@/features/auth-session/lifecycle'

const storeSetup = () => {
  const tenantStore = useTenantStore()
  const userInfo = reactive<UserInfo>({
    id: '',
    username: '',
    nickname: '',
    gender: 0,
    email: '',
    phone: '',
    avatar: '',
    pwdResetTime: '',
    pwdExpired: false,
    registrationDate: '',
    deptName: '',
    roles: [],
    roleNames: [],
    permissions: [],
  })
  const nickname = computed(() => userInfo.nickname)
  const username = computed(() => userInfo.username)
  const avatar = computed(() => userInfo.avatar)

  const accessToken = ref(getAccessToken() || '')
  const pwdExpiredShow = ref<boolean>(true)
  const roles = ref<string[]>([]) // 当前用户角色
  const permissions = ref<string[]>([]) // 当前角色权限标识集合
  // 只清理短期 Access Token；Refresh Token 在 HttpOnly Cookie 中，前端脚本无法读取。
  const resetAccessToken = () => {
    accessToken.value = ''
    clearAccessToken()
    resetHasRouteFlag()
  }

  const updateAccessToken = (token: string) => {
    setAccessToken(token)
    accessToken.value = token
  }

  const saveLoginState = (data: LoginResp) => {
    updateAccessToken(data.accessToken)
    tenantStore.setTenantId(data.tenantId)
  }

  // 页面重载后，使用浏览器自动携带的 HttpOnly Cookie 恢复短期 Access Token。
  const restoreSession = async () => {
    if (getAccessToken()) return true
    await withAuthLifecycleLock(async () => {
      if (getAccessToken()) return
      const res = await refreshTokenApi()
      saveLoginState(res.data)
    })
    return true
  }

  // 登录
  const accountLogin = async (req: AccountLoginReq, tenantCode?: string) => {
    await withAuthLifecycleLock(async () => {
      const res = await accountLoginApi({ ...req, clientId: import.meta.env.VITE_CLIENT_ID, authType: AuthTypeConstants.ACCOUNT }, tenantCode)
      saveLoginState(res.data)
    })
  }

  // 邮箱登录
  const emailLogin = async (req: EmailLoginReq, tenantCode?: string) => {
    await withAuthLifecycleLock(async () => {
      const res = await emailLoginApi({ ...req, clientId: import.meta.env.VITE_CLIENT_ID, authType: AuthTypeConstants.EMAIL }, tenantCode)
      saveLoginState(res.data)
    })
  }

  // 手机号登录
  const phoneLogin = async (req: PhoneLoginReq, tenantCode?: string) => {
    await withAuthLifecycleLock(async () => {
      const res = await phoneLoginApi({ ...req, clientId: import.meta.env.VITE_CLIENT_ID, authType: AuthTypeConstants.PHONE }, tenantCode)
      saveLoginState(res.data)
    })
  }

  // 三方账号登录
  const socialLogin = async (source: string, req: any) => {
    await withAuthLifecycleLock(async () => {
      const res: any = await socialLoginApi({ ...req, source, clientId: import.meta.env.VITE_CLIENT_ID, authType: AuthTypeConstants.SOCIAL })
      saveLoginState(res.data)
    })
  }

  // 退出登录回调
  const logoutCallBack = async () => {
    roles.value = []
    permissions.value = []
    pwdExpiredShow.value = true
    resetAccessToken()
    resetRouter()
    tenantStore.resetTenantId()
  }

  // 退出登录
  const logout = async () => {
    await withAuthLifecycleLock(async () => {
      await logoutApi()
      await logoutCallBack()
    })
    return true
  }

  // 获取用户信息
  const getInfo = async () => {
    const res = await getUserInfoApi()
    Object.assign(userInfo, res.data)
    userInfo.avatar = res.data.avatar
    if (res.data.roles && res.data.roles.length) {
      roles.value = res.data.roles
      permissions.value = res.data.permissions
    }
  }

  return {
    userInfo,
    nickname,
    username,
    avatar,
    accessToken,
    roles,
    permissions,
    pwdExpiredShow,
    accountLogin,
    emailLogin,
    phoneLogin,
    socialLogin,
    logout,
    logoutCallBack,
    getInfo,
    resetAccessToken,
    restoreSession,
    updateAccessToken,
  }
}

export const useUserStore = defineStore('user', storeSetup, {
  persist: { paths: ['roles', 'permissions', 'pwdExpiredShow'], storage: localStorage },
})
