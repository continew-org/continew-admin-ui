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
    <GiForm ref="formRef" v-model="form" :columns="columns" layout="vertical" />
  </a-drawer>
</template>

<script setup lang="tsx">
import { Message } from '@arco-design/web-vue'
import { useWindowSize } from '@vueuse/core'
import { addSmsConfig, getSmsConfig, updateSmsConfig } from '@/apis/system/smsConfig'
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
const title = computed(() => (isUpdate.value ? '修改短信配置' : '新增短信配置'))
const formRef = ref<InstanceType<typeof GiForm>>()
const { dis_enable_status_enum, sms_supplier_enum } = useDict('dis_enable_status_enum', 'sms_supplier_enum')

const [form, resetForm] = useResetReactive({
  status: 1,
})

const columns: ColumnItem[] = reactive([
  {
    label: '名称',
    field: 'name',
    type: 'input',
    span: 12,
    required: true,
    props: {
      maxLength: 100,
    },
  },
  {
    label: '厂商',
    field: 'supplier',
    type: 'select',
    span: 12,
    required: true,
    props: {
      options: sms_supplier_enum,
    },
  },
  {
    label: 'Access Key',
    field: 'accessKey',
    type: 'input',
    span: 24,
    required: true,
  },
  {
    label: 'Secret Key',
    field: 'secretKey',
    type: 'input',
    span: 24,
    required: true,
  },
  {
    label: '短信签名',
    field: 'signature',
    type: 'input',
    span: 12,
    props: {
      maxLength: 100,
    },
  },
  {
    label: '模板 ID',
    field: 'templateId',
    type: 'input',
    span: 12,
    required: true,
    props: {
      maxLength: 50,
    },
  },
  {
    label: '负载均衡权重',
    field: 'weight',
    type: 'input-number',
    span: 12,
    props: {
      min: 1,
      max: 100,
    },
  },
  {
    label: '重试间隔',
    field: 'retryInterval',
    type: 'input-number',
    span: 12,
    slots: {
      append: () => (
        <span style={{ width: '30px', textAlign: 'center' }}>秒</span>
      ),
    },
    props: {
      min: 1,
    },
  },
  {
    label: '重试次数',
    field: 'maxRetries',
    type: 'input-number',
    span: 12,
    props: {
      min: 0,
    },
  },
  {
    label: '发送上限',
    field: 'maximum',
    type: 'input-number',
    span: 12,
    props: {
      min: 1,
    },
  },
  {
    label: '厂商配置',
    field: 'supplierConfig',
    type: 'input',
    span: 24,
  },
  {
    label: '状态',
    field: 'status',
    type: 'radio-group',
    required: true,
    span: 24,
    props: {
      type: 'button',
      options: dis_enable_status_enum,
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
      await updateSmsConfig(form, dataId.value)
      Message.success('修改成功')
    } else {
      await addSmsConfig(form)
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
  const { data } = await getSmsConfig(id)
  Object.assign(form, data)
  visible.value = true
}

defineExpose({ onAdd, onUpdate })
</script>

<style scoped lang="scss"></style>
