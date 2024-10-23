<template>
  <div>
    <div style="display: flex;">
      <a-select
          v-model="selectedUsers"
          :allow-clear="true"
          :multiple="props.multiple"
          :max-tag-count="4"
          :field-names="{ value: 'id', label: 'nickname' }"
          :options="options"
          @change="handleSelectChange"
      />
      <a-tooltip content="选择用户">
        <a-button @click="onOpen">
          <template #icon>
            <icon-plus />
          </template>
        </a-button>
      </a-tooltip>
    </div>
    <a-modal
        v-model:visible="visible"
        title="用户选择"
        :width="width >= 1350 ? 1350 : '100%'"
        :esc-to-close="true"
        @ok="handleModalOk"
    >
      <UserSelectContent
          ref="userSelectContentRef"
          :value="selectedUsers"
          :multiple="props.multiple"
          :selected-users="selectedUsers"
          @update:selected-users="updateSelectedUsers"
      />
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { useWindowSize } from '@vueuse/core'
import UserSelectContent from './component/UserSelectContent.vue'
import { type UserResp, listAllUser } from '@/apis'
import type { UserSelectPropType } from '@/components/UserSelect/type'

const props = withDefaults(defineProps<UserSelectPropType>(), {
  multiple: false, // 是否支持多选
  value: ''
})

const emit = defineEmits(['update:value'])

const visible = ref<boolean>(false) // 控制弹窗显示的状态
const { width } = useWindowSize() // 获取窗口的宽度，用于设置弹窗宽度
const options = ref<UserResp[]>([]) // 保存用户选项列表
const userSelectContentRef = ref() // 引用 UserSelectContent 组件实例
const selectedUsers = ref<string[]>([]) // 保存已选择的用户
// 打开用户选择弹窗
const onOpen = () => {
  visible.value = true
  userSelectContentRef.value.init(selectedUsers.value) // 调用子组件的初始化方法
}

// 发出数据更新事件
const emitDataChange = () => {
  emit('update:value', selectedUsers.value.filter(Boolean)) // 发出更新事件
}

// 处理用户选择变更事件
const handleSelectChange = (value: any) => {
  selectedUsers.value = props.multiple ? value : [...value]
  emitDataChange() // 每次选择变化时发出更新事件
}

// 更新已选择的用户列表
const updateSelectedUsers = (users: string[]) => {
  selectedUsers.value = users
  emitDataChange() // 每次选择变化时发出更新事件
}

// 弹窗确认按钮点击事件
const handleModalOk = () => {
  emitDataChange() // 确认时发出数据更新事件
  visible.value = false // 关闭弹窗
}

// 组件挂载后初始化用户列表
onMounted(async () => {
  const { data } = await listAllUser({}) // 获取所有用户
  options.value = data.map((user) => {
    user.id = String(user.id)
    user.disabled = false // 初始化时设置用户未被禁用
    return user
  })

  // 初始化选择的用户
  selectedUsers.value = Array.isArray(props.value) ? props.value : props.value.split(',')
})
</script>

<style scoped>
:deep(.arco-input-append) {
  padding: 0;

  .arco-btn {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    border: 1px solid transparent;
  }
}
</style>
