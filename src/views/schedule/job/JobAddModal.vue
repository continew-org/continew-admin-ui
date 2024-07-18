<template>
  <a-modal
    v-model:visible="visible"
    :title="title"
    :mask-closable="false"
    :esc-to-close="false"
    :modal-style="{ maxWidth: '700px' }"
    :body-style="{ maxHeight: width >= 700 ? '76vh' : '100vh' }"
    :width="width >= 700 ? '90%' : '100%'"
    @before-ok="save"
    @close="reset"
  >
    <a-form ref="formRef" :model="form" :rules="rules" size="large" auto-label-width :layout="width >= 700 ? 'horizontal' : 'vertical'">
      <fieldset>
        <legend>基础配置</legend>
        <a-row>
          <a-col v-bind="colProps">
            <a-form-item label="任务组" field="groupName">
              <a-select v-model="form.groupName" placeholder="请选择任务组" :options="groupList" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colProps">
            <a-form-item label="任务名称" field="jobName">
              <a-input v-model.trim="form.jobName" placeholder="请输入任务名称" :max-length="64" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-form-item label="描述" field="description">
          <a-textarea
            v-model.trim="form.description"
            placeholder="请输入描述"
            show-word-limit
            :max-length="200"
            :auto-size="{ minRows: 3, maxRows: 5 }"
          />
        </a-form-item>
      </fieldset>
      <fieldset>
        <legend>调度配置</legend>
        <a-row>
          <a-col v-bind="colProps">
            <a-form-item label="触发类型" field="triggerType">
              <a-select
                v-model="form.triggerType"
                placeholder="请选择触发类型"
                :options="job_trigger_type_enum"
                @change="triggerTypeChange"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colProps">
            <a-form-item :label="form.triggerType === 2 ? '间隔时长' : 'CRON表达式'" field="triggerInterval">
              <a-input-number
                v-if="form.triggerType === 2"
                v-model="triggerIntervalNumber"
                placeholder="请输入间隔时长"
                :min="1"
              >
                <template #suffix>秒</template>
              </a-input-number>
              <a-input
                v-else
                v-model="form.triggerInterval"
                placeholder="请输入CRON表达式"
              />
            </a-form-item>
          </a-col>
        </a-row>
      </fieldset>
      <fieldset>
        <legend>任务配置</legend>
        <a-row>
          <a-col v-bind="colProps">
            <a-form-item label="任务类型" field="taskType">
              <a-select v-model="form.taskType" :options="job_task_type_enum" placeholder="请选择任务类型" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colProps">
            <a-form-item label="执行器名称" field="executorInfo">
              <a-input v-model.trim="form.executorInfo" placeholder="请输入执行器名称" :max-length="255" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-form-item label="任务参数" field="argsStr">
          <a-textarea
            v-if="form.taskType !== 3"
            v-model.trim="form.argsStr"
            placeholder="请输入任务参数"
            :auto-size="{ minRows: 3, maxRows: 5 }"
          />
          <div v-else class="args-container">
            <div v-for="(item, index) in args" :key="index" class="args-item">
              <a-form-item hide-label :rules="[{ required: true, message: '请输入分片参数' }]">
                <a-input v-model="item.value" :placeholder="`请输入分片参数 ${index + 1}`" />
              </a-form-item>
              <a-button status="danger" class="args-delete-button" @click="onDeleteArgs(index)">
                <template #icon>
                  <icon-delete />
                </template>
              </a-button>
            </div>
            <a-button type="outline" class="add-button" style="width: 100%;" @click="onAddArgs">
              <template #icon>
                <icon-plus />
              </template>
            </a-button>
          </div>
        </a-form-item>
      </fieldset>
      <fieldset>
        <legend>高级配置</legend>
        <a-row>
          <a-col v-bind="colProps">
            <a-form-item label="路由策略" field="routeKey">
              <a-select v-model.trim="form.routeKey" placeholder="请选择路由策略" :options="job_route_strategy_enum" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colProps">
            <a-form-item label="阻塞策略" field="blockStrategy">
              <a-select v-model.trim="form.blockStrategy" placeholder="请选择阻塞策略" :options="job_block_strategy_enum" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colProps">
            <a-form-item label="超时时间" field="executorTimeout">
              <a-input-number v-model.trim="form.executorTimeout" placeholder="请输入超时时间" :min="1">
                <template #suffix>秒</template>
              </a-input-number>
            </a-form-item>
          </a-col>
          <a-col v-bind="colProps">
            <a-form-item label="最大重试次数" field="maxRetryTimes">
              <a-input-number v-model="form.maxRetryTimes" placeholder="请输入最大重试次数" :min="0">
              </a-input-number>
            </a-form-item>
          </a-col>
          <a-col v-bind="colProps">
            <a-form-item label="重试间隔" field="retryInterval">
              <a-input-number v-model.trim="form.retryInterval" placeholder="请输入重试间隔" :min="1">
                <template #suffix>
                  秒
                </template>
              </a-input-number>
            </a-form-item>
          </a-col>
          <a-col v-bind="colProps">
            <a-form-item label="并行数" field="parallelNum">
              <a-input-number v-model="form.parallelNum" placeholder="请输入并行数" :min="1" />
            </a-form-item>
          </a-col>
        </a-row>
      </fieldset>
    </a-form>
  </a-modal>
