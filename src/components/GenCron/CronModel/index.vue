<template>
  <a-modal v-model:visible="visible"
           modal-class="modal-form-small"
           title-align="start"
           title="Cron表达式生成"
           :top="32"
           :width="780"
           :align-center="false"
           :draggable="true"
           :mask-closable="false"
           :unmount-on-close="true"
           :body-style="{ padding: '4px 16px 8px 16px' }">
    <!-- cron 输入框 -->
    <CronGeneratorInput ref="cronInputRef" v-model="cronExpression" />
    <!-- 页脚 -->
    <template #footer>
      <a-button size="small" @click="handlerClose">关闭</a-button>
      <a-button size="small"
                type="primary"
                @click="handlerOk">
        确定
      </a-button>
    </template>
  </a-modal>
</template>

<script lang="ts">
</script>

<script lang="ts" setup>
import { Message } from '@arco-design/web-vue'
import CronGeneratorInput from '@/components/GenCron/CronForm/index.vue'

const emits = defineEmits(['ok'])

const visible = ref<boolean>(false)

const cronInputRef = ref<InstanceType<typeof CronGeneratorInput>>()

const cronExpression = ref('')

// 打开新增
const open = (cron: string = '') => {
  cronExpression.value = cron
  visible.value = true
}

defineExpose({ open })

// 确定
const handlerOk = () => {
  if (cronInputRef.value?.checkCron()) {
    Message.error('日和周只能有一个为 [不设置]')
    return
  }
  visible.value = false
  emits('ok', cronExpression.value)
}

// 关闭
const handlerClose = () => {
  visible.value = false
}
</script>

<style lang="less" scoped>
</style>
