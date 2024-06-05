import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { RouteRecordRaw } from 'vue-router'
import { mapTree, toTreeArray } from 'xe-utils'
import { cloneDeep, omit } from 'lodash-es'
import { constantRoutes } from '@/router'
import ParentView from '@/components/ParentView/index.vue'
import { type RouteItem, getUserRoute } from '@/apis'
import { transformPathToName } from '@/utils'

const Layout = () => import('@/layout/index.vue')

// 匹配views里面所有的.vue文件
const modules = import.meta.glob('@/views/**/*.vue')

/** 加载模块 */
export const loadView = (view: string) => {
  let res
  for (const path in modules) {
    const dir = path.split('views/')[1].split('.vue')[0]
    if (dir === view) {
      res = () => modules[path]()
    }
  }
  return res
}

/** 将component由字符串转成真正的模块 */
const transformComponentView = (component: string) => {
  if (component === 'Layout') {
    return Layout as never
  } else if (component === 'ParentView') {
    return ParentView as never
  } else {
    return loadView(component) as never
  }
}

/**
 * @description 前端来做排序、格式化
 * @params {menus} 后端返回的路由数据，已经根据当前用户角色过滤掉了没权限的路由
 * 1. 对后端返回的路由数据进行排序，格式化
 * 2. 同时将component由字符串转成真正的模块
 */
const formatAsyncRoutes = (menus: RouteItem[]) => {
  if (!menus.length) return []
  menus.sort((a, b) => (a?.sort ?? 0) - (b?.sort ?? 0)) // 排序
  const routes = mapTree(menus, (item) => {
    if (item.children && item.children.length) {
      item.children.sort((a, b) => (a?.sort ?? 0) - (b?.sort ?? 0)) // 排序
    }
    return {
      path: item.path,
      name: item.name ?? transformPathToName(item.path),
      component: transformComponentView(item.component),
      redirect: item.redirect,
      meta: {
        title: item.title,
        hidden: item.isHidden,
        keepAlive: item.isCache,
        icon: item.icon
      }
    }
  })
  return routes as RouteRecordRaw[]
}

/** 判断路由层级是否大于 2 */
export const isMultipleRoute = (route: RouteRecordRaw) => {
  const children = route.children
  if (children?.length) {
    // 只要有一个子路由的 children 长度大于 0，就说明是三级及其以上路由
    return children.some((child) => child.children?.length)
  }
  return false
}

/** 路由降级（把三级及其以上的路由转化为二级路由） */
export const flatMultiLevelRoutes = (routes: RouteRecordRaw[]) => {
  const cloneRoutes = cloneDeep(routes)
  cloneRoutes.forEach((route) => {
    if (isMultipleRoute(route)) {
      const flatRoutes = toTreeArray(route.children)
      route.children = flatRoutes.map((i) => omit(i, 'children')) as RouteRecordRaw[]
    }
  })
  return cloneRoutes
}

const storeSetup = () => {
  // 所有路由(常驻路由 + 动态路由)
  const routes = ref<RouteRecordRaw[]>([])
  // 动态路由(异步路由)
  const asyncRoutes = ref<RouteRecordRaw[]>([])

  // 合并路由
  const setRoutes = (data: RouteRecordRaw[]) => {
    routes.value = constantRoutes.concat(data)
    asyncRoutes.value = data
  }

  // 生成路由
  const generateRoutes = (): Promise<RouteRecordRaw[]> => {
    return new Promise((resolve) => {
      // 向后端请求路由数据 这个接口已经根据用户角色过滤了没权限的路由(后端根据用户角色过滤路由显得比较安全些)
      getUserRoute().then((res) => {
        const asyncRoutes = formatAsyncRoutes(res.data)
        setRoutes(asyncRoutes)
        const cloneRoutes = cloneDeep(asyncRoutes)
        const flatRoutes = flatMultiLevelRoutes(cloneRoutes as RouteRecordRaw[])
        resolve(flatRoutes)
      })
    })
  }

  return {
    routes,
    asyncRoutes,
    generateRoutes
  }
}

export const useRouteStore = defineStore('route', storeSetup, { persist: true })
