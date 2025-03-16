<script setup lang="ts">
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
const title = computed(() => (isUpdate.value ? '修改短信服务配置' : '新增短信服务配置'))
const formRef = ref<InstanceType<typeof GiForm>>()
const { dis_enable_status_enum, sms_supplier_enum } = useDict('dis_enable_status_enum', 'sms_supplier_enum')

const [form, resetForm] = useResetReactive({
  // todo 待补充
})

const columns: ColumnItem[] = reactive([
  {
    label: '名称',
    field: 'name',
    type: 'input',
    span: 24,
    required: true,
  },
  {
    label: '厂商名称标识',
    field: 'supplier',
    type: 'select',
    span: 24,
    required: true,
    props: {
      options: sms_supplier_enum,
    },
  },
  {
    label: 'Access Key 或 API Key',
    field: 'accessKeyId',
    type: 'input',
    span: 24,
    required: true,
  },
  {
    label: 'Access Secret 或 API Secret',
    field: 'accessKeySecret',
    type: 'input',
    span: 24,
    required: true,
  },
  {
    label: '短信签名',
    field: 'signature',
    type: 'input',
    span: 24,
    required: true,
  },
  {
    label: '模板 ID',
    field: 'templateId',
    type: 'input',
    span: 24,
    required: true,
  },
  {
    label: '负载均衡权重',
    field: 'weight',
    type: 'input-number',
    span: 24,
  },
  {
    label: '短信自动重试间隔时间（秒）',
    field: 'retryInterval',
    type: 'input-number',
    span: 24,
  },
  {
    label: '短信重试次数',
    field: 'maxRetries',
    type: 'input-number',
    span: 24,
  },
  {
    label: '当前厂商的发送数量上限',
    field: 'maximum',
    type: 'input-number',
    span: 24,
  },
  {
    label: '各个厂商独立配置',
    field: 'supplierConfig',
    type: 'input',
    span: 24,
  },
  {
    label: '是否启用',
    field: 'isEnable',
    type: 'switch',
    span: 24,
    required: true,
    props: {
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
    <GiForm ref="formRef" v-model="form" :columns="columns" />
  </a-modal>
</template>

<style scoped lang="scss"></style>
