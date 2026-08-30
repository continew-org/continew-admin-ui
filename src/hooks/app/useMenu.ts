import { ref } from 'vue'
import type { TreeNodeData } from '@arco-design/web-vue'
import { listMenuDictTree } from '@/apis/system'
import { listTenantPackageMenu } from '@/apis/tenant/package'

/** 菜单模块 */
export function useMenu(options?: { onSuccess?: () => void }) {
  const loading = ref(false)
  const menuList = ref<TreeNodeData[]>([])

  const getMenuList = async (name?: string) => {
    try {
      loading.value = true
      const res = await listMenuDictTree({ description: name })
      menuList.value = res.data
      options?.onSuccess?.()
    } finally {
      loading.value = false
    }
  }

  // 获取租户套餐菜单
  const getTenantPackageMenuList = async () => {
    try {
      loading.value = true
      const res = await listTenantPackageMenu()
      menuList.value = res.data
      options?.onSuccess?.()
    } finally {
      loading.value = false
    }
  }

  return { menuList, getMenuList, loading, getTenantPackageMenuList }
}
