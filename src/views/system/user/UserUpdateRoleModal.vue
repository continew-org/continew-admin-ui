<template>
  <a-modal
    v-model:visible="visible"
    title="分配角色"
    :mask-closable="false"
    :esc-to-close="false"
    :width="width >= 500 ? 500 : '100%'"
    draggable
    @before-ok="save"
    @close="reset"
  >
    <GiForm ref="formRef" v-model="form" :columns="columns" />
  </a-modal>
</template>

<script setup lang="ts">
import { Message } from '@arco-design/web-vue'
import { useWindowSize } from '@vueuse/core'
import { getUser, updateUserRole } from '@/apis/system'
import { type ColumnItem, GiForm } from '@/components/GiForm'
import { useResetReactive } from '@/hooks'
import { useRole } from '@/hooks/app'

const emit = defineEmits<{
  (e: 'save-success'): void
}>()

const { width } = useWindowSize()
const dataId = ref('')
const visible = ref(false)
const formRef = ref<InstanceType<typeof GiForm>>()
const { roleList, getRoleList } = useRole()

const [form, resetForm] = useResetReactive({})

const columns: ColumnItem[] = reactive([
  {
    label: '角色',
    field: 'roleIds',
    type: 'select',
    span: 24,
    required: true,
    props: {
      options: roleList,
      multiple: true,
      allowClear: true,
      allowSearch: { retainInputValue: true },
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
    await updateUserRole({ roleIds: form.roleIds }, dataId.value)
    Message.success('分配成功')
    emit('save-success')
    return true
  } catch (error) {
    return false
  }
}

// 初始化
const onOpen = async (id: string) => {
  reset()
  dataId.value = id
  if (!roleList.value.length) {
    await getRoleList()
  }
  const { data } = await getUser(id)
  Object.assign(form, data)
  visible.value = true
}

defineExpose({ onOpen })
</script>

<style scoped lang="scss"></style>
