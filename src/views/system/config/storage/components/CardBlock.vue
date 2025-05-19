<template>
  <a-card
    :bordered="true"
    size="small"
    class="card-block"
  >
    <template v-if="loading" #title>
      <a-skeleton :animation="true" class="card-block-skeleton">
        <a-skeleton-line :widths="['40%']" :rows="1" />
      </a-skeleton>
    </template>
    <template v-else #title>
      <div class="title">
        {{ data.name }} ({{ data.code }})
        <div v-if="data.isDefault" class="status">
          <a-tag size="small" color="arcoblue">
            <template #icon>
              <icon-check-circle-fill />
            </template>
            <span>默认存储</span>
          </a-tag>
        </div>
        <div v-if="has.hasPermOr(['system:storage:setDefault', 'system:storage:update', 'system:storage:delete'])" class="more">
          <a-dropdown>
            <icon-more />
            <template #content>
              <a-doption
                v-permission="['system:storage:setDefault']"
                :disabled="data.isDefault || data.status === 2"
                :title="data.isDefault ? '该存储已设为默认存储' : data.status === 2 ? '请先启用存储' : ''"
                @click="onSetDefault(data)"
              >
                <icon-check-circle />
                设为默认
              </a-doption>
              <a-doption v-permission="['system:storage:update']" @click="onUpdate(data)">
                <icon-edit />
                修改
              </a-doption>
              <a-doption
                v-permission="['system:storage:delete']"
                :disabled="data.isDefault"
                :title="data.isDefault ? '不允许删除默认存储' : ''"
                @click="onDelete(data)"
              >
                <icon-delete />
                删除
              </a-doption>
            </template>
          </a-dropdown>
        </div>
      </div>
      <div class="time">{{ data.createTime }}</div>
    </template>
    <div :class="data.type === 1 ? 'content' : 'content-large'">
      <slot name="content"></slot>
    </div>
    <div class="extra">
      <a-skeleton v-if="loading" :animation="true">
        <a-skeleton-line :rows="2" />
      </a-skeleton>
      <a-switch
        v-else
        v-model="status"
        :disabled="!has.hasPermOr(['system:storage:updateStatus']) || data.isDefault"
        :title="data.isDefault ? '不允许禁用默认存储' : ''"
        :loading="switchLoading"
        :checked-value="1"
        :unchecked-value="2"
        :before-change="onUpdateStatus"
      />
    </div>
  </a-card>

  <StorageAddModal ref="StorageAddModalRef" @save-success="search" />
</template>

<script lang="ts" setup>
import { Message, Modal } from '@arco-design/web-vue'
import StorageAddModal from '../StorageAddModal.vue'
import has from '@/utils/has'
import { type StorageResp, deleteStorage, setDefaultStorage, updateStorageStatus } from '@/apis/system'
import { useDict } from '@/hooks/app'

interface Props {
  loading: boolean
  data: StorageResp
}

const props = withDefaults(defineProps<Props>(), {})

const emit = defineEmits<{
  (e: 'save-success'): void
}>()

const search = () => {
  emit('save-success')
}

const { storage_type_enum } = useDict('storage_type_enum')
const storageType = computed(() => {
  return storage_type_enum.value.find((item) => item.value === props.data.type)?.label || '本地存储'
})

const status = ref(props.data.status)
const switchLoading = ref(false)
// 更新状态
const onUpdateStatus = async (newValue: number) => {
  const tip = newValue === 1 ? '启用' : '禁用'
  switchLoading.value = true
  Modal.warning({
    title: '提示',
    content: `是否确定${tip}${storageType.value}「${props.data.name}(${props.data.code})]？`,
    hideCancel: false,
    maskClosable: false,
    onCancel: async () => {
      switchLoading.value = false
      status.value = newValue === 1 ? 2 : 1
    },
    onBeforeOk: async () => {
      try {
        const res = await updateStorageStatus({
          status: newValue,
        }, props.data.id)
        if (res.success) {
          Message.success(`${tip}成功`)
          search()
        }
        return res.success
      } catch (error) {
        status.value = newValue === 1 ? 2 : 1
        return false
      } finally {
        switchLoading.value = false
      }
    },
  })
}

// 设为默认
const onSetDefault = (record: StorageResp) => {
  Modal.warning({
    title: '提示',
    content: `是否确定将${storageType.value}「${record.name}(${record.code})」设为默认存储？`,
    hideCancel: false,
    maskClosable: false,
    onBeforeOk: async () => {
      try {
        const res = await setDefaultStorage(record.id)
        if (res.success) {
          Message.success('设置成功')
          search()
        }
        return res.success
      } catch (error) {
        return false
      }
    },
  })
}

// 删除
const onDelete = (record: StorageResp) => {
  Modal.warning({
    title: '提示',
    content: `是否确定删除存储「${record.name}(${record.code})」？`,
    okButtonProps: { status: 'danger' },
    hideCancel: false,
    maskClosable: false,
    onBeforeOk: async () => {
      try {
        const res = await deleteStorage(record.id)
        if (res.success) {
          Message.success('删除成功')
          search()
        }
        return res.success
      } catch (error) {
        return false
      }
    },
  })
}

const StorageAddModalRef = ref<InstanceType<typeof StorageAddModal>>()

// 修改
const onUpdate = (record: StorageResp) => {
  StorageAddModalRef.value?.onUpdate(record.id)
}
</script>

<style scoped lang="less">
.card-block {
  margin-bottom: 16px;

  :deep(.arco-card-header) {
    border-bottom: none;
    height: auto;
    padding: 16px;
    padding-bottom: 0;
  }

  .title {
    display: flex;
    line-height: 24px;
    align-items: center;
    font-size: 14px;
    font-weight: 500;

    .icon {
      height: 24px;
      width: 24px;
      color: var(--color-white);
      background: #626aea;
      text-align: center;
      line-height: 24px;
      border-radius: 50%;
      margin-right: 8px;
    }

    .status {
      margin-left: 12px;
    }

    .more {
      color: var(--color-text-4);
      font-size: 16px;
      position: absolute;
      right: 16px;
      cursor: pointer;
      opacity: 0;
    }
  }

  .time,
  .content > :deep(.arco-typography),
  :deep(.arco-descriptions-item-label),
  :deep(.arco-descriptions-item-value) {
    font-size: 12px;
    font-weight: 400;
    color: var(--color-text-3);
    padding: 0;
    line-height: 20px;
  }

  :deep(.arco-descriptions-item-value) {
    color: var(--color-text-2);
    padding-left: 6px;
  }

  .content {
    height: 48px;
  }

  .content-large {
    height: 78px;
  }

  .extra {
    display: flex;
    flex-direction: row-reverse;
  }

  &-skeleton {
    :deep(.arco-skeleton-content .arco-skeleton-text-row:not(:last-child)) {
      height: 14px;
      margin-bottom: 8px;
    }
  }
}

.card-block:hover {
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 10%);

  .title {
    .more {
      opacity: 1;
    }
  }
}
</style>
