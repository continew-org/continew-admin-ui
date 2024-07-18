<template>
  <a-drawer
    v-model:visible="visible"
    :title="title"
    :mask-closable="false"
    :esc-to-close="false"
    :width="width >= 600 ? 600 : '100%'"
    @before-ok="save"
    @close="reset"
  >
    <a-form ref="formRef" :model="form" :rules="rules" size="large" auto-label-width>
      <a-alert v-if="!form.disabled" type="warning" style="margin-bottom: 15px">
        变更功能权限或数据权限后，关联在线用户会自动下线！
      </a-alert>
      <fieldset>
        <legend>基础信息</legend>
        <a-form-item label="名称" field="name">
          <a-input v-model.trim="form.name" placeholder="请输入名称" />
        </a-form-item>
        <a-form-item label="编码" field="code">
          <a-input v-model.trim="form.code" placeholder="请输入编码" :disabled="isUpdate" />
        </a-form-item>
        <a-form-item label="排序" field="sort">
          <a-input-number v-model="form.sort" placeholder="请输入排序" :min="1" mode="button" />
        </a-form-item>
        <a-form-item label="描述" field="description">
          <a-textarea
            v-model.trim="form.description"
            placeholder="请输入描述"
            show-word-limit
            :max-length="200"
            :auto-size="{ minRows: 3, maxRows: 5 }"
          />
        </a-form-item>
      </fieldset>
      <fieldset>
        <legend>功能权限</legend>
        <a-form-item hide-label :disabled="form.isSystem">
          <a-space>
            <a-checkbox v-model="isMenuExpanded" @change="onExpanded('menu')">展开/折叠</a-checkbox>
            <a-checkbox v-model="isMenuCheckAll" @change="onCheckAll('menu')">全选/全不选</a-checkbox>
            <a-checkbox v-model="isMenuCheckStrictly">父子联动</a-checkbox>
          </a-space>
          <template #extra>
            <a-tree
              ref="menuTreeRef"
              v-model:checked-keys="form.menuIds"
              :data="menuList"
              :default-expand-all="isMenuExpanded"
              :check-strictly="!isMenuCheckStrictly"
              checkable
            />
          </template>
        </a-form-item>
      </fieldset>
      <fieldset>
        <legend>数据权限</legend>
        <a-form-item hide-label field="dataScope">
          <a-select
            v-model.trim="form.dataScope"
            :options="data_scope_enum"
            placeholder="请选择数据权限"
            :disabled="form.isSystem"
          />
        </a-form-item>
        <a-form-item v-if="form.dataScope === 5" hide-label :disabled="form.isSystem">
          <a-space>
            <a-checkbox v-model="isDeptExpanded" @change="onExpanded('dept')">展开/折叠</a-checkbox>
            <a-checkbox v-model="isDeptCheckAll" @change="onCheckAll('dept')">全选/全不选</a-checkbox>
            <a-checkbox v-model="isDeptCheckStrictly">父子联动</a-checkbox>
          </a-space>
          <template #extra>
            <a-tree
              ref="deptTreeRef"
              v-model:checked-keys="form.deptIds"
              :data="deptList"
              :default-expand-all="isDeptExpanded"
              :check-strictly="!isDeptCheckStrictly"
              checkable
            />
          </template>
        </a-form-item>
      </fieldset>
    </a-form>
  </a-drawer>
</template>

<script setup lang="ts">
import { type FormInstance, Message, type TreeNodeData } from '@arco-design/web-vue'
import { useWindowSize } from '@vueuse/core'
import { addRole, getRole, updateRole } from '@/apis'
import { useForm } from '@/hooks'
import { useDept, useDict, useMenu } from '@/hooks/app'

const emit = defineEmits<{
  (e: 'save-success'): void
}>()
const { width } = useWindowSize()
const { data_scope_enum } = useDict('data_scope_enum')
const { deptList, getDeptList } = useDept()
const { menuList, getMenuList } = useMenu()

const dataId = ref('')
const isUpdate = computed(() => !!dataId.value)
const title = computed(() => (isUpdate.value ? '修改角色' : '新增角色'))
const formRef = ref<FormInstance>()

const rules: FormInstance['rules'] = {
  name: [{ required: true, message: '请输入名称' }],
  code: [{ required: true, message: '请输入编码' }],
  dataScope: [{ required: true, message: '请选择数据权限' }]
}

