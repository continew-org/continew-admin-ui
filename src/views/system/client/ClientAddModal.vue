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
import CryptoJS from 'crypto-js'
import { addClient, getClient, updateClient } from '@/apis/system/client'
import { type ColumnItem, GiForm } from '@/components/GiForm'
import { DisEnableStatusList } from '@/constant/common'
import { useResetReactive } from '@/hooks'
import { useDict } from '@/hooks/app'

const emit = defineEmits<{
  (e: 'save-success'): void
}>()

const { width } = useWindowSize()

const dataId = ref('')
const visible = ref(false)
const isUpdate = computed(() => !!dataId.value)
const title = computed(() => (isUpdate.value ? '修改终端' : '新增终端'))
const formRef = ref<InstanceType<typeof GiForm>>()
const { client_type, auth_type_enum } = useDict('auth_type_enum', 'client_type')

const [form, resetForm] = useResetReactive({
  activeTimeout: 1800,
  timeout: 86400,
  isConcurrent: 1,
  isShare: 1,
  status: 1,
})
const handleGenerate = () => {
  const timestamp = Date.now()
  form.clientSecret = CryptoJS.MD5(`${timestamp}`).toString(CryptoJS.enc.Hex)
}

const columns: ColumnItem[] = reactive([
  {
    label: '终端 Key',
    field: 'clientKey',
    type: 'input',
    span: 24,
    required: true,
    props: {
      maxLength: 32,
    },
    disabled: () => isUpdate.value,
  },
  {
    label: '终端秘钥',
    field: 'clientSecret',
    type: 'input',
    span: 24,
    required: true,
    disabled: () => isUpdate.value,
    slots: {
      append: () => (
        <a-button onClick={handleGenerate}>
          {{
            default: '随机生成',
            icon: <icon-refresh />,
          }}
        </a-button>
      ),
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
    label: '终端类型',
    field: 'clientType',
    type: 'select',
    span: 12,
    props: {
      options: client_type,
    },
  },
  {
    label: () => (
      <a-tooltip content="-1 代表不限制，永不冻结">
        Token 最低活跃频率
        <icon-info-circle-fill />
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
      <a-tooltip content="-1 代表永不过期">
        Token 有效期
        <icon-info-circle-fill />
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
    label: '状态',
    field: 'status',
    type: 'radio-group',
    required: true,
    span: 24,
    props: {
      type: 'button',
      options: DisEnableStatusList,
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
