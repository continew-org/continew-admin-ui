<template>
  <a-modal
    v-model:visible="visible"
    :title="title"
    :mask-closable="false"
    :esc-to-close="false"
    :modal-style="{ maxWidth: '520px' }"
    width="90%"
    draggable
    @before-ok="save"
    @close="reset"
  >
    <GiForm ref="formRef" v-model="form" :options="options" :columns="columns">
      <template #color>
        <a-input v-model="form.color" placeholder="请选择或输入标签颜色" allow-clear>
          <template #suffix>
            <a-color-picker v-model="form.color" />
          </template>
        </a-input>
      </template>
    </GiForm>
  </a-modal>
</template>

<script setup lang="ts">
import { Message } from '@arco-design/web-vue'
import { addDictItem, getDictItem, updateDictItem } from '@/apis'
import { type Columns, GiForm } from '@/components/GiForm'
import { useForm } from '@/hooks'

const emit = defineEmits<{
  (e: 'save-success'): void
}>()
const dictId = ref('')
const dataId = ref('')
const isUpdate = computed(() => !!dataId.value)
const title = computed(() => (isUpdate.value ? '修改字典项' : '新增字典项'))
const formRef = ref<InstanceType<typeof GiForm>>()

const options: Options = {
  form: {},
  col: { xs: 24, sm: 24, md: 24, lg: 24, xl: 24, xxl: 24 },
  btns: { hide: true }
}

const columns: Columns = [
  { label: '标签', field: 'label', type: 'input', rules: [{ required: true, message: '请输入标签' }] },
  { label: '值', field: 'value', type: 'input', rules: [{ required: true, message: '请输入值' }] },
  { label: '标签颜色', field: 'color', type: 'input' },
  {
    label: '排序',
    field: 'sort',
    type: 'input-number',
    props: {
      min: 1,
      mode: 'button'
    }
  },
  {
    label: '描述',
    field: 'description',
    type: 'textarea',
    props: {
      maxLength: 200,
      autoSize: { minRows: 3, maxRows: 5 }
    }
  },
  {
    label: '状态',
    field: 'status',
    type: 'switch',
    props: {
      type: 'round',
      checkedValue: 1,
      uncheckedValue: 2,
      checkedText: '启用',
      uncheckedText: '禁用'
    }
  }
]

const { form, resetForm } = useForm({
  color: 'blue',
  sort: 999,
  status: 1
})

// 重置
const reset = () => {
  formRef.value?.formRef?.resetFields()
  resetForm()
}

const visible = ref(false)
// 新增
const onAdd = (id: string) => {
  reset()
  dictId.value = id
  dataId.value = ''
  visible.value = true
}

// 修改
const onUpdate = async (id: string) => {
  reset()
  dataId.value = id
  const res = await getDictItem(id)
  Object.assign(form, res.data)
  visible.value = true
}

// 保存
const save = async () => {
  try {
    const isInvalid = await formRef.value?.formRef?.validate()
    if (isInvalid) return false
    if (isUpdate.value) {
      await updateDictItem(form, dataId.value)
      Message.success('修改成功')
    } else {
      await addDictItem({ ...form, dictId: dictId.value })
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
