<template>
  <div class="left-tree">
    <div class="left-tree__search">
      <a-input v-model="searchKey" :placeholder="props.placeholder" allow-clear>
        <template #prefix><icon-search /></template>
      </a-input>
    </div>
    <div class="left-tree__container">
      <div class="left-tree__tree">
        <a-tree
          ref="treeRef"
          :data="treeData"
          show-line
          block-node
          default-expand-all
          :selected-keys="selectedKeys"
          @select="select"
        >
          <template #switcher-icon="node, { isLeaf }">
            <IconCaretDown v-if="!isLeaf" />
            <IconIdcard v-else />
          </template>
          <template #title="nodeData">
            <template v-if="index = getMatchIndex(nodeData?.title), index < 0">{{ nodeData?.title }}</template>
            <span v-else>{{ nodeData?.title?.substr(0, index) }}
              <span style="color: rgb(var(--arcoblue-6));">{{ nodeData?.title?.substr(index, searchKey.length) }}</span>
              {{ nodeData?.title?.substr(index + searchKey.length) }}
            </span>
          </template>
        </a-tree>
      </div>
    </div>
  </div>
</template>

<script setup lang="tsx">
import type { TreeInstance, TreeNodeData } from '@arco-design/web-vue'
import { ref } from 'vue'
import { useDept } from '@/hooks/app'

interface Props {
  placeholder?: string
}
const props = withDefaults(defineProps<Props>(), {
  placeholder: '请输入关键词'
})
const emit = defineEmits<{
  (e: 'node-click', keys: Array<any>): void
}>()
// 选中节点
const selectedKeys = ref()
const select = (keys: Array<any>) => {
  selectedKeys.value = keys
  emit('node-click', keys)
}

const treeRef = ref<TreeInstance>()
// 查询树列表
const { deptList, getDeptList } = useDept({
  onSuccess: () => {
    nextTick(() => {
      treeRef.value?.expandAll(true)
      select([deptList.value[0]?.key])
    })
  }
})

// 过滤树
const searchKey = ref('')
const search = (keyword: string) => {
  const loop = (data: TreeNodeData[]) => {
    const result = [] as TreeNodeData[]
    data.forEach((item: TreeNodeData) => {
      if (item.title?.toLowerCase().includes(keyword.toLowerCase())) {
        result.push({ ...item })
      } else if (item.children) {
        const filterData = loop(item.children)
        if (filterData.length) {
          result.push({
            ...item,
            children: filterData
          })
        }
      }
    })
    return result
  }
  return loop(deptList.value)
}

const treeData = computed(() => {
  if (!searchKey.value) return deptList.value
  return search(searchKey.value)
})

/**
 * 获取匹配索引
 * @param name 名称
 */
const getMatchIndex = (name: string) => {
  if (!searchKey.value) return -1
  return name.toLowerCase().indexOf(searchKey.value.toLowerCase())
}

onMounted(() => {
  getDeptList()
})
</script>

<style lang="scss" scoped>
:deep(.arco-tree-node-title-text) {
  width: 100%;
  white-space: nowrap;
}

:deep(.arco-tree-node) {
  line-height: normal;
  border-radius: var(--border-radius-medium);
  &:hover {
    background-color: var(--color-secondary-hover);
  }

  .arco-tree-node-title {
    &:hover {
      background-color: transparent;
    }
  }
}

:deep(.arco-tree-node-selected) {
  font-weight: bold;
  background-color: rgba(var(--primary-6), 0.1);
  &:hover {
    background-color: rgba(var(--primary-6), 0.1);
  }
}

.left-tree {
  flex: 1;
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  height: 100%;

  &__search {
    margin-bottom: 16px;
  }

  &__container {
    flex: 1;
    overflow: hidden;
    background-color: var(--color-bg-1);
    position: relative;
    height: 100%;
    margin-bottom:10px;
  }

  &__tree {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    overflow: auto
  }
}
</style>
