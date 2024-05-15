<template>
  <a-form
    ref="formRef"
    :model="form"
    size="small"
    :auto-label-width="true"
    label-align="left"
    :layout="width >= 500 ? 'horizontal' : 'vertical'"
    :disabled="!isUpdate"
    style="margin-top: 10px"
  >
    <a-list size="small" :bordered="false">
      <a-list-item>
        <a-form-item
          :label="form.PASSWORD_ERROR_LOCK_COUNT.name"
          field="PASSWORD_ERROR_LOCK_COUNT"
          :help="form.PASSWORD_ERROR_LOCK_COUNT.description"
        >
          <a-input-number v-model="form.PASSWORD_ERROR_LOCK_COUNT.value" class="input-width" :min="0" :max="10">
            <template #append>次</template>
          </a-input-number>
        </a-form-item>
      </a-list-item>
     <a-list-item>
        <a-form-item
          :label="form.PASSWORD_ERROR_LOCK_MINUTES.name"
          field="PASSWORD_ERROR_LOCK_MINUTES"
          :help="form.PASSWORD_ERROR_LOCK_MINUTES.description"
        >
          <a-input-number v-model="form.PASSWORD_ERROR_LOCK_MINUTES.value" class="input-width" :min="1" :max="1440">
            <template #append>分钟</template>
          </a-input-number>
        </a-form-item>
      </a-list-item>
      <a-list-item>
        <a-form-item
          :label="form.PASSWORD_EXPIRATION_WARNING_DAYS.name"
          field="PASSWORD_EXPIRATION_WARNING_DAYS"
          :help="form.PASSWORD_EXPIRATION_WARNING_DAYS.description"
        >
          <a-input-number v-model="form.PASSWORD_EXPIRATION_WARNING_DAYS.value" class="input-width" :min="0">
            <template #append>天</template>
          </a-input-number>
        </a-form-item>
      </a-list-item>
      <a-list-item>
        <a-form-item
          :label="form.PASSWORD_EXPIRATION_DAYS.name"
          field="PASSWORD_EXPIRATION_DAYS"
          :help="form.PASSWORD_EXPIRATION_DAYS.description"
        >
          <a-input-number v-model="form.PASSWORD_EXPIRATION_DAYS.value" class="input-width" :min="0" :max="999">
            <template #append>天</template>
          </a-input-number>
        </a-form-item>
      </a-list-item>
      <a-list-item>
        <a-form-item
          :label="form.PASSWORD_REUSE_POLICY.name"
          field="PASSWORD_REUSE_POLICY"
          :help="form.PASSWORD_REUSE_POLICY.description"
        >
          <a-input-number v-model="form.PASSWORD_REUSE_POLICY.value" class="input-width" :min="3" :max="32">
            <template #append>次</template>
          </a-input-number>
        </a-form-item>
      </a-list-item>
      <a-list-item>
        <a-form-item
          :label="form.PASSWORD_MIN_LENGTH.name"
          field="PASSWORD_MIN_LENGTH"
          :help="form.PASSWORD_MIN_LENGTH.description"
        >
          <a-input-number v-model="form.PASSWORD_MIN_LENGTH.value" class="input-width" :min="8" :max="32" />
        </a-form-item>
      </a-list-item>
      <a-list-item>
        <a-form-item
          :label="form.PASSWORD_ALLOW_CONTAIN_USERNAME.name"
          field="PASSWORD_ALLOW_CONTAIN_USERNAME"
        >
          <a-switch v-model="form.PASSWORD_ALLOW_CONTAIN_USERNAME.value" type="round" :checked-value="1" :unchecked-value="0">
            <template #checked>是</template>
            <template #unchecked>否</template>
          </a-switch>
        </a-form-item>
      </a-list-item>
      <a-list-item>
        <a-form-item
          :label="form.PASSWORD_CONTAIN_SPECIAL_CHARACTERS.name"
          field="PASSWORD_CONTAIN_SPECIAL_CHARACTERS"
        >
          <a-switch v-model="form.PASSWORD_CONTAIN_SPECIAL_CHARACTERS.value" type="round" :checked-value="1" :unchecked-value="0">
            <template #checked>是</template>
            <template #unchecked>否</template>
          </a-switch>
        </a-form-item>
      </a-list-item>
      <a-list-item>
        <a-space>
          <a-button v-if="!isUpdate" v-permission="['system:config:reset']" @click="onResetValue">
            <template #icon>
              <icon-undo />
            </template>
            恢复默认
          </a-button>
          <a-button v-if="!isUpdate" v-permission="['system:config:update']" type="primary" @click="onUpdate">
            <template #icon>
              <icon-edit />
            </template>
            修改
          </a-button>
          <a-button v-if="isUpdate" type="primary" @click="handleSave">
            <template #icon>
              <icon-save />
            </template>
            保存
          </a-button>
          <a-button v-if="isUpdate" @click="reset">
            <template #icon>
              <icon-refresh />
            </template>
            重置
          </a-button>
          <a-button v-if="isUpdate" @click="handleCancel">
            <template #icon>
              <icon-undo />
            </template>
            取消
          </a-button>
        </a-space>
      </a-list-item>
    </a-list>
  </a-form>
</template>

<script setup lang="ts">
import { useWindowSize } from '@vueuse/core'
import { type FormInstance, Message, Modal } from '@arco-design/web-vue'
import { type OptionResp, type SecurityConfig, listOption, resetOptionValue, updateOption } from '@/apis'

const { width } = useWindowSize()

const formRef = ref<FormInstance>()
const form = ref<SecurityConfig>({
  PASSWORD_ERROR_LOCK_COUNT: {},
  PASSWORD_ERROR_LOCK_MINUTES: {},
  PASSWORD_EXPIRATION_WARNING_DAYS: {},
  PASSWORD_EXPIRATION_DAYS: {},
  PASSWORD_REUSE_POLICY: {},
  PASSWORD_MIN_LENGTH: {},
  PASSWORD_ALLOW_CONTAIN_USERNAME: {},
  PASSWORD_CONTAIN_SPECIAL_CHARACTERS: {}
})

const queryForm = {
  code: Object.keys(form.value)
}
// 查询列表数据
const getDataList = async () => {
  const { data } = await listOption(queryForm)
  form.value = data.reduce((obj: SecurityConfig, option: OptionResp) => {
    obj[option.code] = { ...option, value: Number.parseInt(option.value) }
    return obj
  }, {})
}

const isUpdate = ref(false)
// 修改
const onUpdate = () => {
  isUpdate.value = true
}

// 重置
const reset = () => {
  getDataList()
}

// 取消
const handleCancel = () => {
  reset()
  isUpdate.value = false
}

// 保存
const handleSave = async () => {
  await updateOption(
    Object.entries(form.value).map(([key, value]) => {
      return { code: key, value: value.value }
    })
  )
  handleCancel()
  Message.success('保存成功')
}

// 恢复默认
const handleResetValue = async () => {
  await resetOptionValue(queryForm)
  Message.success('恢复成功')
  await getDataList()
}
const onResetValue = () => {
  Modal.warning({
    title: '警告',
    content: '确认恢复基础配置为默认值吗？',
    hideCancel: false,
    maskClosable: false,
    onOk: handleResetValue
  })
}

onMounted(() => {
  getDataList()
})
</script>

<style lang="scss" scoped>
:deep(.arco-list-item:not(:last-child)) {
  border-bottom: none;
}

.input-width {
  width: 130px;
}
</style>
