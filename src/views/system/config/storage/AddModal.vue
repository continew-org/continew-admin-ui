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
    <GiForm ref="formRef" v-model="form" :columns="columns">
      <template #secretKey>
        <a-input
          v-model="form.secretKey"
          :placeholder="isUpdate ? '保持 Secret Key 为空将不更改' : '请输入 Secret Key'"
        />
      </template>
    </GiForm>
    <div class="advanced-toggle-wrap">
      <a-button type="text" size="small" class="advanced-toggle-btn" @click="advancedVisible = !advancedVisible">
        高级配置
        <icon-right class="advanced-toggle-icon" :class="[{ 'advanced-toggle-icon--expanded': advancedVisible }]" />
      </a-button>
    </div>
    <GiForm v-if="advancedVisible" v-model="form" :columns="advancedColumns" class="advanced-form" />
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
const advancedVisible = ref(false)
const { storage_type_enum } = useDict('storage_type_enum')
const MB = 1024 * 1024

const [form, resetForm] = useResetReactive({
  type: 2,
  multipartUploadThreshold: undefined,
  multipartUploadPartSize: undefined,
  multipartTempDir: '',
  recycleBinEnabled: true,
  recycleBinPath: '.RECYCLE.BIN/',
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
    required: () => !isUpdate.value,
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
    required: false,
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
    label: '启用回收站',
    field: 'recycleBinEnabled',
    type: 'switch',
    span: 24,
    props: {
      type: 'round',
      checkedValue: true,
      uncheckedValue: false,
      checkedText: '启用',
      uncheckedText: '禁用',
    },
    disabled: () => isUpdate.value,
  },
  {
    label: '回收站路径',
    field: 'recycleBinPath',
    type: 'input',
    span: 24,
    required: true,
    show: () => form.recycleBinEnabled,
    disabled: () => isUpdate.value,
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

const advancedColumns: ColumnItem[] = reactive([
  {
    label: '分片阈值（MB）',
    field: 'multipartUploadThreshold',
    type: 'input-number',
    span: 24,
    props: {
      min: 1,
      precision: 2,
      placeholder: '为空则使用默认配置',
      mode: 'button',
    },
  },
  {
    label: '分片大小（MB）',
    field: 'multipartUploadPartSize',
    type: 'input-number',
    span: 24,
    props: {
      min: 1,
      precision: 2,
      placeholder: '为空则使用默认配置',
      mode: 'button',
    },
  },
  {
    label: '分片临时地址',
    field: 'multipartTempDir',
    type: 'input',
    span: 24,
    props: {
      maxLength: 255,
      placeholder: '为空则使用默认配置',
    },
    show: () => form.type === 1,
  },
])

// 重置
const reset = () => {
  formRef.value?.formRef?.resetFields()
  advancedVisible.value = false
  resetForm()
}

const toMb = (bytes?: number | null) => {
  if (typeof bytes !== 'number' || bytes <= 0) return undefined
  return Number((bytes / MB).toFixed(2))
}

const toBytes = (mb?: number | null) => {
  const value = Number(mb)
  if (!Number.isFinite(value) || value <= 0) return null
  return Math.round(value * MB)
}

const validateAdvancedConfig = () => {
  const thresholdMb = Number(form.multipartUploadThreshold)
  const partSizeMb = Number(form.multipartUploadPartSize)
  const hasThreshold = Number.isFinite(thresholdMb) && thresholdMb > 0
  const hasPartSize = Number.isFinite(partSizeMb) && partSizeMb > 0

  if (hasPartSize) {
    const minPartSizeMb = form.type === 2 ? 5 : 1
    if (partSizeMb < minPartSizeMb) {
      Message.error(`分片大小不能小于 ${minPartSizeMb}MB`)
      return false
    }
  }

  if (hasThreshold && hasPartSize && thresholdMb < partSizeMb) {
    Message.error('分片阈值不能小于分片大小')
    return false
  }

  return true
}

const buildPayload = () => {
  return {
    ...form,
    multipartUploadThreshold: toBytes(form.multipartUploadThreshold),
    multipartUploadPartSize: toBytes(form.multipartUploadPartSize),
    multipartTempDir: form.type === 1 && form.multipartTempDir?.trim()
      ? form.multipartTempDir.trim()
      : null,
  }
}

// 保存
const save = async () => {
  try {
    const isInvalid = await formRef.value?.formRef?.validate()
    if (isInvalid) return false
    if (!validateAdvancedConfig()) return false
    const payload = buildPayload()
    if (isUpdate.value) {
      await updateStorage({
        ...payload,
        secretKey: payload.type === 2 && payload.secretKey ? encryptByRsa(payload.secretKey) || '' : null,
      }, dataId.value)
      Message.success('修改成功')
    } else {
      await addStorage({
        ...payload,
        secretKey: payload.type === 2 ? encryptByRsa(payload.secretKey) || '' : payload.secretKey,
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
  Object.assign(form, {
    ...data,
    multipartUploadThreshold: toMb(data.multipartUploadThreshold),
    multipartUploadPartSize: toMb(data.multipartUploadPartSize),
  })
  storageType.value = storage_type_enum.value.find((item) => item.value === form.type)?.label || '本地存储'
  visible.value = true
}

defineExpose({ onAdd, onUpdate })
</script>

<style scoped lang="scss">
.advanced-toggle-wrap {
  margin-top: 6px;
  display: flex;
  justify-content: flex-start;
}

.advanced-toggle-btn {
  padding: 0;
  color: var(--color-text-2);
}

.advanced-toggle-icon {
  margin-left: 4px;
  transition: transform 0.2s ease;
}

.advanced-toggle-icon--expanded {
  transform: rotate(90deg);
}

.advanced-form {
  margin-top: 8px;
  padding-top: 12px;
  border-top: 1px dashed var(--color-border-2);
}
</style>
