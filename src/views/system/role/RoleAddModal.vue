<template>
  <a-modal
      v-model:visible="visible"
      :title="title"
      :mask-closable="false"
      :esc-to-close="true"
      :width="width >= 600 ? 600 : '100%'"
      @close="reset"
  >
    <a-steps :current="current" class="mb-15" @change="onChangeCurrent">
      <a-step>基础信息</a-step>
      <a-step>功能权限</a-step>
      <a-step>数据权限</a-step>
    </a-steps>

    <a-form ref="formRef" :model="form" :rules="rules" size="large" auto-label-width>
      <fieldset v-show="current === 1">
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
      <fieldset v-show="current === 2">
        <a-form-item hide-label :disabled="form.isSystem" class="w-full">
          <a-space>
            <a-checkbox v-model="isMenuExpanded" @change="onExpanded('menu')">展开/折叠</a-checkbox>
            <a-checkbox v-model="isMenuCheckAll" @change="onCheckAll('menu')">全选/全不选</a-checkbox>
            <a-checkbox v-model="form.menuCheckStrictly">父子联动</a-checkbox>
          </a-space>
          <template #extra>
            <a-tree
                ref="menuTreeRef"
                v-model:checked-keys="form.menuIds"
                class="w-full"
                :data="menuList"
                :default-expand-all="isMenuExpanded"
                :check-strictly="!form.menuCheckStrictly"
                :virtual-list-props="{ height: 400 }"
                checkable
            />
          </template>
        </a-form-item>
      </fieldset>
      <fieldset v-show="current === 3">
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
            <a-checkbox v-model="form.deptCheckStrictly">父子联动</a-checkbox>
          </a-space>
          <template #extra>
            <a-tree
                ref="deptTreeRef"
                v-model:checked-keys="form.deptIds"
                class="w-full"
                :data="deptList"
                :default-expand-all="isDeptExpanded"
                :check-strictly="!form.deptCheckStrictly"
                :virtual-list-props="{ height: 350 }"
                checkable
            />
          </template>
        </a-form-item>
      </fieldset>
    </a-form>
    <template #footer>
      <a-space size="large">
        <a-button :disabled="current === 1" type="secondary" @click="onPrev">
          <IconLeft />
          上一步
        </a-button>
        <a-button v-if="current !== 3" :disabled="current === 3" type="primary" @click="onNext">
          下一步
          <IconRight />
        </a-button>
        <a-button v-if="current === 3" type="primary" @click="onClickOk">确定</a-button>
      </a-space>
    </template>
  </a-modal>
</template>

<script setup lang="ts">
import { type FormInstance, Message, type TreeNodeData } from '@arco-design/web-vue'
import { useWindowSize } from '@vueuse/core'
import { addRole, getRole, updateRole } from '@/apis/system'
import { useForm } from '@/hooks'
import { useDept, useDict, useMenu } from '@/hooks/app'

const emit = defineEmits<{
  (e: 'save-success'): void
}>()
const { width } = useWindowSize()
const { data_scope_enum } = useDict('data_scope_enum')
const { deptList, getDeptList } = useDept()
const { menuList, getMenuList } = useMenu()
const current = ref<number>(1)
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
  menuCheckStrictly: true,
  deptCheckStrictly: true,
  sort: 999,
  dataScope: 4
})

const menuTreeRef = ref()
const deptTreeRef = ref()
const isMenuExpanded = ref(false)
const isDeptExpanded = ref(true)
const isMenuCheckAll = ref(false)
const isDeptCheckAll = ref(false)
// 重置
const reset = () => {
  isMenuExpanded.value = false
  isMenuCheckAll.value = false
  isDeptExpanded.value = true
  isDeptCheckAll.value = false
  menuTreeRef.value?.expandAll(isMenuExpanded.value)
  deptTreeRef.value?.expandAll(isDeptExpanded.value)
  formRef.value?.resetFields()
  current.value = 1
  resetForm()
}

const visible = ref(false)
// 新增
const onAdd = () => {
  if (!menuList.value.length) {
    getMenuList()
  }
  reset()
  dataId.value = ''
  visible.value = true
  if (!deptList.value.length) {
    getDeptList()
  }
}
// 上一步
const onPrev = () => {
  current.value = Math.max(1, current.value - 1)
}
// 下一步
const onNext = async () => {
  try {
    if (current.value === 1) {
      const isInvalid = await formRef.value?.validateField(['name', 'code', 'sort', 'description'])
      if (isInvalid) return
    }
    current.value = Math.min(3, current.value + 1)
  } catch (error) {
    console.error(error)
  }
}
// 当前页
const onChangeCurrent = (page: number) => {
  current.value = page
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

const handleTreeAction = (type, action) => {
  const refMap = {
    menu: menuTreeRef,
    dept: deptTreeRef
  }
  const ref = refMap[type]
  if (ref && action === 'expand') {
    ref.value?.expandAll(type === 'menu' ? isMenuExpanded.value : isDeptExpanded.value)
  } else if (ref && action === 'check') {
    ref.value?.checkAll(type === 'menu' ? isMenuCheckAll.value : isDeptCheckAll.value)
  }
}

// 调用时
const onExpanded = (type) => handleTreeAction(type, 'expand')
const onCheckAll = (type) => handleTreeAction(type, 'check')

// 确认时
const onClickOk = () => {
  if (unref(current) === 3) {
    save()
    visible.value = false
  }
}
defineExpose({ onAdd, onUpdate })
</script>

<style lang="scss" scoped>
fieldset {
  padding: 15px 15px 0 15px;
  margin-bottom: 10px;
  border: 1px solid var(--color-neutral-3);
  border-radius: 3px;
  height: 440px;
}

fieldset legend {
  color: rgb(var(--gray-10));
  padding: 2px 5px 2px 5px;
  border: 1px solid var(--color-neutral-3);
  border-radius: 3px;
}

.mb-15 {
  margin-bottom: 15px
}

:deep(.arco-form-item-extra) {
  width: 100%;
}
:deep(.arco-modal-footer){
  margin-top: -20px;
}
</style>
