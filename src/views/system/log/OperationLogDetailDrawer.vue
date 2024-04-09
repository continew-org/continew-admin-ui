<template>
  <a-drawer v-model:visible="visible" title="日志详情" :width="720" :footer="false">
    <a-descriptions title="基本信息" :column="2" size="large" class="general-description">
      <a-descriptions-item label="日志 ID">{{ operationLog?.id }}</a-descriptions-item>
      <a-descriptions-item label="Trace ID">{{ operationLog?.traceId }}</a-descriptions-item>
      <a-descriptions-item label="操作人">{{ operationLog?.createUserString }}</a-descriptions-item>
      <a-descriptions-item label="操作时间">{{ operationLog?.createTime }}</a-descriptions-item>
      <a-descriptions-item label="操作内容">{{ operationLog?.description }}</a-descriptions-item>
      <a-descriptions-item label="所属模块">{{ operationLog?.module }}</a-descriptions-item>
      <a-descriptions-item label="操作 IP">{{ operationLog?.ip }}</a-descriptions-item>
      <a-descriptions-item label="操作地点">{{ operationLog?.address }}</a-descriptions-item>
      <a-descriptions-item label="浏览器">{{ operationLog?.browser }}</a-descriptions-item>
      <a-descriptions-item label="终端系统">{{ operationLog?.os }}</a-descriptions-item>
      <a-descriptions-item label="状态">
        <a-tag v-if="operationLog?.status === 1" color="green">成功</a-tag>
        <a-tag v-else color="red">失败</a-tag>
      </a-descriptions-item>
      <a-descriptions-item label="耗时">
        <a-tag v-if="operationLog?.timeTaken > 500" color="red">
          {{ operationLog?.timeTaken }}ms
        </a-tag>
        <a-tag v-else-if="operationLog?.timeTaken > 200" color="orange">
          {{ operationLog?.timeTaken }}ms
        </a-tag>
        <a-tag v-else color="green">{{ operationLog?.timeTaken }} ms</a-tag>
      </a-descriptions-item>
      <a-descriptions-item label="请求 URI" :span="2">
        {{ operationLog?.requestUrl }}
      </a-descriptions-item>
    </a-descriptions>
    <a-descriptions
      title="响应信息"
      :column="2"
      size="large"
      class="general-description http"
      style="margin-top: 20px; position: relative"
    >
      <a-descriptions-item :span="2">
        <a-tabs type="card">
          <a-tab-pane key="1" title="响应头">
            <VueJsonPretty
              v-if="operationLog?.responseHeaders"
              :path="'res'"
              :data="JSON.parse(operationLog?.responseHeaders)"
              :show-length="true"
            />
            <span v-else>无</span>
          </a-tab-pane>
          <a-tab-pane key="2" title="响应体">
            <VueJsonPretty
              v-if="operationLog?.responseBody"
              :path="'res'"
              :data="JSON.parse(operationLog?.responseBody)"
              :show-length="true"
            />
            <span v-else>无</span>
          </a-tab-pane>
        </a-tabs>
      </a-descriptions-item>
    </a-descriptions>
    <a-descriptions
      title="请求信息"
      :column="2"
      size="large"
      class="general-description http"
      style="margin-top: 20px; position: relative"
    >
      <a-descriptions-item :span="2">
        <a-tabs type="card">
          <a-tab-pane key="1" title="请求头">
            <VueJsonPretty
              v-if="operationLog?.requestHeaders"
              :path="'res'"
              :data="JSON.parse(operationLog?.requestHeaders)"
              :show-length="true"
            />
            <span v-else>无</span>
          </a-tab-pane>
          <a-tab-pane key="2" title="请求体">
            <VueJsonPretty
              v-if="operationLog?.requestBody"
              :path="'res'"
              :data="JSON.parse(operationLog?.requestBody)"
              :show-length="true"
            />
            <span v-else>无</span>
          </a-tab-pane>
        </a-tabs>
      </a-descriptions-item>
    </a-descriptions>
  </a-drawer>
</template>

<script lang="ts" setup>
import { getLog, type LogDetailResp } from '@/apis'
import VueJsonPretty from 'vue-json-pretty'
import 'vue-json-pretty/lib/styles.css'

const logId = ref('')
const operationLog = ref<LogDetailResp | null>()
// 查询详情
const getOperationLogDetail = async () => {
  const res = await getLog(logId.value)
  operationLog.value = res.data
}

const visible = ref(false)
// 打开详情
const open = async (id: string) => {
  logId.value = id
  await getOperationLogDetail()
  visible.value = true
}

defineExpose({ open })
</script>

<style lang="scss" scoped>
.http :deep(.arco-descriptions-item-label-block) {
  padding-right: 0;
}

:deep(.arco-tabs-content) {
  padding-top: 5px;
  padding-left: 15px;
}
</style>
