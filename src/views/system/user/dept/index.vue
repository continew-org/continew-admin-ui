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
          :data="(treeData as unknown as TreeNodeData[])"
          :field-names="{ key: 'id' }"
          show-line
          block-node
          default-expand-all
          :selected-keys="selectedKeys"
          @select="select"
        >
          <template #title="node">
            <a-trigger
              v-model:popup-visible="node.popupVisible"
              trigger="contextMenu"
              align-point
              animation-name="slide-dynamic-origin"
              auto-fit-transform-origin
              position="bl"
              scroll-to-close
            >
              <a-tooltip v-if="node.description" :content="node.description" background-color="rgb(var(--primary-6))" position="right">
                <div @contextmenu="onContextmenu(node)">{{ node.name }}</div>
              </a-tooltip>
              <div v-else @contextmenu="onContextmenu(node)">{{ node.name }}</div>
              <template #content>
                <RightMenu
                  v-if="has.hasPermOr(['system:dept:update', 'system:dept:delete'])"
                  :data="node"
                  @on-menu-item-click="onMenuItemClick"
                />
              </template>
            </a-trigger>
          </template>
        </a-tree>
      </div>
    </div>
  </div>
  <DeptAddModal ref="DeptAddModalRef" @save-success="getTreeData" />
</template>

<script setup lang="tsx">
import type { Message, Modal, TreeInstance, TreeNodeData } from '@arco-design/web-vue'
import { mapTree } from 'xe-utils'
import DeptAddModal from '../../dept/DeptAddModal.vue'
import RightMenu from './RightMenu.vue'
import { type DeptQuery, type DeptResp, deleteDept, listDept } from '@/apis'
import has from '@/utils/has'

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

const queryForm = reactive<DeptQuery>({
  sort: ['parentId,asc', 'sort,asc', 'createTime,desc']
})

interface TreeItem extends DeptResp {
  popupVisible: boolean
}
const treeRef = ref<TreeInstance>()
const treeData = ref<TreeItem[]>([])
const loading = ref(false)
// 查询树列表
const getTreeData = async (query: DeptQuery = { ...queryForm }) => {
  try {
    loading.value = true
    const { data } = await listDept(query)
    treeData.value = mapTree(data, (i) => ({
      ...i,
      popupVisible: false,
      switcherIcon: (node: any) => {
        if (!node.isLeaf) {
          return <icon-caret-down />
        }
        return <icon-idcard />
      }
    }))
    await nextTick(() => {
      treeRef.value?.expandAll(true)
      select([data[0].id])
    })
  } finally {
    loading.value = false
  }
}

// 树查询
const inputValue = ref('')
watch(inputValue, (val) => {
  queryForm.description = val
  getTreeData()
})

// 保存当前右键的节点
const contextmenuNode = ref<TreeItem | null>(null)
const onContextmenu = (node: TreeItem) => {
  contextmenuNode.value = node
}

// 关闭右键菜单弹框
const closeRightMenuPopup = () => {
  if (contextmenuNode.value?.popupVisible) {
    contextmenuNode.value.popupVisible = false
  }
}

const DeptAddModalRef = ref<InstanceType<typeof DeptAddModal>>()
// 右键菜单项点击
const onMenuItemClick = (mode: string, node: DeptResp) => {
  closeRightMenuPopup()
  if (mode === 'add') {
    DeptAddModalRef.value?.onAdd(node.id)
  } else if (mode === 'update') {
    DeptAddModalRef.value?.onUpdate(node.id)
  } else if (mode === 'delete') {
    Modal.warning({
      title: '提示',
      content: `是否确定删除 [${node.name}]？`,
      hideCancel: false,
      okButtonProps: { status: 'danger' },
      onBeforeOk: async () => {
        try {
          const res = await deleteDept(node.id)
          if (res.success) {
            Message.success('删除成功')
            getTreeData()
          }
          return res.success
        } catch (error) {
          return false
        }
      }
    })
  }
}

onMounted(() => {
  getTreeData()
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
