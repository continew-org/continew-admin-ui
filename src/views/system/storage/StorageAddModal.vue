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
      <a-form-item label="名称" field="name">
        <a-input v-model.trim="form.name" placeholder="请输入名称" />
      </a-form-item>
      <a-form-item label="编码" field="code">
        <a-input v-model.trim="form.code" placeholder="请输入编码" :disabled="isUpdate" />
      </a-form-item>
      <a-form-item label="类型" field="type">
        <a-select v-model.trim="form.type" :options="storage_type_enum" placeholder="请选择类型" :disabled="isUpdate" />
      </a-form-item>
      <a-form-item v-if="form.type === 1" label="访问密钥" field="accessKey">
        <a-input v-model.trim="form.accessKey" placeholder="请输入访问密钥" :max-length="255" />
      </a-form-item>
      <a-form-item v-if="form.type === 1" label="私有密钥" field="secretKey">
        <a-input
            v-model.trim="form.secretKey"
            placeholder="请输入私有密钥"
            :max-length="255"
        />
      </a-form-item>
      <a-form-item v-if="form.type === 1" label="终端节点" field="endpoint">
        <a-input v-model.trim="form.endpoint" placeholder="请输入终端节点" />
      </a-form-item>
      <a-form-item label="桶名称" field="bucketName">
        <a-input v-model.trim="form.bucketName" placeholder="请输入桶名称" />
      </a-form-item>
      <a-form-item v-if="form.type === 1" label="域名" field="domain">
        <a-input v-model.trim="form.domain" placeholder="请输入域名" />
        <template #extra>
          <div v-if="defaultDomain">
            <span>留空默认域名：{{ defaultDomain }}</span>
          </div>
        </template>
      </a-form-item>
      <a-form-item
          v-if="form.type === 2"
          label="域名"
          field="domain"
          :rules="[
          {
            required: true,
            message: '请输入域名',
          },
        ]"
      >
        <a-input v-model.trim="form.domain" placeholder="请输入域名" />
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
      <a-form-item label="默认存储" field="isDefault">
        <a-switch
            v-model="form.isDefault"
            type="round"
            :checked-value="true"
            :unchecked-value="false"
            checked-text="是"
            unchecked-text="否"
        />
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
  </a-drawer>
</template>

<script setup lang="ts">
import { type FormInstance, Message } from '@arco-design/web-vue'
import { useWindowSize } from '@vueuse/core'
import { addStorage, getStorage, updateStorage } from '@/apis'
import { useForm } from '@/hooks'
import { useDict } from '@/hooks/app'
import { encryptByRsa } from '@/utils/encrypt'
import { isIPv4 } from '@/utils/validate'

const emit = defineEmits<{
  (e: 'save-success'): void
}>()
const { width } = useWindowSize()
const { storage_type_enum } = useDict('storage_type_enum')

const dataId = ref('')
const isUpdate = computed(() => !!dataId.value)
const title = computed(() => (isUpdate.value ? '修改存储' : '新增存储'))
const formRef = ref<FormInstance>()

const rules: FormInstance['rules'] = {
  name: [{ required: true, message: '请输入名称' }],
  code: [{ required: true, message: '请输入编码' }],
  type: [{ required: true, message: '请选择类型' }],
  accessKey: [{ required: true, message: '请输入访问密钥' }],
  secretKey: [{ required: true, message: '请输入私有密钥' }],
  endpoint: [{ required: true, message: '请输入终端节点' }],
  bucketName: [{ required: true, message: '请输入桶名称' }]
}

const { form, resetForm } = useForm({
  type: 2,
  isDefault: false,
  sort: 999,
  status: 1
})
/** 获取url的protocol和endpoint */
const stripProtocol = (url: string): { endpoint: string, protocol: string } => {
  if (url.startsWith('http://')) {
    return { endpoint: url.substring(7), protocol: 'http://' }
  } else if (url.startsWith('https://')) {
    return { endpoint: url.substring(8), protocol: 'https://' }
  }
  return { endpoint: url, protocol: 'http://' }
}
/** 按规则拼接当前默认domain */
const defaultDomain = computed(() => {
  const { endpoint: initialEndpoint, bucketName, domain, type } = form
  if (domain || type !== 1 || !initialEndpoint || !bucketName) {
    return
  }
  const { endpoint, protocol } = stripProtocol(initialEndpoint)
  return isIPv4(endpoint) ? `${protocol}${endpoint}/${bucketName}/` : `${protocol}${bucketName}.${endpoint}/`
})

// 重置
const reset = () => {
  formRef.value?.resetFields()
  resetForm()
}

const visible = ref(false)
// 新增
const onAdd = () => {
  reset()
  dataId.value = ''
  visible.value = true
}

// 修改
const onUpdate = async (id: string) => {
  reset()
  dataId.value = id
  const res = await getStorage(id)
  Object.assign(form, res.data)
  visible.value = true
}

// 保存
const save = async () => {
  try {
    const isInvalid = await formRef.value?.validate()
    if (isInvalid) return false
    const data = {
      ...form,
      secretKey: form.type === 1 && !form.secretKey.includes('*') ? encryptByRsa(form.secretKey) : null,
      domain: form.domain || defaultDomain.value
    }
    if (isUpdate.value) {
      await updateStorage(data, dataId.value)
      Message.success('修改成功')
    } else {
      await addStorage(data)
      Message.success('新增成功')
    }
    emit('save-success')
    return true
  } catch (error) {
    return false
  }
}

defineExpose({ onAdd, onUpdate })
</script>
