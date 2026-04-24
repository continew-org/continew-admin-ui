<template>
  <a-drawer v-model:visible="visible" title="客户端详情" :width="width >= 600 ? 600 : '100%'" :footer="false">
    <a-descriptions :column="2" size="large" class="general-description">
      <a-descriptions-item label="ID">{{ dataDetail?.id }}</a-descriptions-item>
      <a-descriptions-item label="客户端ID" :span="2"><a-typography-paragraph :copyable="!!dataDetail?.clientId">{{ dataDetail?.clientId }}</a-typography-paragraph></a-descriptions-item>
      <a-descriptions-item label="客户端类型" :span="2">
        <GiCellTag :value="dataDetail?.clientType" :dict="client_type" />
      </a-descriptions-item>
      <a-descriptions-item label="认证类型" :span="2">
        <a-space>
          <GiCellTag v-for="(item, index) in dataDetail?.authType" :key="index" :value="item" :dict="auth_type_enum" />
        </a-space>
      </a-descriptions-item>
      <a-descriptions-item label="Token最低活跃频率">{{ dataDetail?.activeTimeout }}</a-descriptions-item>
      <a-descriptions-item label="Token有效期">{{ dataDetail?.timeout }}</a-descriptions-item>
      <a-descriptions-item label="启用Refresh Token">{{ dataDetail?.isEnableRefreshToken ? '是' : '否' }}</a-descriptions-item>
      <a-descriptions-item label="Refresh Token 有效期">{{ dataDetail?.refreshTokenTimeout }}</a-descriptions-item>
      <a-descriptions-item label="状态" :span="2">
        <a-tag v-if="dataDetail?.status === 1" color="green">启用</a-tag>
        <a-tag v-else color="red">禁用</a-tag>
      </a-descriptions-item>
      <a-descriptions-item label="多地登录">
        <a-tag v-if="dataDetail?.isConcurrent" color="blue">允许</a-tag>
        <a-tag v-else color="orange">不允许</a-tag>
      </a-descriptions-item>
      <a-descriptions-item label="下线范围">
        <GiCellTag :value="dataDetail?.replacedRange" :dict="replaced_range_enum" />
      </a-descriptions-item>
      <a-descriptions-item label="登录数量">
        {{ dataDetail?.maxLoginCount === -1 ? '不限制' : dataDetail?.maxLoginCount }}
      </a-descriptions-item>
      <a-descriptions-item label="溢出处理">
        <GiCellTag :value="dataDetail?.overflowLogoutMode" :dict="logout_mode_enum" />
      </a-descriptions-item>
      <a-descriptions-item label="创建人">{{ dataDetail?.createUserString }}</a-descriptions-item>
      <a-descriptions-item label="创建时间">{{ dataDetail?.createTime }}</a-descriptions-item>
      <a-descriptions-item label="更新人">{{ dataDetail?.updateUserString }}</a-descriptions-item>
      <a-descriptions-item label="更新时间">{{ dataDetail?.updateTime }}</a-descriptions-item>
    </a-descriptions>
  </a-drawer>
</template>

<script setup lang="ts">
import { useWindowSize } from '@vueuse/core'
import { type ClientDetailResp, getClient as getDetail } from '@/apis/system/client'
import { useDict } from '@/hooks/app'
import GiCellTag from '@/components/GiCell/GiCellTag.vue'

const {
  client_type,
  auth_type_enum,
  replaced_range_enum,
  logout_mode_enum,
} = useDict('client_type', 'auth_type_enum', 'replaced_range_enum', 'logout_mode_enum')

const { width } = useWindowSize()

const dataId = ref('')
const dataDetail = ref<ClientDetailResp>()
const visible = ref(false)

// 查询详情
const getDataDetail = async () => {
  const { data } = await getDetail(dataId.value)
  dataDetail.value = data
}

// 打开
const onOpen = async (id: string) => {
  dataId.value = id
  await getDataDetail()
  visible.value = true
}

defineExpose({ onOpen })
</script>

<style scoped lang="scss"></style>
