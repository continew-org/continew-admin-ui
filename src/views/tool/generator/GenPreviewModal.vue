<template>
  <a-modal
      v-model:visible="visible"
      :title="`生成 ${previewTableName} 表预览`"
      :mask-closable="false"
      :esc-to-close="false"
      width="90%"
      draggable
      :footer="false"
  >
    <div class="preview-content">
      <a-layout :has-sider="true">
        <a-layout-sider theme="dark" style="max-width:600px;height: 700px" :resize-directions="['right']" :width="500">
          <a-tree ref="treeRef" class="selectPreview"
                  :data="treeData"
                  default-expand-all
                  @select="onSelectPreview"
          >
            <template #icon=" node ">
              <GiSvgIcon v-if="!node.isLeaf && !node.expanded" :size="16" name="directory-blue" />
              <GiSvgIcon v-if="!node.isLeaf && node.expanded" :size="16" name="directory-open-blue" />
              <GiSvgIcon v-if="node.isLeaf && checkFileType(node.node.title, '.java')" :size="16" name="file-java" />
              <GiSvgIcon v-if="node.isLeaf && checkFileType(node.node.title, '.vue')" :size="16" name="file-vue" />
              <GiSvgIcon v-if="node.isLeaf && checkFileType(node.node.title, '.ts')" :size="16" name="file-typescript" />
              <GiSvgIcon v-if="node.isLeaf && checkFileType(node.node.title, '.js')" :size="16" name="file-javascript" />
              <GiSvgIcon v-if="node.isLeaf && checkFileType(node.node.title, '.json')" :size="16" name="file-json" />
              <GiSvgIcon v-if="node.isLeaf && checkFileType(node.node.title, 'pom.xml')" :size="16" name="file-maven" />
              <GiSvgIcon v-if="node.isLeaf && checkFileType(node.node.title, '.xml') && !checkFileType(node.node.title, 'pom.xml')" :size="16" name="file-xml" />
              <GiSvgIcon v-if="node.isLeaf && checkFileType(node.node.title, '.sql')" :size="16" name="file-sql" />
</template>
          </a-tree>
        </a-layout-sider>
        <a-layout-content>
          <a-card :header-style="{ height: '50px' }">
            <template #title> {{ currentPreview?.path }}\{{ currentPreview?.fileName }}</template>
            <template #extra>
              <a-button-group type="outline" size="small">
                <a-button @click="onCopy">
                  <template #icon>
                    <icon-copy />
                  </template>
                </a-button>
                <a-button @click="gen">
                  <template #icon>
                    <icon-download />
                  </template>
                </a-button>
              </a-button-group>
            </template>
            <a-scrollbar style="height: 650px; overflow: auto">
              <GiCodeView
                  :type="'vue' === currentPreview?.fileName.split('.')[1] ? 'vue' : 'javascript'"
                  :code-json="currentPreview?.content"
              />
            </a-scrollbar>
          </a-card>
        </a-layout-content>
      </a-layout>
    </div>
  </a-modal>
</template>

<script setup lang="ts">
import { Message, type TreeNodeData } from '@arco-design/web-vue'
import { useClipboard } from '@vueuse/core'
import { type GeneratePreviewResp, genPreview } from '@/apis'

// 生成
const emit = defineEmits<{ (e: 'generate', tableNames: string[]): void }>()
const { copy, copied } = useClipboard()
const currentPreview = ref<GeneratePreviewResp>()
const genPreviewList = ref<GeneratePreviewResp[]>([])

const visible = ref(false)
const treeData = ref<TreeNodeData[]>([])
const previewTableName = ref<string>('')
const treeRef = ref()
const mergeDir = async (parent: TreeNodeData) => {
  // 合并目录
  if (parent.children?.length === 1 && typeof parent.children[0].key === 'number') {
    const mergeTitle = mergeDir(parent.children[0])
    if (mergeTitle !== '') {
      parent.title = `${parent.title}/${mergeTitle}`
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

  await nextTick(() => {
    treeRef.value?.expandAll(true)
  })
  return ''
}
const expandKeys = ref<any[]>([])
const pushDir = (children: TreeNodeData[] | undefined, treeNode: TreeNodeData) => {
  if (children) {
    for (const child of children) {
      if (child.title === treeNode.title) {
        return child.children
      }
    }
  }
  children?.push(treeNode)
  expandKeys.value.push(treeNode.key)
  return treeNode.children
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
const gen = () => {
  emit('generate', [previewTableName.value])
}
// 校验文件类型
const checkFileType = (title: string, type: string) => {
  return title.endsWith(type)
}

defineExpose({ onPreview })
</script>

<style scoped>
.preview-content :deep(.arco-layout-sider) {
  min-width: 200px;
  white-space: nowrap;
}
</style>
