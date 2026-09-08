<template>
  <a-modal
    v-model:visible="visible"
    :title="title"
    :mask-closable="false"
    :esc-to-close="false"
    :width="width >= 600 ? 600 : '100%'"
    draggable
    @before-ok="save"
    @close="reset"
  >
    <GiForm ref="formRef" v-model="form" :columns="columns" layout="vertical" />
  </a-modal>
</template>

<script setup lang="tsx">
import { Message } from '@arco-design/web-vue'
import { useWindowSize } from '@vueuse/core'
import { addClient, getClient, updateClient } from '@/apis/system/client'
import { type ColumnItem, GiForm } from '@/components/GiForm'
import { useResetReactive } from '@/hooks'
import { useDict } from '@/hooks/app'

const emit = defineEmits<{
  (e: 'save-success'): void
}>()

const { width } = useWindowSize()

const dataId = ref('')
const visible = ref(false)
const isUpdate = computed(() => !!dataId.value)
const title = computed(() => (isUpdate.value ? '修改客户端' : '新增客户端'))
const formRef = ref<InstanceType<typeof GiForm>>()
const { client_type, auth_type_enum, replaced_range_enum, logout_mode_enum } = useDict('auth_type_enum', 'client_type', 'replaced_range_enum', 'logout_mode_enum')

const [form, resetForm] = useResetReactive({
  activeTimeout: 1800,
  timeout: 86400,
  refreshTokenTimeout: 2592000,
  refreshTokenMode: 'COOKIE',
  isConcurrent: true,
  maxLoginCount: -1,
  status: 1,
})

// 监听 isConcurrent 的变化，处理字段互斥逻辑
watch(
  () => form.isConcurrent,
  (newVal) => {
    if (!newVal) {
      form.maxLoginCount = -1
      // replacedRange 只有在 isConcurrent=false 时才有意义
    } else if (newVal) {
      // 当 isConcurrent=true 时，清空 maxLoginCount
      form.maxLoginCount = -1
    }
  },
)

const columns: ColumnItem[] = reactive([
  {
    label: '客户端类型',
    field: 'clientType',
    type: 'select',
    span: 12,
    props: {
      options: client_type,
    },
  },
  {
    label: '认证类型',
    field: 'authType',
    type: 'select',
    required: true,
    span: 12,
    props: {
      options: auth_type_enum,
      multiple: true,
      maxTagCount: 2,
    },
  },
  {
    label: () => (
      <a-tooltip content="-1：不限制，永不冻结">
        Token 最低活跃频率&nbsp;
        <icon-question-circle />
      </a-tooltip>
    ),
    field: 'activeTimeout',
    type: 'input-number',
    span: 12,
    slots: {
      append: () => (
        <span style={{ width: '30px', textAlign: 'center' }}>秒</span>
      ),
    },
    props: {
      placeholder: '请输入 Token 最低活跃频率',
    },
    rules: [{ required: true, message: '请输入 Token 最低活跃频率' }],
  },
  {
    label: () => (
      <a-tooltip content="-1：永不过期">
        Token 有效期
        <icon-question-circle />
      </a-tooltip>
    ),
    field: 'timeout',
    type: 'input-number',
    span: 12,
    slots: {
      append: () => (
        <span style={{ width: '30px', textAlign: 'center' }}>秒</span>
      ),
    },
    props: {
      placeholder: '请输入 Token 有效期',
    },
    rules: [{ required: true, message: '请输入 Token 有效期' }],
  },
  {
    label: () => (
      <a-tooltip content="轮换不会延长该绝对有效期；单位：秒">
        Refresh Token 有效期&nbsp;
        <icon-question-circle />
      </a-tooltip>
    ),
    field: 'refreshTokenTimeout',
    type: 'input-number',
    span: 12,
    slots: {
      append: () => (
        <span style={{ width: '30px', textAlign: 'center' }}>秒</span>
      ),
    },
    props: {
      min: 60,
      placeholder: '请输入 Refresh Token 有效期',
    },
    rules: [{ required: true, message: '请输入 Refresh Token 有效期' }],
  },
  {
    label: 'Refresh Token 传输模式',
    field: 'refreshTokenMode',
    type: 'select',
    span: 12,
    props: {
      options: [
        { label: 'Cookie（Web）', value: 'COOKIE' },
        { label: '响应体（App / 小程序）', value: 'BODY' },
      ],
      placeholder: '请选择 Refresh Token 传输模式',
    },
    rules: [{ required: true, message: '请选择 Refresh Token 传输模式' }],
  },
  {
    label: '是否允许同一账号多地同时登录',
    field: 'isConcurrent',
    type: 'switch',
    span: 12,
    props: {
      type: 'round',
      checkedValue: true,
      uncheckedValue: false,
      checkedText: '允许',
      uncheckedText: '不允许',
    },
  },
  {
    label: '顶人下线的范围',
    field: 'replacedRange',
    type: 'select',
    span: 12,
    props: {
      options: replaced_range_enum,
      placeholder: '请选择顶人下线的范围',
    },
    disabled: () => {
      return form.isConcurrent
    },
  },
  {
    label: () => (
      <a-tooltip content="-1：不限制">
        同一账号最大登录数量
        <icon-question-circle />
      </a-tooltip>
    ),
    field: 'maxLoginCount',
    type: 'input-number',
    span: 12,
    slots: {
      append: () => (
        <span style={{ width: '30px', textAlign: 'center' }}>个</span>
      ),
    },
    props: {
      placeholder: '请输入同一账号最大登录数量',
      min: -1,
    },
    disabled: () => {
      return !form.isConcurrent
    },
    rules: [
      {
        validator: (value: number, callback: (errorMessage?: string) => void) => {
          if (value <= 0 && value !== -1) {
            callback('最大登录数量只能为 -1 或正整数')
          }
          callback()
        },
      },
    ],
  },
  {
    label: '溢出人数的下线方式',
    field: 'overflowLogoutMode',
    type: 'select',
    span: 12,
    props: {
      options: logout_mode_enum,
      placeholder: '请选择溢出人数的下线方式',
    },
    disabled: () => {
      return form.maxLoginCount === -1 || form.maxLoginCount === 0
    },
  },
  {
    label: '状态',
    field: 'status',
    type: 'switch',
    span: 24,
    props: {
      type: 'round',
      checkedValue: 1,
      uncheckedValue: 2,
      checkedText: '启用',
      uncheckedText: '禁用',
    },
  },
])

// 重置
const reset = () => {
  formRef.value?.formRef?.resetFields()
  resetForm()
}

// 保存
const save = async () => {
  try {
    const isInvalid = await formRef.value?.formRef?.validate()
    if (isInvalid) return false
    if (isUpdate.value) {
      await updateClient(form, dataId.value)
      Message.success('修改成功')
    } else {
      await addClient(form)
      Message.success('新增成功')
    }
    emit('save-success')
    return true
  } catch (error) {
    return false
  }
}

// 新增
const onAdd = async () => {
  reset()
  dataId.value = ''
  visible.value = true
}

// 修改
const onUpdate = async (id: string) => {
  reset()
  dataId.value = id
  const { data } = await getClient(id)
  Object.assign(form, data)
  visible.value = true
}

defineExpose({ onAdd, onUpdate })
</script>

<style scoped lang="scss">
:deep(.arco-input-append) {
  padding: 0;
  .arco-btn {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    border: 1px solid transparent;
  }
}
</style>
