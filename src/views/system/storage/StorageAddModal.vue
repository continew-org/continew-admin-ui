<template>
  <a-modal
    v-model:visible="visible"
    :title="title"
    :mask-closable="false"
    :esc-to-close="false"
    :width="width >= 500 ? 500 : '100%'"
    @before-ok="save"
    @close="reset"
  >
    <GiForm ref="formRef" v-model="form" :columns="columns" />
  </a-modal>
</template>

<script setup lang="ts">
import { Message } from '@arco-design/web-vue'
import { useWindowSize } from '@vueuse/core'
import { addStorage, getStorage, updateStorage } from '@/apis/system/storage'
import { type ColumnItem, GiForm } from '@/components/GiForm'
import { useResetReactive } from '@/hooks'
import { useDict } from '@/hooks/app'
import { encryptByRsa } from '@/utils/encrypt'

const emit = defineEmits<{
  (e: 'save-success'): void
}>()

const { width } = useWindowSize()

const dataId = ref('')
const visible = ref(false)
const isUpdate = computed(() => !!dataId.value)
const storageType = ref('')
const title = computed(() => (isUpdate.value ? `修改${storageType.value}` : `新增${storageType.value}`))
const formRef = ref<InstanceType<typeof GiForm>>()
const { storage_type_enum } = useDict('storage_type_enum')

const [form, resetForm] = useResetReactive({
  type: 2,
  isDefault: false,
  sort: 999,
  status: 2,
})

const columns: ColumnItem[] = reactive([
  {
    label: '名称',
    field: 'name',
    type: 'input',
    span: 24,
    props: {
      maxLength: 100,
    },
    required: true,
  },
  {
    label: '编码',
    field: 'code',
    type: 'input',
    span: 24,
    props: {
      maxLength: 30,
    },
    required: true,
    disabled: () => isUpdate.value,
  },
  {
    label: 'Access Key',
    field: 'accessKey',
    type: 'input',
    span: 24,
    required: true,
    show: () => form.type === 2,
  },
  {
    label: 'Secret Key',
    field: 'secretKey',
    type: 'input',
    span: 24,
    required: true,
    show: () => form.type === 2,
  },
  {
    label: 'Endpoint',
    field: 'endpoint',
    type: 'input',
    span: 24,
    required: true,
    show: () => form.type === 2,
  },
  {
    label: 'Bucket',
    field: 'bucketName',
    type: 'input',
    span: 24,
    required: true,
    show: () => form.type === 2,
  },
  {
    label: '域名',
    field: 'domain',
    type: 'input',
    span: 24,
    required: true,
    show: () => form.type === 2,
  },
  {
    label: '存储路径',
    field: 'bucketName',
    type: 'input',
    span: 24,
    required: true,
    show: () => form.type === 1,
  },
  {
    label: '访问路径',
    field: 'domain',
    type: 'input',
    span: 24,
    required: true,
    show: () => form.type === 1,
  },
  {
    label: '排序',
    field: 'sort',
    type: 'input-number',
    span: 24,
    props: {
      min: 1,
      mode: 'button',
    },
  },
  {
    label: '描述',
    field: 'description',
    type: 'textarea',
    span: 24,
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
      await updateStorage({
        ...form,
        secretKey: form.type === 2 && !form.secretKey.includes('*') ? encryptByRsa(form.secretKey) || '' : null,
      }, dataId.value)
      Message.success('修改成功')
    } else {
      await addStorage({
        ...form,
        secretKey: form.type === 2 ? encryptByRsa(form.secretKey) || '' : form.secretKey,
      })
      Message.success('新增成功')
    }
    emit('save-success')
    return true
  } catch (error) {
    return false
  }
}

// 新增
const onAdd = (type: number) => {
  reset()
  dataId.value = ''
  form.type = type
  storageType.value = storage_type_enum.value.find((item) => item.value === type)?.label || '本地存储'
  visible.value = true
}

// 修改
const onUpdate = async (id: string) => {
  reset()
  dataId.value = id
  const { data } = await getStorage(id)
  Object.assign(form, data)
  storageType.value = storage_type_enum.value.find((item) => item.value === form.type)?.label || '本地存储'
  visible.value = true
}

defineExpose({ onAdd, onUpdate })
</script>
