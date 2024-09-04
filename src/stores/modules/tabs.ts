import { defineStore } from 'pinia'
import { ref } from 'vue'
import { type RouteLocationNormalized, type RouteRecordName, useRouter } from 'vue-router'
import _XEUtils_ from 'xe-utils'
import { useRouteStore } from '@/stores'

const storeSetup = () => {
  const router = useRouter()
  const tabList = ref<RouteLocationNormalized[]>([]) // 保存页签tab的数组
  const cacheList = ref<RouteRecordName[]>([]) // keep-alive缓存的数组，元素是组件名

  // 添加一个页签, 如果当前路由已经打开, 则不再重复添加
  const addTabItem = (item: RouteLocationNormalized) => {
    const index = tabList.value.findIndex((i) => i.path === item.path)
    if (index >= 0) {
      tabList.value[index].fullPath !== item.fullPath && (tabList.value[index] = item)
    } else {
      if (item.meta?.showInTabs ?? true) {
        tabList.value.push(item)
      }
    }
  }

  // 删除一个页签
  const deleteTabItem = (path: string) => {
    const index = tabList.value.findIndex((item) => item.path === path && !item.meta?.affix)
    if (index < 0) return
    const isActive = router.currentRoute.value.path === tabList.value[index].path
    tabList.value.splice(index, 1)
    if (isActive) {
      router.push(tabList.value[tabList.value.length - 1].fullPath)
    }
  }

  // 清空页签
  const clearTabList = () => {
    const routeStore = useRouteStore()
    const arr: RouteLocationNormalized[] = []
    _XEUtils_.eachTree(routeStore.routes, (item) => {
      if (item.meta?.affix ?? false) {
        arr.push(item as unknown as RouteLocationNormalized)
      }
    })
    tabList.value = arr
  }

  // 添加缓存页
  const addCacheItem = (item: RouteLocationNormalized) => {
    if (!item.name) return
    if (cacheList.value.includes(item.name)) return
    if (item.meta?.keepAlive) {
      cacheList.value.push(item.name)
    }
  }

  // 删除一个缓存页
  const deleteCacheItem = (name: RouteRecordName) => {
    const index = cacheList.value.findIndex((i) => i === name)
    if (index >= 0) {
      cacheList.value.splice(index, 1)
    }
  }

  // 清空缓存页
  const clearCacheList = () => {
    cacheList.value = []
  }

  // 关闭当前
  const closeCurrent = (path: string) => {
    const item = tabList.value.find((i) => i.path === path)
    item?.name && deleteCacheItem(item.name)
    deleteTabItem(path)
  }

  // 关闭其他
  const closeOther = (path: string) => {
    const arr = tabList.value.filter((i) => i.path !== path)
    arr.forEach((item) => {
      deleteTabItem(item.path)
      item?.name && deleteCacheItem(item.name)
    })
  }

  // 关闭右侧
  const closeRight = (path: string) => {
    const index = tabList.value.findIndex((i) => i.path === path)
    if (index < 0) return
    const arr = tabList.value.filter((i, n) => n > index)
    arr.forEach((item) => {
      deleteTabItem(item.path)
      item?.name && deleteCacheItem(item.name)
    })
  }

  // 关闭全部
  const closeAll = () => {
    clearTabList()
    clearCacheList()
    router.push({ path: '/' })
  }

  // 重置
  const reset = () => {
    clearTabList()
    clearCacheList()
  }

  // 初始化
  const init = () => {
    if (tabList.value.some((i) => !i?.meta.affix)) return
    reset()
  }

  return {
    tabList,
    cacheList,
    addTabItem,
    deleteTabItem,
    clearTabList,
    addCacheItem,
    deleteCacheItem,
    clearCacheList,
    closeCurrent,
    closeOther,
    closeRight,
    closeAll,
    reset,
    init
  }
}

export const useTabsStore = defineStore('tabs', storeSetup, { persist: { storage: sessionStorage } })
