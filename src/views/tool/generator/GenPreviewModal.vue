<template>
  <a-modal
    v-model:visible="visible"
    title="生成预览"
    :mask-closable="false"
    :esc-to-close="false"
    width="90%"
    :footer="false"
  >
    <template #title>
      <a-button type="primary" status="success" size="medium" title="生成预览" @click="onGenerate()">
        <template #icon><icon-download /></template>生成 {{ previewTableName }} 表
      </a-button>
    </template>
    <div class="preview-content">
      <a-layout>
        <a-layout-sider theme="dark" :resize-directions="['right']" style="height: 700px">
          <a-tree class="selectPreview" :data="treeData" :show-line="true" @select="onSelectPreview" />
        </a-layout-sider>
        <a-layout-content>
          <a-scrollbar style="height: 700px; overflow: auto">
            <a-link style="position: absolute; right: 20px; top: 50px; z-index: 999" @click="onCopy">
              <template #icon>
                <icon-copy size="large" />
              </template>
              复制
            </a-link>
            <a-card :title="currentPreview?.fileName">
              <GiCodeView
                :type="'vue' === currentPreview?.fileName.split('.')[1] ? 'vue' : 'javascript'"
                :code-json="currentPreview?.content"
              />
            </a-card>
          </a-scrollbar>
        </a-layout-content>
      </a-layout>
    </div>
  </a-modal>
</template>

<script setup lang="ts">
import { genPreview, type GeneratePreviewResp, generate } from '@/apis'
import { Message, type TreeNodeData } from '@arco-design/web-vue'
import { useClipboard } from '@vueuse/core'

const { copy, copied } = useClipboard()
const currentPreview = ref<GeneratePreviewResp>()
const genPreviewList = ref<GeneratePreviewResp[]>([])

const visible = ref(false)
const treeData = ref<TreeNodeData[]>([])
const previewTableName = ref<string>('')

// 打开
const onPreview = async (tableName: string) => {
  treeData.value = []
  previewTableName.value = tableName
  const res = await genPreview(tableName)
  genPreviewList.value = res.data
  for (const genPreview of genPreviewList.value) {
    assembleTree(genPreview)
  }
  for (const valueElement of treeData.value) {
    mergeDir(valueElement)
  }
  currentPreview.value = genPreviewList.value[0]
  visible.value = true
}

// 自增的一个key 因为key相同的节点会出现一些问题
let autoIncrementKey = 0
// 将生成的目录组装成树结构
const assembleTree = (genPreview: GeneratePreviewResp) => {
  const paths: string[] = genPreview.path.split('\\')
  let tempChildren: TreeNodeData[] | undefined = treeData.value
  for (const path of paths) {
    // 向treeData中推送目录,如果该级目录有那么不推送进行下级的合并
    tempChildren = pushDir(tempChildren, { title: path, key: autoIncrementKey++, children: new Array<TreeNodeData>() })
  }
  tempChildren?.push({ title: genPreview.fileName, key: genPreview.fileName, children: new Array<TreeNodeData>() })
}

const pushDir = (children: TreeNodeData[] | undefined, treeNode: TreeNodeData) => {
  if (children) {
    for (const child of children) {
      if (child.title === treeNode.title) {
        return child.children
      }
    }
  }
  children?.push(treeNode)
  return treeNode.children
}

const mergeDir = (parent: TreeNodeData) => {
  // 合并目录
  if (parent.children?.length == 1 && typeof parent.children[0].key === 'number') {
    const mergeTitle = mergeDir(parent.children[0])
    if (mergeTitle != '') {
      parent.title = parent.title + '/' + mergeTitle
    }
    parent.children = parent.children[0].children
    return parent.title
  }
  // 合并子目录
  if (parent?.children) {
    for (const child of parent.children) {
      mergeDir(child)
    }
  }
  return ''
}

// 选择文件预览
const onSelectPreview = (selectedKeys) => {
  if (typeof selectedKeys[0] === 'string') {
    currentPreview.value = genPreviewList.value.filter((p) => p.fileName === selectedKeys[0])[0]
  }
}

// 复制
const onCopy = () => {
  if (currentPreview.value) {
    copy(currentPreview.value?.content)
  }
}
watch(copied, () => {
  if (copied.value) {
    Message.success('复制成功')
  }
})

// 生成
const onGenerate = async () => {
  const res = await generate([previewTableName.value])
  const contentDisposition = res.headers['content-disposition']
  const pattern = new RegExp('filename=([^;]+\\.[^\.;]+);*')
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

defineExpose({ onPreview })
</script>

<style scoped>
.preview-content :deep(.arco-layout-sider) {
  min-width: 200px;
  white-space: nowrap;
}
</style>
