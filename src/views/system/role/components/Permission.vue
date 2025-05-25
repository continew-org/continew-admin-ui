<template>
  <GiTable
    ref="tableRef"
    row-key="id"
    :data="tableData"
    :columns="columns"
    :loading="loading"
    :scroll="{ x: '100%', y: '100%', minWidth: 1000 }"
    :pagination="false"
    :disabled-tools="['fullscreen', 'size', 'setting']"
    :row-selection="{ type: 'checkbox', showCheckedAll, selectRowKeys: selectedKeys }"
    @select="select"
    @select-all="selectAll"
    @refresh="refresh"
  >
    <template #toolbar-left>
      <a-button v-permission="['system:role:updatePermission']" type="primary" :disabled="disabled" @click="save">
        <template #icon><icon-save /></template>保存权限
      </a-button>
    </template>
    <template #toolbar-right>
      <a-radio-group v-model="isCascade" type="button" :disabled="disabled">
        <a-radio :value="true">节点关联</a-radio>
        <a-radio :value="false">节点独立</a-radio>
      </a-radio-group>
      <a-button @click="onExpanded">
        <template #icon>
          <icon-list v-if="isExpanded" />
          <icon-mind-mapping v-else />
        </template>
        <template #default>
          <span v-if="!isExpanded">展开</span>
          <span v-else>折叠</span>
        </template>
      </a-button>
    </template>
    <template #expand-icon="{ expanded }">
      <IconDown v-if="expanded" />
      <IconRight v-else />
    </template>
    <template #title="{ record }">
      <GiSvgIcon :name="record.icon" :size="15" />
      <span style="margin-left: 5px; vertical-align: middle">{{ record.title }}</span>
    </template>
    <template #permissions="{ record }">
      <div v-if="record.permissions && record.permissions.length > 0">
        <a-checkbox-group v-model="record.checkedPermissions" :disabled="disabled" @change="selectPermission(record)">
          <a-checkbox v-for="permission in record.permissions" :key="permission.id" :value="permission.id">
            {{ permission.title }}
          </a-checkbox>
        </a-checkbox-group>
      </div>
    </template>
  </GiTable>
</template>

<script setup lang="ts">
import { nextTick, ref } from 'vue'
import { Message, type TableInstance } from '@arco-design/web-vue'
import { type MenuResp, listMenu } from '@/apis/system/menu'
import { isMobile } from '@/utils'
import type GiTable from '@/components/GiTable/index.vue'
import { useTable } from '@/hooks'
import { getRole, updateRolePermission } from '@/apis'
import has from '@/utils/has'

const props = withDefaults(defineProps<Props>(), {
  roleId: '',
})

interface Props {
  roleId: string
}

const tableRef = ref<InstanceType<typeof GiTable>>()
// 是否父子联动
const isCascade = ref(true)
const isExpanded = ref(true)
// 是否禁用
const disabled = ref(false)

// 展开/折叠
const onExpanded = () => {
  isExpanded.value = !isExpanded.value
  tableRef.value?.tableRef?.expandAll(isExpanded.value)
}

/**
 * 递归处理菜单数据，并进行类型转换
 *
 * @param menus 菜单数据
 */
const transformMenu = (menus: MenuResp[]) => {
  return menus.map((item) => {
    // 如果当前项有子项，递归处理子项
    if (item.children && item.children.length > 0) {
      // 过滤出 type 为 3 的按钮权限
      const permissions = item.children.filter((child) => child.type === 3 || child.permission).map((child) => ({
        id: child.id,
        title: child.title,
        parentId: child.parentId,
        permission: child.permission,
      }))

      // 过滤出 type 不为 3 的子项
      item.children = item.children.filter((child) => child.type !== 3 && !child.permission)

      // 如果有权限，将其添加到当前项的 permissions 属性中
      if (permissions.length > 0) {
        item.permissions = permissions
        item.checkedPermissions = permissions.filter((permission) => permission.isChecked)
      }

      // 递归处理剩余的子项
      item.children = transformMenu(item.children)

      // 如果 children 为空数组，移除 children 属性
      if (item.children.length === 0) {
        delete item.children
      }
    }

    return item
  })
}

// 更新表格数据的选中状态
const updateTableDataCheckedStatus = (data: MenuResp[], selectedKeys: (string | number)[]) => {
  data.forEach((item) => {
    item.disabled = disabled.value
    // 设置菜单项的选中状态
    item.isChecked = selectedKeys.includes(item.id)
    // 设置权限的选中状态
    if (item.permissions) {
      item.checkedPermissions = item.permissions
        .filter((permission) => selectedKeys.includes(permission.id))
        .map((permission) => permission.id)
    }
    // 递归处理子菜单
    if (item.children) {
      updateTableDataCheckedStatus(item.children, selectedKeys)
    }
  })
}

const selectedKeys = ref<Set<string | number>>(new Set())

const {
  tableData,
  loading,
  search,
} = useTable(() => listMenu(), {
  immediate: true,
  formatResult(data) {
    return transformMenu(data)
  },
  onSuccess: () => {
    nextTick(() => {
      tableRef.value?.tableRef?.expandAll(true)
    })
    // 初始加载时应用已选中的权限
    if (selectedKeys.value.size > 0) {
      updateTableDataCheckedStatus(tableData.value, Array.from(selectedKeys.value))
    }
  },
})

const columns: TableInstance['columns'] = [
  { title: '菜单', dataIndex: 'title', slotName: 'title', width: 170, fixed: !isMobile() ? 'left' : undefined },
  { title: '权限', dataIndex: 'permissions', slotName: 'permissions' },
]