</template>

<script setup lang="ts">
import { type ColProps, type FormInstance, Message } from '@arco-design/web-vue'
import { useWindowSize } from '@vueuse/core'
import { addJob, listGroup, updateJob } from '@/apis'
import { useForm } from '@/hooks'
import { useDict } from '@/hooks/app'

const emit = defineEmits<{
  (e: 'save-success'): void
}>()
const colProps: ColProps = { xs: 24, sm: 24, md: 12, lg: 12, xl: 12, xxl: 12 }
const { width } = useWindowSize()
const { job_trigger_type_enum, job_task_type_enum, job_route_strategy_enum, job_block_strategy_enum } = useDict(
  'job_trigger_type_enum',
  'job_task_type_enum',
  'job_route_strategy_enum',
  'job_block_strategy_enum'
)

const dataId = ref()
const isUpdate = computed(() => !!dataId.value)
const title = computed(() => (isUpdate.value ? '修改任务' : '新增任务'))
const formRef = ref<FormInstance>()

const rules: FormInstance['rules'] = {
  groupName: [{ required: true, message: '请选择任务组' }],
  jobName: [{ required: true, message: '请输入任务名称' }],
  triggerType: [{ required: true, message: '请选择触发类型' }],
  triggerInterval: [{ required: true, message: '请输入间隔时长' }],
  taskType: [{ required: true, message: '请选择任务类型' }],
  executorInfo: [{ required: true, message: '请输入执行器名称' }],
  routeKey: [{ required: true, message: '请选择路由策略' }],
  blockStrategy: [{ required: true, message: '请选择阻塞策略' }],
  executorTimeout: [{ required: true, message: '请输入超时时间' }],
  maxRetryTimes: [{ required: true, message: '请输入最大重试次数' }],
  retryInterval: [{ required: true, message: '请输入重试间隔' }],
  parallelNum: [{ required: true, message: '请输入并行数' }]
}

const { form, resetForm } = useForm({
  triggerType: 2,
  triggerInterval: 60,
  taskType: 1,
  routeKey: 4,
  blockStrategy: 1,
  executorTimeout: 60,
  maxRetryTimes: 3,
  retryInterval: 1,
  parallelNum: 1
})

const args = ref<any[]>([])
// 重置
const reset = () => {
  formRef.value?.resetFields()
  args.value = [{ value: '' }]
  resetForm()
}

const groupList = ref()
// 查询任务组列表
const getGroupList = async () => {
  const { data } = await listGroup()
  groupList.value = data?.map((item: string) => ({
    label: item,
    value: item
  }))
}

const visible = ref(false)
// 新增
const onAdd = () => {
  reset()
  getGroupList()
  dataId.value = undefined
  visible.value = true
}

// 修改
const onUpdate = async (record: any) => {
  await getGroupList()
  reset()
  dataId.value = record.id
  Object.assign(form, record)
  // 切片任务，解析 argsStr 并赋值给 args
  if (form.taskType === 3 && form.argsStr) {
    try {
      const parsedArgs = JSON.parse(form.argsStr)
      args.value = parsedArgs.map((arg: any) => ({ value: arg }))
    } catch (error: any) {
      Message.error(error)
    }
  }
  visible.value = true
}

// 保存
const save = async () => {
  try {
    // 切片任务，将参数转换为 JSON 数组
    if (form.taskType === 3) {
      form.argsStr = JSON.stringify(args.value.map((arg) => arg.value))
    }
    const isInvalid = await formRef.value?.validate()
    if (isInvalid) return false
    if (isUpdate.value) {
      await updateJob(form, dataId.value)
      Message.success('修改成功')
    } else {
      await addJob(form)
      Message.success('新增成功')
    }
    emit('save-success')
    return true
  } catch (error) {
    return false
  }
}

// 触发类型切换
const triggerTypeChange = () => {
  switch (form.triggerType) {
    case 2:
      form.triggerInterval = 60
      break
    case 3:
      form.triggerInterval = ''
      break
  }
}
// 间隔时长
const triggerIntervalNumber = computed({
  get() {
    return Number(form.triggerInterval)
  },
  set(newValue) {
    form.triggerInterval = newValue.toString()
  }
})

// 新增切片参数
const onAddArgs = () => {
  args.value.push({ value: '' })
}
// 删除切片参数
const onDeleteArgs = (index) => {
  args.value.splice(index, 1)
}

defineExpose({ onAdd, onUpdate })
</script>

<style scoped lang="scss">
fieldset {
  padding: 15px 15px 0 15px;
  margin-bottom: 15px;
  border: 1px solid var(--color-neutral-3);
  border-radius: 3px;
}
fieldset legend {
  color: rgb(var(--gray-10));
  padding: 2px 5px 2px 5px;
  border: 1px solid var(--color-neutral-3);
  border-radius: 3px;
}

.args-container {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.args-item {
  display: flex;
  align-items: center;
  button {
    margin-bottom: 20px;
  }
}

.args-item > *:not(:last-child) {
  margin-right: 10px;
}

.add-button {
  align-self: flex-start;
  width: 100px;
}
</style>
