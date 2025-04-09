<template>
  <a-modal
    v-model:visible="visible"
    :title="title"
    :mask-closable="false"
    :esc-to-close="false"
    :body-style="{ maxHeight: width >= 650 ? '76vh' : '100vh' }"
    :width="width >= 650 ? 650 : '100%'"
    draggable
    @before-ok="save"
    @close="reset"
  >
    <a-form ref="formRef" :model="form" :rules="formRules" auto-label-width :layout="width >= 700 ? 'horizontal' : 'vertical'">
      <a-form-item label="菜单类型" field="type">
        <a-radio-group v-model="form.type" type="button" :disabled="isUpdate" @change="onChangeType">
          <a-radio :value="1">目录</a-radio>
          <a-radio :value="2">菜单</a-radio>
          <a-radio :value="3">按钮</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="上级菜单" field="parentId">
        <a-tree-select
          v-model="form.parentId"
          placeholder="请选择上级菜单"
          allow-clear
          allow-search
          :data="(menuSelectTree as any)"
          :fallback-option="false"
          :filter-tree-node="filterOptions"
        />
      </a-form-item>
      <a-row>
        <a-col v-bind="colProps">
          <a-form-item label="菜单标题" field="title">
            <a-input v-model.trim="form.title" placeholder="请输入菜单标题" :max-length="30" show-word-limit allow-clear />
          </a-form-item>
        </a-col>
        <a-col v-bind="colProps">
          <a-form-item v-if="[1, 2].includes(form.type)" label="菜单图标" field="icon">
            <GiIconSelector v-model="form.icon" />
          </a-form-item>
          <a-form-item v-else label="权限标识" field="permission">
            <a-input v-model.trim="form.permission" placeholder="system:user:add" :max-length="100" show-word-limit allow-clear />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col v-bind="colProps">
          <a-form-item v-if="[1, 2].includes(form.type)" label="路由地址" field="path">
            <a-input v-model.trim="form.path" placeholder="请输入路由地址" allow-clear />
          </a-form-item>
        </a-col>
        <a-col v-bind="colProps">
          <a-form-item v-if="form.type === 1 || (form.type === 2 && !form.isExternal)" label="重定向" field="redirect">
            <a-input v-model.trim="form.redirect" placeholder="请输入重定向地址" allow-clear />
          </a-form-item>
          <a-form-item v-if="form.type === 2 && form.isExternal" label="组件路径" field="component">
            <a-input v-model.trim="form.component" placeholder="请输入组件路径" allow-clear />
          </a-form-item>
        </a-col>
      </a-row>
      <a-form-item v-if="form.type === 2 && !form.isExternal" label="组件路径" field="component">
        <a-select v-model="form.component" placeholder="请输入或选择组件路径" allow-clear allow-create :options="componentOptions">
          <template #label="{ data }">
            {{ data?.value }}
          </template>
        </a-select>
      </a-form-item>
      <a-row>
        <a-col v-bind="colProps">
          <a-form-item v-if="form.type === 1 || (form.type === 2 && !form.isExternal)" label="组件名称" field="name">
            <a-input v-model.trim="form.name" placeholder="请输入组件名称" :max-length="50" show-word-limit allow-clear />
            <template #extra>
              <div v-if="componentName">
                <span>建议组件名称：</span>
                <a-tag checkable @check="inputComponentName">{{ componentName }}</a-tag>
              </div>
            </template>
          </a-form-item>
        </a-col>
        <a-col v-bind="colProps">
          <a-form-item v-if="form.type === 2" label="权限标识" field="permission">
            <a-input v-model.trim="form.permission" placeholder="system:user:add" :max-length="100" show-word-limit allow-clear />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row v-if="[1, 2].includes(form.type)" :gutter="16">
        <a-col :xs="12" :sm="12" :md="8" :lg="8" :xl="8" :xxl="8">
          <a-form-item label="是否隐藏" field="hidden">
            <a-switch
              v-model="form.isHidden"
              :checked-value="true"
              :unchecked-value="false"
              checked-text="是"
              unchecked-text="否"
              type="round"
            />
          </a-form-item>
        </a-col>
        <a-col :xs="12" :sm="12" :md="8" :lg="8" :xl="8" :xxl="8">
          <a-form-item label="是否缓存" field="keepAlive">
            <a-switch
              v-model="form.isCache"
              :checked-value="true"
              :unchecked-value="false"
              checked-text="是"
              unchecked-text="否"
              type="round"
            />
          </a-form-item>
        </a-col>
        <a-col :xs="12" :sm="12" :md="8" :lg="8" :xl="8" :xxl="8">
          <a-form-item v-if="form.type === 2" label="是否外链" field="isExternalUrl">
            <a-switch
              v-model="form.isExternal"
              :checked-value="true"
              :unchecked-value="false"
              checked-text="是"
              unchecked-text="否"
              type="round"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-form-item label="菜单排序" field="sort">
        <a-input-number v-model="form.sort" placeholder="请输入菜单排序" :min="1" mode="button" style="width: 150px" />
      </a-form-item>
      <a-form-item label="状态" field="status">
        <a-switch
          v-model="form.status"
          type="round"
          :checked-value="1"
          :unchecked-value="2"
          checked-text="启用"
          unchecked-text="禁用"
        />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup lang="ts">
