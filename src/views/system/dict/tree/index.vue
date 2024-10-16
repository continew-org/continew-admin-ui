<template>
  <div class="dict-tree">
    <div class="dict-tree__search">
      <a-input v-model="inputValue" :placeholder="props.placeholder" allow-clear>
        <template #prefix><icon-search /></template>
      </a-input>
      <a-button v-permission="['system:dict:add']" type="primary" @click="onAdd">
        <template #icon><icon-plus /></template>
      </a-button>
    </div>
    <div class="dict-tree__container">
      <div class="dict-tree__tree">
        <a-tree :data="(treeData as unknown as TreeNodeData[])" :field-names="{ key: 'id' }" block-node
          @select="select">
          <template #title="node">
            <a-typography-paragraph
              :ellipsis="{
                rows: 1,
                showTooltip: true,
                css: true,
              }"
            >
              {{ node.name }} ({{ node.code }})
            </a-typography-paragraph>
          </template>
          <template #extra="node">
            <a-trigger trigger="click" align-point animation-name="slide-dynamic-origin" auto-fit-transform-origin position="bl" scroll-to-close>
              <icon-more-vertical v-if="has.hasPermOr(['system:dict:update', 'system:dict:delete'])" class="action" />
              <template #content>
                <RightMenu :data="node" @on-menu-item-click="onMenuItemClick" />
              </template>
            </a-trigger>
          </template>
        </a-tree>
      </div>
</div>

  <DictAddModal ref="DictAddModalRef" @save-success="getTreeData" />
</div>
</template>

<script setup lang="tsx">
import { Message, Modal } from '@arco-design/web-vue'
import type { TreeNodeData } from '@arco-design/web-vue'
import { mapTree } from 'xe-utils'
import DictAddModal from './DictAddModal.vue'
import RightMenu from './RightMenu.vue'
import { type DictQuery, type DictResp, deleteDict, listDict } from '@/apis/system'
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

const selectKey = ref()
// 选中节点
const select = (keys: Array<any>) => {
  if (selectKey.value === keys[0]) {
    return
  }
  selectKey.value = keys[0]
  emit('node-click', keys)
}

const queryForm = reactive<DictQuery>({
  sort: ['createTime,asc']
})

interface TreeItem extends DictResp {
  popupVisible: boolean
}
const treeData = ref<TreeItem[]>([])
const loading = ref(false)
// 查询树列表
const getTreeData = async (query: DictQuery = { ...queryForm }) => {
  try {
    loading.value = true
    const { data } = await listDict(query)
    treeData.value = mapTree(data, (i) => ({
      ...i,
      popupVisible: false,
      icon: () => {
        return null
      }
    }))
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

const DictAddModalRef = ref<InstanceType<typeof DictAddModal>>()
// 新增
const onAdd = () => {
  DictAddModalRef.value?.onAdd()
}

// 点击菜单项
const onMenuItemClick = (mode: string, node: DictResp) => {
  if (mode === 'update') {
    DictAddModalRef.value?.onUpdate(node.id)
  } else if (mode === 'delete') {
    Modal.warning({
      title: '提示',
      content: `是否确定删除 [${node.name}]？`,
      hideCancel: false,
      okButtonProps: { status: 'danger' },
      onBeforeOk: async () => {
        try {
          const res = await deleteDict(node.id)
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
:deep(.arco-tree-node) {
  line-height: normal;
  border-radius: var(--border-radius-medium);
  margin: 5px 0;
  .action {
    opacity: 0;
  }
  &:hover {
    background-color: var(--color-secondary-hover);
    .action {
      opacity: 1;
    }
  }

  .arco-tree-node-switcher {
    width: 0;
    margin-right: 0;
  }

  .arco-tree-node-title {
    &:hover {
      background-color: transparent;
    }
  }

  .arco-tree-node-title-text {
    width: 100%;
    white-space: normal;
    overflow-wrap: anywhere;
  }
}

:deep(.arco-tree-node-selected) {
  font-weight: bold;
  background-color: rgba(var(--primary-6), 0.1);
  .arco-typography {
    color: rgb(var(--primary-6));
  }
}

.dict-tree {
  flex: 1;
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  height: 100%;

  &__search {
    display: flex;
    justify-content: start;
    margin-bottom: 8px;
    .arco-btn {
      margin-left: 8px;
      padding: 0 15px;
    }
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
