<template>
    <div ref="containerRef" class="detail">
        <div class="detail_header">
            <a-affix :target="(containerRef as HTMLElement)">
                <a-page-header title="通知公告" :subtitle="type === 'edit' ? '修改' : '新增'" @back="onBack">
                    <template #extra>
                        <a-button type="primary" @click="onReleased">{{ type === 'edit' ? '修改' : '发布' }}</a-button>
                    </template>
                </a-page-header>
            </a-affix>
        </div>
        <div class="detail_content" style="display: flex; flex-direction: column;">
            <GiForm ref="formRef" v-model="form" :options="options" :columns="columns" />
            <div style="flex: 1;">
                <AiEditor v-model="form.content" />
            </div>
        </div>
    </div>
</template>

<script setup lang="tsx">
import { Message } from '@arco-design/web-vue'
import AiEditor from '../components/edit/index.vue'
import { useTabsStore } from '@/stores'
import { type Columns, GiForm, type Options } from '@/components/GiForm'
import { addNotice, getNotice, updateNotice } from '@/apis'
import { useForm } from '@/hooks'
import { useDict } from '@/hooks/app'

const { notice_type } = useDict('notice_type')
const containerRef = ref<HTMLElement | null>()
const tabsStore = useTabsStore()
const route = useRoute()
const formRef = ref<InstanceType<typeof GiForm>>()
const { id, type } = route.query
const { form, resetForm } = useForm({
  title: '',
  type: '',
  effectiveTime: '',
  terminateTime: '',
  content: ''
})
const options: Options = {
  form: {},
  col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12, xxl: 12 },
  btns: { hide: true }
}

const columns: Columns = reactive([
  {
    label: '标题',
    field: 'title',
    type: 'input',
    rules: [{ required: true, message: '请输入标题' }]
  },
  {
    label: '类型',
    field: 'type',
    type: 'select',
    options: notice_type,
    rules: [{ required: true, message: '请输入类型' }]
  },
  {
    label: '生效时间',
    field: 'effectiveTime',
    type: 'date-picker',
    props: {
      showTime: true
    }

  },
  {
    label: '终止时间',
    field: 'terminateTime',
    type: 'date-picker',
    props: {
      showTime: true
    }
  }
])
// 修改
const onUpdate = async (id: string) => {
  resetForm()
  const res = await getNotice(id)
  Object.assign(form, res.data)
}
const onBack = () => {
  tabsStore.closeCurrent(route.path)
}
const onReleased = async () => {
  const isInvalid = await formRef.value?.formRef?.validate()
  if (isInvalid) return false
  try {
    if (type === 'edit') {
      await updateNotice(form, id as string)
      Message.success('修改成功')
    } else {
      await addNotice(form)
      Message.success('新增成功')
    }
    onBack()
    return true
  } catch (error) {
    console.error(error)
    return false
  }
}
onMounted(() => {
  // 当id存在与type为edit时，执行修改操作
  if (id && type === 'edit') {
    onUpdate(id as string)
  }
})
</script>

<style scoped lang="less"></style>
