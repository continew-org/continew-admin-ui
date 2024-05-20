<template>
  <a-form ref="formRef" :model="form" :rules="rules" size="small" :auto-label-width="true" label-align="left"
    :layout="width >= 500 ? 'horizontal' : 'vertical'" :disabled="!isUpdate" scroll-to-first-error
    style="margin-top: 10px">
    <a-list size="small" :bordered="false">
      <a-list-item>
        <a-form-item :label="securityConfig.PASSWORD_ERROR_LOCK_COUNT.name" field="PASSWORD_ERROR_LOCK_COUNT"
          :help="securityConfig.PASSWORD_ERROR_LOCK_COUNT.description" hide-asterisk>
          <a-input-number v-model="form.PASSWORD_ERROR_LOCK_COUNT" class="input-width" :default-value="0" :precision="0"
            :min="0" :max="10">
            <template #append>次</template>
          </a-input-number>
        </a-form-item>
      </a-list-item>
      <a-list-item>
        <a-form-item :label="securityConfig.PASSWORD_ERROR_LOCK_MINUTES.name" field="PASSWORD_ERROR_LOCK_MINUTES"
          :help="securityConfig.PASSWORD_ERROR_LOCK_MINUTES.description" hide-asterisk>
          <a-input-number v-model="form.PASSWORD_ERROR_LOCK_MINUTES" class="input-width" :precision="0" :min="1"
            :max="1440">
            <template #append>分钟</template>
          </a-input-number>
        </a-form-item>
      </a-list-item>
      <a-list-item>
        <a-form-item :label="securityConfig.PASSWORD_EXPIRATION_DAYS.name" field="PASSWORD_EXPIRATION_DAYS"
          :help="securityConfig.PASSWORD_EXPIRATION_DAYS.description" hide-asterisk>
          <a-input-number v-model="form.PASSWORD_EXPIRATION_DAYS" class="input-width" :precision="0" :min="0"
            :max="999">
            <template #append>天</template>
          </a-input-number>
        </a-form-item>
      </a-list-item>
      <a-list-item>
        <a-form-item :label="securityConfig.PASSWORD_EXPIRATION_WARNING_DAYS.name"
          field="PASSWORD_EXPIRATION_WARNING_DAYS" :help="securityConfig.PASSWORD_EXPIRATION_WARNING_DAYS.description"
          hide-asterisk>
          <a-input-number v-model="form.PASSWORD_EXPIRATION_WARNING_DAYS" class="input-width" :precision="0" :min="0"
            :max="998">
            <template #append>天</template>
          </a-input-number>
        </a-form-item>
      </a-list-item>
      <a-list-item>
        <a-form-item :label="securityConfig.PASSWORD_REUSE_POLICY.name" field="PASSWORD_REUSE_POLICY"
          :help="securityConfig.PASSWORD_REUSE_POLICY.description" hide-asterisk>
          <a-input-number v-model="form.PASSWORD_REUSE_POLICY" class="input-width" :precision="0" :min="3" :max="32">
            <template #append>次</template>
          </a-input-number>
        </a-form-item>
      </a-list-item>
      <a-list-item>
        <a-form-item :label="securityConfig.PASSWORD_MIN_LENGTH.name" field="PASSWORD_MIN_LENGTH"
          :help="securityConfig.PASSWORD_MIN_LENGTH.description" hide-asterisk>
          <a-input-number v-model="form.PASSWORD_MIN_LENGTH" class="input-width" :precision="0" :min="8" :max="32" />
        </a-form-item>
      </a-list-item>
      <a-list-item>
        <a-form-item :label="securityConfig.PASSWORD_ALLOW_CONTAIN_USERNAME.name"
          field="PASSWORD_ALLOW_CONTAIN_USERNAME">
          <a-switch v-model="form.PASSWORD_ALLOW_CONTAIN_USERNAME" type="round" :checked-value="1" :unchecked-value="0">
            <template #checked>是</template>
            <template #unchecked>否</template>
          </a-switch>
        </a-form-item>
      </a-list-item>
      <a-list-item>
        <a-form-item :label="securityConfig.PASSWORD_CONTAIN_SPECIAL_CHARACTERS.name"
          field="PASSWORD_CONTAIN_SPECIAL_CHARACTERS">
          <a-switch v-model="form.PASSWORD_CONTAIN_SPECIAL_CHARACTERS" type="round" :checked-value="1"
            :unchecked-value="0">
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
import { useForm } from '@/hooks'

