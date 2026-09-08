import { Button, Message, Notification, Space } from '@arco-design/web-vue'
import NProgress from 'nprogress'
import type { Router } from 'vue-router'
import { useRouteStore, useUserStore } from '@/stores'
import { getAccessToken } from '@/features/auth-session/access-token'
import { isHttp } from '@/utils/validate'
import 'nprogress/nprogress.css'
import { setRouteEmitter } from '@/hooks'

NProgress.configure({
  easing: 'ease', // 动画方式
  speed: 500, // 递增进度条的速度
  showSpinner: false, // 是否显示圆圈加载
  trickleSpeed: 200, // 自动递增间隔
  minimum: 0.3, // 初始化时的最小百分比
})

// 版本更新
let versionTag: string | null = null // 版本标识
// 更新
const onUpdateSystem = (id: string) => {
  Notification.remove(id)
  window.location.reload()
}
// 关闭更新弹窗
const onCloseUpdateSystem = (id: string) => {
  Notification.remove(id)
}
// 提示用户更新弹窗
const handleNotification = () => {
  const id = `updateModel`
  Notification.info({
    id,
    title: '新版本更新',
    content: '当前系统检测到有新的版本，请及时更新',
    duration: 0,
    closable: true,
    position: 'bottomRight',
    footer: () => {
      return h(Space, {}, () => [h(Button, {
        type: 'primary',
        onClick: () => onUpdateSystem(id),
      }, '更新'), h(Button, { type: 'secondary', onClick: () => onCloseUpdateSystem(id) }, '关闭')])
    },
  })
}

/**
 * 获取首页的 ETag 或 Last-Modified 值，作为当前版本标识
 * @returns {Promise<string|null>} 返回 ETag 或 Last-Modified 值
 */
const getVersionTag = async () => {
  const response = await fetch('/', {
    cache: 'no-cache',
  })
  return response.headers.get('etag') || response.headers.get('last-modified')
}

/**
 * 比较当前的 ETag 或 Last-Modified 值与最新获取的值
 */
const compareTag = async () => {
  const newVersionTag = await getVersionTag()
  if (versionTag === null) {
    versionTag = newVersionTag
  } else if (versionTag !== newVersionTag) {
    // 如果 ETag 或 Last-Modified 发生变化，则认为有更新
    // 提示用户更新
    handleNotification()
  }
}

/** 免登录白名单 */
const whiteList = ['/login', '/social/callback', '/pwdExpired']

/** 是否已经生成过路由表 */
let hasRouteFlag = false
let sessionRestoreAttempted = false
let sessionRestorePromise: null | Promise<boolean> = null
export const resetHasRouteFlag = () => {
  hasRouteFlag = false
}

const restoreSessionOnce = (userStore: ReturnType<typeof useUserStore>) => {
  if (sessionRestorePromise) return sessionRestorePromise
  if (getAccessToken()) return Promise.resolve(true)
  if (sessionRestoreAttempted) return Promise.resolve(false)
  sessionRestoreAttempted = true
  sessionRestorePromise = userStore.restoreSession()
    .catch((error: unknown) => {
      const status = (error as { response?: { status?: number } })?.response?.status
      // 只有明确 401 才记住“本次页面已确认无会话”。限流、网络和服务端
      // 临时故障不删除 Cookie，并允许后续进入受保护页面时重新恢复。
      if (status !== 401) {
        sessionRestoreAttempted = false
      }
      return false
    })
    .finally(() => {
      sessionRestorePromise = null
    })
  return sessionRestorePromise
}

/** 初始化路由守卫 */
export const setupRouterGuard = (router: Router) => {
  router.beforeEach(async (to, from, next) => {
    NProgress.start()
    const userStore = useUserStore()
    const routeStore = useRouteStore()
    // Access Token 不持久化。首次进入受保护页面时必须先尝试用 HttpOnly Cookie 恢复，
    // 再决定是否跳转登录页，避免浏览器刷新页面后误判为未登录。
    if (!getAccessToken() && !whiteList.includes(to.path)) {
      await restoreSessionOnce(userStore)
    }
    // 判断该用户是否登录
    if (getAccessToken()) {
      if (to.path === '/login') {
        // 如果已经登录，并准备进入 Login 页面，则重定向到主页
        next('/')
      } else {
        if (!hasRouteFlag) {
          try {
            await userStore.getInfo()
            if (userStore.userInfo.pwdExpired && to.path !== '/pwdExpired') {
              Message.warning('密码已过期，请修改密码')
              next('/pwdExpired')
            }
            const accessRoutes = await routeStore.generateRoutes()
            accessRoutes.forEach((route) => {
              if (!isHttp(route.path)) {
                router.addRoute(route) // 动态添加可访问路由表
              }
            })
            hasRouteFlag = true
            // 确保添加路由已完成
            // 设置 replace: true, 因此导航将不会留下历史记录
            next({ ...to, replace: true })
          } catch (error: any) {
            // 过程中发生任何错误，都直接重置 Token，并重定向到登录页面
            await userStore.logoutCallBack()
            next(`/login?redirect=${encodeURIComponent(to.fullPath)}`)
          }
        } else {
          next()
        }
      }
    } else {
      // 如果没有 Token
      if (whiteList.includes(to.path)) {
        // 如果在免登录的白名单中，则直接进入
        next()
      } else {
        // 其他没有访问权限的页面将被重定向到登录页面
        next(`/login?redirect=${encodeURIComponent(to.fullPath)}`)
      }
    }

    // 生产环境开启检测版本更新
    const isProd = import.meta.env.PROD
    if (isProd) {
      await compareTag()
    }
  })

  router.onError(() => {
    NProgress.done()
  })

  router.afterEach(() => {
    NProgress.done()
  })
}
/**
 * 设置页面路由守卫
 * @description 处理路由变化时的页面级操作，如路由变化事件通知
 * @param router - Vue Router 实例
 */
export const setupPageGuard = (router: Router) => {
  router.beforeEach((to, from) => {
    // 触发路由变化事件，通知所有监听器
    setRouteEmitter(to, from)
  })
}
