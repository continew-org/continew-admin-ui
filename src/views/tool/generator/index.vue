<template>
  <div class="table-page">
    <GiTable
      row-key="tableName"
      title="代码生成"
      :data="dataList"
      :columns="columns"
      :loading="loading"
      :scroll="{ x: '100%', y: '100%', minWidth: 1000 }"
      :pagination="pagination"
      :disabled-tools="['size', 'setting']"
      :disabled-column-keys="['tableName']"
      @refresh="search"
    >
      <template #custom-left>
        <a-input v-model="queryForm.tableName" placeholder="请输入表名称" allow-clear @change="search">
          <template #prefix><icon-search /></template>
        </a-input>
        <a-button @click="reset">重置</a-button>
      </template>
      <template #action="{ record }">
        <a-space>
          <a-link @click="onConfig(record.tableName, record.comment)">配置</a-link>
          <a-link
            :title="record.isConfiged ? '生成' : '请先进行生成配置'"
            :disabled="!record.isConfiged"
            @click="onPreview(record.tableName)"
          >
            生成
          </a-link>
        </a-space>
      </template>
    </GiTable>

    <GenConfigDrawer ref="GenConfigDrawerRef" @save-success="search" />
    <GenPreviewModal ref="GenPreviewModalRef" @generate="onGenerate" />
  </div>
</template>

<script setup lang="ts">
import GenConfigDrawer from './GenConfigDrawer.vue'
import GenPreviewModal from './GenPreviewModal.vue'
import { generate, listGenerator } from '@/apis'
import type { TableInstanceColumns } from '@/components/GiTable/type'
import { useTable } from '@/hooks'
import { isMobile } from '@/utils'

defineOptions({ name: 'Generator' })

const queryForm = reactive({
  tableName: undefined,
  sort: ['createTime,desc']
})

const {
  tableData: dataList,
  loading,
  pagination,
  search
} = useTable((page) => listGenerator({ ...queryForm, ...page }), { immediate: true })

const columns: TableInstanceColumns[] = [
  {
    title: '序号',
    width: 66,
    align: 'center',
    render: ({ rowIndex }) => h('span', {}, rowIndex + 1 + (pagination.current - 1) * pagination.pageSize)
  },
  { title: '表名称', dataIndex: 'tableName', width: 225 },
  { title: '描述', dataIndex: 'comment', tooltip: true },
  { title: '存储引擎', dataIndex: 'engine', align: 'center' },
  { title: '字符集', dataIndex: 'charset' },
  { title: '创建时间', dataIndex: 'createTime', width: 180 },
  { title: '操作', slotName: 'action', width: 180, align: 'center', fixed: !isMobile() ? 'right' : undefined }
]

// 重置
const reset = () => {
  queryForm.tableName = undefined
  search()
}

const GenConfigDrawerRef = ref<InstanceType<typeof GenConfigDrawer>>()
// 配置
const onConfig = (tableName: string, comment: string) => {
  GenConfigDrawerRef.value?.onConfig(tableName, comment)
}

const GenPreviewModalRef = ref<InstanceType<typeof GenPreviewModal>>()
// 预览
const onPreview = (tableName: string) => {
  GenPreviewModalRef.value?.onPreview(tableName)
}

// 生成
const onGenerate = async (tableNames: Array<string>) => {
  const res = await generate(tableNames)
  const contentDisposition = res.headers['content-disposition']
  const pattern = /filename=([^;]+\.[^.;]+);*/
  const result = pattern.exec(contentDisposition) || ''
  // 对名字进行解码
  const fileName = window.decodeURI(result[1])
  // 创建下载的链接
  const blob = new Blob([res.data])
  const downloadElement = document.createElement('a')
  const href = window.URL.createObjectURL(blob)
  downloadElement.style.display = 'none'
  downloadElement.href = href
  // 下载后文件名
  downloadElement.download = fileName
  document.body.appendChild(downloadElement)
  // 点击下载
  downloadElement.click()
  // 下载完成，移除元素
  document.body.removeChild(downloadElement)
  // 释放掉 blob 对象
  window.URL.revokeObjectURL(href)
}
</script>

<style></style>
