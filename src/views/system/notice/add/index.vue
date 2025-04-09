<template>
  <div ref="containerRef" class="detail">
    <div class="detail_header">
      <a-affix :target="(containerRef as HTMLElement)">
        <a-page-header title="通知公告" :subtitle="title" @back="onBack">
          <template #extra>
            <a-button type="primary" @click="save">
              <template #icon>
                <icon-save v-if="isUpdate" />
                <icon-send v-else />
              </template>
              <template #default>
                {{ isUpdate ? '保存' : '发布' }}
              </template>
            </a-button>
          </template>
        </a-page-header>
      </a-affix>
    </div>
    <div class="detail_content" style="display: flex; flex-direction: column;">
      <GiForm ref="formRef" v-model="form" :columns="columns">
        <template #noticeUsers>
          <a-select
            v-model="form.noticeUsers"
            :options="userList"
            multiple
            :max-tag-count="4"
            :allow-clear="true"
          />
          <a-tooltip content="选择用户">
            <a-button @click="onOpenSelectUser">
              <template #icon>
                <icon-plus />
              </template>
            </a-button>
          </a-tooltip>
        </template>
      </GiForm>
      <div style="flex: 1;">
        <AiEditor v-model="form.content" />
      </div>
    </div>

    <a-modal
      v-model:visible="visible"
      title="用户选择"
      :mask-closable="false"
      :esc-to-close="false"
      :width="width >= 1100 ? 1100 : '100%'"
      draggable
      @close="reset"
    >
      <UserSelect v-if="visible" ref="UserSelectRef" v-model:value="form.noticeUsers" @select-user="onSelectUser" />
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { Message } from '@arco-design/web-vue'
import { useWindowSize } from '@vueuse/core'
import AiEditor from './components/index.vue'
import { addNotice, getNotice, updateNotice } from '@/apis/system/notice'
import { listUserDict } from '@/apis'
import { type ColumnItem, GiForm } from '@/components/GiForm'
import type { LabelValueState } from '@/types/global'
import { useTabsStore } from '@/stores'
import { useResetReactive } from '@/hooks'
import { useDict } from '@/hooks/app'

const { width } = useWindowSize()
const route = useRoute()
const router = useRouter()
const tabsStore = useTabsStore()

const { id, type } = route.query
const isUpdate = computed(() => type === 'update')
const title = computed(() => (isUpdate.value ? '修改' : '新增'))
const containerRef = ref<HTMLElement | null>()
const formRef = ref<InstanceType<typeof GiForm>>()
const { notice_type } = useDict('notice_type')

const [form, resetForm] = useResetReactive({
  title: '',
  type: '',
  effectiveTime: '',
  terminateTime: '',
  content: '',
  noticeScope: 1,
})

const columns: ColumnItem[] = reactive([
  {
    label: '标题',
    field: 'title',
    type: 'input',
    props: {
      maxLength: 150,
      showWordLimit: true,
    },
    rules: [{ required: true, message: '请输入标题' }],
  },
  {
    label: '类型',
    field: 'type',
    type: 'select',
    props: {
      options: notice_type,
    },
    rules: [{ required: true, message: '请输入类型' }],
  },
  {
    label: '生效时间',
    field: 'effectiveTime',
    type: 'date-picker',
    props: {
      showTime: true,
    },
  },
  {
    label: '终止时间',
    field: 'terminateTime',
    type: 'date-picker',
    props: {
      showTime: true,
    },
  },
  {
    label: '通知范围',
    field: 'noticeScope',
    type: 'radio-group',
    props: {
      options: [{ label: '所有人', value: 1 }, { label: '指定用户', value: 2 }],
    },
    rules: [{ required: true, message: '请选择通知范围' }],
  },
  {
    label: '指定用户',
    field: 'noticeUsers',
    type: 'select',
    hide: () => {
      return form.noticeScope === 1
    },
    rules: [{ required: true, message: '请选择指定用户' }],
  },
])

// 修改
const onUpdate = async (id: string) => {
  resetForm()
  const res = await getNotice(id)
  Object.assign(form, res.data)
}

// 返回
const onBack = () => {
  router.back()
  tabsStore.closeCurrent(route.path)
}

// 保存
const save = async () => {
  const isInvalid = await formRef.value?.formRef?.validate()
  if (isInvalid) return false
  try {
    // 通知范围 所有人 去除指定用户
    form.noticeUsers = form.noticeScope === 1 ? null : form.noticeUsers
    if (isUpdate.value) {
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

// 打开用户选择窗口
const visible = ref(false)
const onOpenSelectUser = () => {
  visible.value = true
}

const UserSelectRef = ref()
// 重置
const reset = () => {
  UserSelectRef.value?.onClearSelected()
}

// 用户选择回调
const onSelectUser = (value: string[]) => {
  form.noticeUsers = value
  formRef.value?.formRef?.validateField('noticeUsers')
}

const userList = ref<LabelValueState[]>([])
onMounted(async () => {
  // 当id存在与type为update时，执行修改操作
  if (id && isUpdate.value) {
    await onUpdate(id as string)
  }
  // 获取所有用户
  const { data } = await listUserDict()
  userList.value = data.map((item) => ({ ...item, value: `${item.value}` }))
})
</script>

<style scoped lang="less"></style>