const { form, resetForm } = useForm({
  sort: 999,
  dataScope: 4
})

const menuTreeRef = ref()
const deptTreeRef = ref()
const isMenuExpanded = ref(false)
const isDeptExpanded = ref(true)
const isMenuCheckAll = ref(false)
const isDeptCheckAll = ref(false)
const isMenuCheckStrictly = ref(true)
const isDeptCheckStrictly = ref(true)
// 重置
const reset = () => {
  isMenuExpanded.value = false
  isMenuCheckAll.value = false
  isDeptExpanded.value = true
  isDeptCheckAll.value = false
  menuTreeRef.value?.expandAll(isMenuExpanded.value)
  deptTreeRef.value?.expandAll(isDeptExpanded.value)
  formRef.value?.resetFields()
  resetForm()
}

const visible = ref(false)
// 新增
const onAdd = () => {
  if (!menuList.value.length) {
    getMenuList()
  }
  reset()
  isMenuCheckStrictly.value = true
  isDeptCheckStrictly.value = true
  dataId.value = ''
  visible.value = true
  if (!deptList.value.length) {
    getDeptList()
  }
}

// 修改
const onUpdate = async (id: string) => {
  if (!menuList.value.length) {
    await getMenuList()
  }
  if (!deptList.value.length) {
    await getDeptList()
  }
  reset()
  isMenuCheckStrictly.value = false
  isDeptCheckStrictly.value = false
  dataId.value = id
  const res = await getRole(id)
  Object.assign(form, res.data)
  visible.value = true
}

// 获取所有选中的菜单
const getMenuAllCheckedKeys = () => {
  // 获取目前被选中的菜单
  const checkedNodes = menuTreeRef.value?.getCheckedNodes()
  const checkedKeys = checkedNodes.map((item: TreeNodeData) => item.key)
  // 获取半选中的菜单
  const halfCheckedNodes = menuTreeRef.value?.getHalfCheckedNodes()
  const halfCheckedKeys = halfCheckedNodes.map((item: TreeNodeData) => item.key)
  // eslint-disable-next-line prefer-spread
  checkedKeys.unshift.apply(checkedKeys, halfCheckedKeys)
  return checkedKeys
}

// 获取所有选中的部门
const getDeptAllCheckedKeys = () => {
  if (!deptTreeRef.value) {
    return []
  }
  // 获取目前被选中的部门
  const checkedNodes = deptTreeRef.value?.getCheckedNodes()
  const checkedKeys = checkedNodes.map((item: TreeNodeData) => item.key)
  // 获取半选中的部门
  const halfCheckedNodes = deptTreeRef.value?.getHalfCheckedNodes()
  const halfCheckedKeys = halfCheckedNodes.map((item: TreeNodeData) => item.key)
  // eslint-disable-next-line prefer-spread
  checkedKeys.unshift.apply(checkedKeys, halfCheckedKeys)
  return checkedKeys
}

// 保存
const save = async () => {
  try {
    const isInvalid = await formRef.value?.validate()
    if (isInvalid) return false
    form.menuIds = getMenuAllCheckedKeys()
    form.deptIds = getDeptAllCheckedKeys()
    if (isUpdate.value) {
      await updateRole(form, dataId.value)
      Message.success('修改成功')
    } else {
      await addRole(form)
      Message.success('新增成功')
    }
    emit('save-success')
    return true
  } catch (error) {
    return false
  }
}

// 展开/折叠
const onExpanded = (type: string) => {
  if (type === 'menu') {
    menuTreeRef.value?.expandAll(isMenuExpanded.value)
  } else if (type === 'dept') {
    deptTreeRef.value?.expandAll(isDeptExpanded.value)
  }
}

// 全选/全不选
const onCheckAll = (type: string) => {
  if (type === 'menu') {
    menuTreeRef.value?.checkAll(isMenuCheckAll.value)
  } else if (type === 'dept') {
    deptTreeRef.value?.checkAll(isDeptCheckAll.value)
  }
}

defineExpose({ onAdd, onUpdate })
</script>

<style lang="scss" scoped>
fieldset {
  padding: 15px 15px 0 15px;
  margin-bottom: 15px;
  border: 1px solid var(--color-neutral-3);
  border-radius: 3px;
}
fieldset legend {
  color: rgb(var(--gray-10));
  padding: 2px 5px 2px 5px;
  border: 1px solid var(--color-neutral-3);
  border-radius: 3px;
}
</style>
