<template>
  <a-modal
    v-model:visible="visible"
    :title="title"
    :mask-closable="false"
    :esc-to-close="false"
    draggable
    :width="width >= 500 ? 500 : '100%'"
    @before-ok="save"
    @close="reset"
  >
    <GiForm ref="formRef" v-model="form" :options="options" :columns="columns" />
  </a-modal>
</template>

<script setup lang="ts">
import { Message } from '@arco-design/web-vue'
import { useWindowSize } from '@vueuse/core'
import { addTenantDbConnect, getTenantDbConnect, updateTenantDbConnect } from '@/apis/tenant/tenantDbConnect'
import { type Columns, GiForm, type Options } from '@/components/GiForm'
import { useResetReactive } from '@/hooks'

const emit = defineEmits<{
  (e: 'save-success'): void
}>()

const { width } = useWindowSize()

const dataId = ref('')
const visible = ref(false)
const isUpdate = computed(() => !!dataId.value)
const title = computed(() => (isUpdate.value ? '修改租户数据连接' : '新增租户数据连接'))
const formRef = ref<InstanceType<typeof GiForm>>()

const options: Options = {
  form: { size: 'large' },
  btns: { hide: true },
}

const [form, resetForm] = useResetReactive({
  type: 0,
})

const columns: Columns = reactive([
  {
    label: '连接名称',
    field: 'connectName',
    type: 'input',
    span: 24,
    rules: [{ required: true, message: '请输入连接名称' }],
  },
  {
    label: '连接类型',
    field: 'type',
    type: 'radio-group',
    span: 24,
    rules: [{ required: true, message: '请选择连接类型' }],
    props: {
      type: 'button',
      size: 'small',
      options: [
        { label: 'mysql', value: 0 },
        { label: 'postgresql(暂未支持)', disabled: true },
      ],
    },

  },
  {
    label: '主机连接地址',
    field: 'host',
    type: 'input',
    span: 24,
    rules: [{ required: true, message: '请输入主机连接地址' }],
  },
  {
    label: '连接端口',
    field: 'port',
    type: 'input-number',
    span: 24,
    rules: [{ required: true, message: '请输入连接端口' }],
  },
  {
    label: '连接用户名',
    field: 'username',
    type: 'input',
    span: 24,
    rules: [{ required: true, message: '请输入连接用户名' }],
  },
  {
    label: '连接密码',
    field: 'password',
    type: 'input-password',
    span: 24,
    rules: [{ required: true, message: '请输入连接密码' }],
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
      await updateTenantDbConnect(form, dataId.value)
      Message.success('修改成功')
    } else {
      await addTenantDbConnect(form)
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
  const { data } = await getTenantDbConnect(id)
  Object.assign(form, data)
  visible.value = true
}

defineExpose({ onAdd, onUpdate })
</script>

<style scoped lang="scss"></style>
