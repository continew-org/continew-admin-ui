<template>
  <a-modal v-model:visible="visible" title="任务日志详情" :width="width >= 1500 ? 1500 : '100%'" :footer="false"
    @close="closed">
    <div style="display: flex; min-height: 600px;">
      <div style="padding: 10px 10px;">
        <div class="job_list">
          <div :class="`job_list_item ${item.id === activeId ? 'active' : ''}`" v-for="item in dataList" :key="item.id"
            @click="onStartInfo(item)">
            <div class="content">
              <span class="title">{{ item.clientInfo.split('@')[1] }}</span>
              <span class="status">
                <a-tag bordered :color="statusList[item.taskStatus].color">{{ statusList[item.taskStatus].title
                  }}</a-tag>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div>
        <GiCodeView :code-json="content" />
      </div>
    </div>

  </a-modal>
</template>

<script setup lang="ts">
import { useWindowSize } from '@vueuse/core'
import { type JobInstanceQuery, type JobInstanceResp, type JobLogResp, listJobInstance, listJobInstanceLog } from '@/apis'
import dayjs from "dayjs";

const { width } = useWindowSize()
const queryForm = reactive<JobInstanceQuery>({})
const dataList = ref<JobInstanceResp[]>([])
const loading = ref(false)
const activeId = ref<string | number>('')
const statusList = {
  '1': {
    title: '待处理',
    color: 'gray'
  },
  '2': {
    title: '运行中',
    color: 'cyan'
  },
  '3': {
    title: '成功',
    color: 'green'
  },
  '4': {
    title: '已失败',
    color: 'red'
  },
  '5': {
    title: '已停止',
    color: 'purple'
  },
  '6': {
    title: '已取消',
    color: 'orange'
  }
}


const visible = ref(false)

// 格式化日志
const formatLog = (log: any) => {
  const date = new Date(Number.parseInt(log.time_stamp))
  return `${dayjs(date).format('YYYY-MM-DD HH:mm:ss')} ${log.level} [${log.thread}] ${log.location} - ${log.message}`
}

const content = ref('')
const setIntervalNode = ref<NodeJS.Timeout>()


// 详情
const onDetail = (record: JobLogResp) => {
  visible.value = true
  // 更新 queryForm
  queryForm.jobId = record.jobId
  queryForm.taskBatchId = record.id
  getInstanceList()
}

// 日志输出
const onLogDetail = async (record: JobInstanceResp) => {
  activeId.value = record?.id
  // todo startId根据第一次查询 如果有返回!=0则需要在查一次
  const res = await listJobInstanceLog({
    taskBatchId: record.taskBatchId,
    jobId: record.jobId,
    taskId: record.id,
    startId: 0,
    fromIndex: 0,
    size: 50
  })
  content.value = res.data.message.map(formatLog).join('\n')
}
const onStartInfo = (record: JobInstanceResp) => {
  content.value = ''
  clearInterval(setIntervalNode.value)
  setIntervalNode.value = setInterval(() => {
    onLogDetail(record)
  }, 1000)
}
// 查询列表数据
const getInstanceList = async (query: JobInstanceQuery = { ...queryForm }) => {
  try {
    loading.value = true
    const res = await listJobInstance(query)
    dataList.value = res.data
    onStartInfo(dataList.value[0])
  } finally {
    loading.value = false
  }
}
const closed = () => {
  clearInterval(setIntervalNode.value)
}
onUnmounted(() => {
  clearInterval(setIntervalNode.value)
})
defineExpose({ onDetail })
</script>

<style scoped lang="scss">
.job_list {
  position: relative;
  width: 100%;
  border: 1px solid var(--color-neutral-3);

  .job_list_item {
    padding: 8px 10px;
    cursor: pointer;

    &:not(:last-child) {
      border-bottom: 2px dashed var(--color-neutral-3);
    }

    &:hover {
      background-color: var(--color-neutral-2);
    }

    .content {
      display: flex;
      justify-content: space-between;
      justify-items: center;

      .title {
        margin-right: 20px;
      }
    }
  }

  .active {
    border-bottom: 2px solid $color-theme !important;
    background-color: var(--color-neutral-3) !important;
  }
}
</style>
