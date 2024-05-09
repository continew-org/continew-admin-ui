<template>
  <a-form style="margin-top: 20px" ref="formRef" :model="form" size="small" label-align="left" :disabled="!isUpdate">
    <a-list size="small" :bordered="false">
      <a-list-item style="border: none">
        <a-form-item
          :help="form.password_expiration_days.description"
          :label="form.password_expiration_days.name"
          field="password_expiration_days"
        >
          <a-input-number class="input-width" :min="0" :max="999" v-model="form.password_expiration_days.value">
            <template #append>天</template>
          </a-input-number>
        </a-form-item>
      </a-list-item>
      <a-list-item style="border: none">
        <a-form-item :help="form.password_min_length.description" :label="form.password_min_length.name">
          <a-input-number class="input-width" :min="8" :max="32" v-model="form.password_min_length.value" />
        </a-form-item>
      </a-list-item>
      <a-list-item style="border: none">
        <a-form-item :help="form.password_update_interval.description" :label="form.password_update_interval.name">
          <a-input-number class="input-width" :min="0" :max="9999" v-model="form.password_update_interval.value">
            <template #append>分钟</template>
          </a-input-number>
        </a-form-item>
      </a-list-item>
      <a-list-item style="border: none">
        <a-form-item :help="form.password_error_count.description" :label="form.password_error_count.name">
          <a-input-number class="input-width" :min="0" :max="9999" v-model="form.password_error_count.value" />
        </a-form-item>
      </a-list-item>
      <a-list-item style="border: none">
        <a-form-item :help="form.password_lock_minutes.description" :label="form.password_lock_minutes.name">
          <a-input-number class="input-width" :min="0" :max="9999" v-model="form.password_lock_minutes.value">
            <template #append>分钟</template>
          </a-input-number>
        </a-form-item>
      </a-list-item>
      <a-list-item style="border: none">
        <a-form-item :help="form.password_special_char.description" :label="form.password_special_char.name">
          <a-switch type="round" :checked-value="1" :unchecked-value="0" v-model="form.password_special_char.value" />
        </a-form-item>
      </a-list-item>
      <a-list-item style="border: none">
        <a-form-item :help="form.password_contain_name.description" :label="form.password_contain_name.name">
          <a-switch type="round" :checked-value="1" :unchecked-value="0" v-model="form.password_contain_name.value" />
        </a-form-item>
      </a-list-item>
      <a-list-item style="padding-top: 13px; border: none">
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
import { listOption, updateOption, resetOptionValue, type SecurityConfigResp, type OptionResp } from '@/apis'
import { Message, Modal, type FormInstance } from '@arco-design/web-vue'

const formRef = ref<FormInstance>()

const form = ref<SecurityConfigResp>({
  password_contain_name: {},
  password_error_count: {},
  password_expiration_days: {},
  password_lock_minutes: {},
  password_min_length: {},
  password_special_char: {},
  password_update_interval: {}
})

// 重置
const reset = () => {
  getDataList()
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
  code: Object.keys(form.value)
}
// 查询列表数据
const getDataList = async () => {
  const { data } = await listOption(queryForm)
  form.value = data.reduce((obj: SecurityConfigResp, option: OptionResp) => {
    obj[option.code] = { ...option, value: parseInt(option.value) }
    return obj
  }, {})
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
.input-width {
  width: 130px;
}
</style>