import { type ColProps, type FormInstance, Message, type TreeNodeData } from '@arco-design/web-vue'
import { useWindowSize } from '@vueuse/core'
import { mapTree } from 'xe-utils'
import { type MenuResp, addMenu, getMenu, updateMenu } from '@/apis/system/menu'
import { useResetReactive } from '@/hooks'
import { filterTree, transformPathToName } from '@/utils'
import { useComponentPaths } from '@/hooks/modules/useComponentPaths'

interface Props {
  menus: MenuResp[]
}
const props = withDefaults(defineProps<Props>(), {
  menus: () => [],
})

const emit = defineEmits<{
  (e: 'save-success'): void
}>()

const { width } = useWindowSize()

const colProps: ColProps = { xs: 24, sm: 24, md: 12, lg: 12, xl: 12, xxl: 12 }

const dataId = ref('')
const visible = ref(false)
const isUpdate = computed(() => !!dataId.value)
const title = computed(() => (isUpdate.value ? '修改菜单' : '新增菜单'))
const formRef = ref<FormInstance>()

const [form, resetForm] = useResetReactive({
  type: 1,
  sort: 999,
  isExternal: false,
  isCache: false,
  isHidden: false,
  status: 1,
})

const componentName = computed(() => transformPathToName(form.path))

const { componentOptions } = useComponentPaths()

const rules: FormInstance['rules'] = {
  parentId: [{ required: true, message: '请选择上级菜单' }],
  title: [{ required: true, message: '请输入菜单标题' }],
  path: [{ required: true, message: '请输入路由地址' }],
  name: [{ required: true, message: '请输入组件名称' }],
  component: [{ required: true, message: '请输入组件路径' }],
  permission: [{ required: true, message: '请输入权限标识' }],
}
// eslint-disable-next-line vue/return-in-computed-property
const formRules = computed(() => {
  if ([1, 2].includes(form.type)) {
    const { title, name, path } = rules
    return { title, name, path } as FormInstance['rules']
  }
  if (form.type === 3) {
    const { parentId, title, permission } = rules
    return { parentId, title, permission } as FormInstance['rules']
  }
})

// 重置
const reset = () => {
  formRef.value?.resetFields()
  resetForm()
}

// 设置建议组件名
const inputComponentName = () => {
  form.name = componentName.value
}

// 切换类型清除校验
const onChangeType = () => {
  formRef.value?.clearValidate()
}

// 转换为菜单树
const menuSelectTree = computed(() => {
  const menus = JSON.parse(JSON.stringify(props.menus)) as MenuResp[]
  const data = filterTree(menus, (i) => [1, 2].includes(i.type))
  return mapTree(data, (i) => ({
    key: i.id,
    title: i.title,
    children: i.children,
  }))
})

// 过滤树
const filterOptions = (searchKey: string, nodeData: TreeNodeData) => {
  if (nodeData.title) {
    return nodeData.title.toLowerCase().includes(searchKey.toLowerCase())
  }
  return false
}

// 保存
const save = async () => {
  try {
    const isInvalid = await formRef.value?.validate()
    if (isInvalid) return false
    if (isUpdate.value) {
      await updateMenu(form, dataId.value)
      Message.success('修改成功')
    } else {
      await addMenu(form)
      Message.success('新增成功')
    }
    emit('save-success')
    return true
  } catch (error) {
    return false
  }
}

// 新增
const onAdd = (id?: string) => {
  reset()
  form.parentId = id
  dataId.value = ''
  visible.value = true
}

// 修改
const onUpdate = async (id: string) => {
  reset()
  dataId.value = id
  const { data } = await getMenu(id)
  Object.assign(form, data)
  visible.value = true
}

defineExpose({ onAdd, onUpdate })
</script>

<style scoped lang="scss"></style>
