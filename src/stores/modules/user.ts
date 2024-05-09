import { defineStore } from 'pinia'
import { ref, reactive, computed } from 'vue'
import { resetRouter } from '@/router'
import {
  accountLogin as accountLoginApi,
  phoneLogin as phoneLoginApi,
  emailLogin as emailLoginApi,
  socialLogin as socialLoginApi,
  logout as logoutApi,
  getUserInfo as getUserInfoApi,
  type AccountLoginReq,
  type PhoneLoginReq,
  type EmailLoginReq,
  type UserInfo
} from '@/apis'
import { setToken, clearToken, getToken } from '@/utils/auth'
import { resetHasRouteFlag } from '@/router/permission'
import getAvatar from '@/utils/avatar'

const storeSetup = () => {
  const userInfo = reactive<UserInfo>({
    id: '',
    username: '',
    nickname: '',
    gender: 0,
    email: '',
    phone: '',
    avatar: '',
    pwdResetTime: '',
    passwordExpired: false,
    registrationDate: '',
    deptName: '',
    roles: [],
    permissions: []
  })
  const name = computed(() => userInfo.nickname)
  const avatar = computed(() => userInfo.avatar)

  const token = ref(getToken() || '')
  const passwordExpiredShow = ref<boolean>(true)
  const roles = ref<string[]>([]) // 当前用户角色
  const permissions = ref<string[]>([]) // 当前角色权限标识集合

  // 重置token
  const resetToken = () => {
    token.value = ''
    clearToken()
    resetHasRouteFlag()
  }

  // 登录
  const accountLogin = async (req: AccountLoginReq) => {
    const res = await accountLoginApi(req)
    setToken(res.data.token)
    token.value = res.data.token
  }

  // 邮箱登录
  const emailLogin = async (req: EmailLoginReq) => {
    const res = await emailLoginApi(req)
    setToken(res.data.token)
    token.value = res.data.token
  }

  // 手机号登录
  const phoneLogin = async (req: PhoneLoginReq) => {
    const res = await phoneLoginApi(req)
    setToken(res.data.token)
    token.value = res.data.token
  }

  // 三方账号登录
  const socialLogin = async (source: string, req: any) => {
    const res = await socialLoginApi(source, req)
    setToken(res.data.token)
    token.value = res.data.token
  }

  // 退出登录
  const logout = async () => {
    try {
      await logoutApi()
      await logoutCallBack()
      return true
    } catch (error) {
      return false
    }
  }

  // 退出登录回调
  const logoutCallBack = async () => {
    roles.value = []
    permissions.value = []
    passwordExpiredShow.value = true
    resetToken()
    resetRouter()
  }

  // 获取用户信息
  const getInfo = async () => {
    const res = await getUserInfoApi()
    Object.assign(userInfo, res.data)
    userInfo.avatar = getAvatar(res.data.avatar, res.data.gender)
    if (res.data.roles && res.data.roles.length) {
      roles.value = res.data.roles
      permissions.value = res.data.permissions
    }
  }

  return {
    userInfo,
    name,
    avatar,
    token,
    roles,
    permissions,
    passwordExpiredShow,
    accountLogin,
    emailLogin,
    phoneLogin,
    socialLogin,
    logout,
    logoutCallBack,
    getInfo,
    resetToken
  }
}

export const useUserStore = defineStore('user', storeSetup, {
  persist: { paths: ['token', 'roles', 'permissions', 'passwordExpiredShow'], storage: localStorage }
})