defineOptions({ name: 'SecuritySetting' })
const { width } = useWindowSize()

const formRef = ref<FormInstance>()
const { form } = useForm({
  PASSWORD_ERROR_LOCK_COUNT: 0,
  PASSWORD_ERROR_LOCK_MINUTES: 0,
  PASSWORD_EXPIRATION_DAYS: 0,
  PASSWORD_EXPIRATION_WARNING_DAYS: 0,
  PASSWORD_REUSE_POLICY: 0,
  PASSWORD_MIN_LENGTH: 0,
  PASSWORD_ALLOW_CONTAIN_USERNAME: 0,
  PASSWORD_CONTAIN_SPECIAL_CHARACTERS: 0
})
const rules: FormInstance['rules'] = {
  PASSWORD_ERROR_LOCK_COUNT: [{ required: true, message: '请输入值' }],
  PASSWORD_ERROR_LOCK_MINUTES: [{ required: true, message: '请输入值' }],
  PASSWORD_EXPIRATION_DAYS: [{ required: true, message: '请输入值' }],
  PASSWORD_EXPIRATION_WARNING_DAYS: [
    { required: true, message: '请输入值' },
    {
      validator: (value, callback) => {
        if (form.PASSWORD_EXPIRATION_DAYS > 0 && value >= form.PASSWORD_EXPIRATION_DAYS) {
          callback('密码到期前的提示时间应小于密码有效期')
        } else {
          callback()
        }
      }
    }
  ],
  PASSWORD_REUSE_POLICY: [{ required: true, message: '请输入值' }],
  PASSWORD_MIN_LENGTH: [{ required: true, message: '请输入值' }]
}

const securityConfig = ref<SecurityConfig>({
  PASSWORD_ERROR_LOCK_COUNT: {},
  PASSWORD_ERROR_LOCK_MINUTES: {},
  PASSWORD_EXPIRATION_DAYS: {},
  PASSWORD_EXPIRATION_WARNING_DAYS: {},
  PASSWORD_REUSE_POLICY: {},
  PASSWORD_MIN_LENGTH: {},
  PASSWORD_ALLOW_CONTAIN_USERNAME: {},
  PASSWORD_CONTAIN_SPECIAL_CHARACTERS: {}
})
// 重置
const reset = () => {
  form.PASSWORD_ERROR_LOCK_COUNT = securityConfig.value.PASSWORD_ERROR_LOCK_COUNT.value || 0
  form.PASSWORD_ERROR_LOCK_MINUTES = securityConfig.value.PASSWORD_ERROR_LOCK_MINUTES.value || 0
  form.PASSWORD_EXPIRATION_DAYS = securityConfig.value.PASSWORD_EXPIRATION_DAYS.value || 0
  form.PASSWORD_EXPIRATION_WARNING_DAYS = securityConfig.value.PASSWORD_EXPIRATION_WARNING_DAYS.value || 0
  form.PASSWORD_REUSE_POLICY = securityConfig.value.PASSWORD_REUSE_POLICY.value || 0
  form.PASSWORD_MIN_LENGTH = securityConfig.value.PASSWORD_MIN_LENGTH.value || 0
  form.PASSWORD_ALLOW_CONTAIN_USERNAME = securityConfig.value.PASSWORD_ALLOW_CONTAIN_USERNAME.value || 0
  form.PASSWORD_CONTAIN_SPECIAL_CHARACTERS = securityConfig.value.PASSWORD_CONTAIN_SPECIAL_CHARACTERS.value || 0
}

const isUpdate = ref(false)
// 修改
const onUpdate = () => {
  isUpdate.value = true
}

// 取消
const handleCancel = () => {
  reset()
  isUpdate.value = false
}

const queryForm = {
  code: Object.keys(securityConfig.value)
}
// 查询列表数据
const getDataList = async () => {
  const { data } = await listOption(queryForm)
  securityConfig.value = data.reduce((obj: SecurityConfig, option: OptionResp) => {
    obj[option.code] = { ...option, value: Number.parseInt(option.value) }
    return obj
  }, {})
  handleCancel()
}

// 保存
const handleSave = async () => {
  const isInvalid = await formRef.value?.validate()
  if (isInvalid) return false
  await updateOption(
    Object.entries(form).map(([key, value]) => {
      return { code: key, value }
    })
  )
  await getDataList()
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