// 级联选中子项
const cascadeSelectChild = (record: MenuResp, isCascade: boolean) => {
  if (isCascade && record.children && record.children.length > 0) {
    record.children.forEach((child) => {
      child.isChecked = record.isChecked
      tableRef.value?.tableRef?.select(child.id, child.isChecked)
      child.isChecked
        ? selectedKeys.value.add(child.id)
        : selectedKeys.value.delete(child.id)
      if ((child.children && child.children.length > 0) || (child.permissions && child.permissions.length > 0)) {
        cascadeSelectChild(child, isCascade)
      }
    })
  }
  // 递归选中权限
  if (isCascade && record.permissions && record.permissions.length > 0) {
    record.permissions.forEach((permission) => {
      permission.isChecked = record.isChecked
      permission.isChecked
        ? selectedKeys.value.add(permission.id)
        : selectedKeys.value.delete(permission.id)
    })
    record.checkedPermissions = record.permissions.filter((permission) => permission.isChecked).map((permission) => permission.id)
  }
}

// 查找指定菜单
const findItem = (id: string, data: MenuResp[]) => {
  for (const item of data) {
    if (item.id === id) return item
    if (item.children?.length) {
      const found = findItem(id, item.children)
      if (found) return found
    }
  }
  return null
}

// 级联选中父项目
const cascadeSelectParent = (record: MenuResp, isCascade: boolean) => {
  if (isCascade && record.parentId && record.parentId !== '0') {
    const parent = findItem(record.parentId, tableData.value)
    if (parent) {
      // 如果父项目的某个子项被选中了，它就依然保持选中状态
      parent.isChecked = parent.children?.some((child) => child.isChecked)
      tableRef.value?.tableRef?.select(parent.id, parent.isChecked)
      if (!parent.isChecked && !record.isChecked) {
        selectedKeys.value.delete(parent.id)
      } else {
        selectedKeys.value.add(parent.id)
      }
      if (parent.parentId && parent.parentId !== 0) {
        cascadeSelectParent(parent, isCascade)
      }
    }
  }
}

// 选中
const select: TableInstance['onSelect'] = (rowKeys, checked, record) => {
  const isChecked = rowKeys.includes(checked)
  isChecked
    ? selectedKeys.value.add(record.id)
    : selectedKeys.value.delete(record.id)
  record.isChecked = isChecked
  // 级联选中子项
  cascadeSelectChild(record, isCascade.value)
  // 级联选中父项
  cascadeSelectParent(record, isCascade.value)
}

// 全选
const selectAll: TableInstance['onSelectAll'] = (checked) => {
  tableData.value.forEach((item) => {
    item.isChecked = checked
    checked
        ? selectedKeys.value.add(item.id)
        : selectedKeys.value.delete(item.id)
    cascadeSelectChild(item, true)
  })
}

// 选中权限
const selectPermission = (record) => {
  const checkPermissions = record.checkedPermissions
  // 取消选中
  if (checkPermissions.length === 0) {
    if (isCascade.value) {
      record.isChecked = false
      selectedKeys.value.delete(record.id)
      tableRef.value?.tableRef?.select(record.id, record.isChecked)
      cascadeSelectParent(record, isCascade.value)
    }
    record.permissions.forEach((permission) => {
      permission.isChecked = false
      selectedKeys.value.delete(permission.id)
    })
    return
  }
  // 选中
  if (checkPermissions.length > 0) {
    if (isCascade.value) {
      record.isChecked = true
      selectedKeys.value.add(record.id)
      tableRef.value?.tableRef?.select(record.id, record.isChecked)
      cascadeSelectParent(record, isCascade.value)
    }
    record.permissions.forEach((permission) => {
      permission.isChecked = checkPermissions.includes(permission.id)
      permission.isChecked
        ? selectedKeys.value.add(permission.id)
        : selectedKeys.value.delete(permission.id)
    })
  }
}

// 保存
const save = async () => {
  await updateRolePermission(props.roleId, {
    menuIds: Array.from(selectedKeys.value),
    menuCheckStrictly: isCascade.value,
  })
  Message.success('保存成功')
}

const showCheckedAll = ref(true)
// 加载角色详情
const fetchRole = async (id: string) => {
  try {
    loading.value = true
    disabled.value = !has.hasPermOr(['system:role:updatePermission'])
    // 查询角色详情
    const { data } = await getRole(id)
    if (!disabled.value) {
      disabled.value = data.isSystem && data.code === 'admin'
    }
    isCascade.value = data.menuCheckStrictly
    // 更新选中键集合
    selectedKeys.value = new Set(data.menuIds)
    // 更新表格数据的选中状态
    updateTableDataCheckedStatus(tableData.value, data.menuIds)
    // 手动设置表格行的选中状态，确保组件响应
    await nextTick(() => {
      tableRef.value?.tableRef?.selectAll(false)
      tableRef.value?.tableRef?.select(data.menuIds, true)
      showCheckedAll.value = !disabled.value
    })
  } finally {
    loading.value = false
  }
}

// 刷新
const refresh = () => {
  search()
  fetchRole(props.roleId)
}

// 监听 roleId 的变化
watch(
  () => props.roleId,
  async (newRoleId) => {
    if (newRoleId) {
      await fetchRole(newRoleId)
    }
  },
  { immediate: true },
)
</script>

<style scoped lang="scss"></style>
