<template>
  <div class="left-tree">
    <div class="left-tree__search">
      <a-input v-model="inputValue" :placeholder="props.placeholder" allow-clear>
        <template #prefix><icon-search /></template>
      </a-input>
    </div>
    <div class="left-tree__container">
      <div class="left-tree__tree">
        <a-tree
          ref="treeRef"
          :data="deptList"
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
        </a-tree>
      </div>
    </div>
  </div>
</template>

<script setup lang="tsx">
import type { TreeInstance } from '@arco-design/web-vue'
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

// 树查询
const inputValue = ref('')
watch(inputValue, (val) => {
  getDeptList(val)
})

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
    margin-bottom: 10px;
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
