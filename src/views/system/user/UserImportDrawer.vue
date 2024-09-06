<template>
  <a-drawer
      v-model:visible="visible"
      title="导入用户"
      :mask-closable="false"
      :esc-to-close="false"
      :width="width >= 600 ? 600 : '100%'"
      ok-text="确认导入"
      cancel-text="取消导入"
      @before-ok="save"
      @close="reset"
  >
    <a-form ref="formRef" :model="form" size="large" auto-label-width>
      <a-alert v-if="!form.disabled" :show-icon="false" style="margin-bottom: 15px">
        数据导入请严格按照模板填写，格式要求和新增一致！
        <template #action>
          <a-button size="small" type="primary" @click="downloadTemplate">下载模板</a-button>
        </template>
      </a-alert>
      <fieldset>
        <legend>1.上传解析文件</legend>
        <div class="file-box">
          <a-upload draggable
                    :custom-request="handleUpload"
                    :limit="1"
                    :show-retry-butto="false"
                    :show-cancel-button="false" tip="仅支持xls、xlsx格式"
                    :file-list="uploadFile"
                    accept=".xls, .xlsx, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          />
        </div>
        <div v-if="dataResult.importKey">
          <div class="file-box">
            <a-space size="large">
              <a-statistic title="总计行数" :value="dataResult.totalRows" />
              <a-statistic title="正常行数" :value="dataResult.validRows" />
            </a-space>
          </div>
          <div class="file-box">
            <a-space size="large">
              <a-statistic title="已存在用户" :value="dataResult.duplicateUserRows" />
              <a-statistic title="已存在邮箱" :value="dataResult.duplicateEmailRows" />
              <a-statistic title="已存在手机" :value="dataResult.duplicatePhoneRows" />
            </a-space>
          </div>
        </div>
      </fieldset>
      <fieldset>
        <legend>2.导入策略</legend>
        <a-form-item label="用户已存在" field="duplicateUser">
          <a-radio-group v-model="form.duplicateUser" type="button">
            <a-radio :value="1">跳过该行</a-radio>
            <a-radio :value="3">停止导入</a-radio>
            <a-radio :value="2">修改数据</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item label="邮箱已存在" field="duplicateEmail">
          <a-radio-group v-model="form.duplicateEmail" type="button">
            <a-radio :value="1">跳过该行</a-radio>
            <a-radio :value="3">停止导入</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item label="手机已存在" field="duplicatePhone">
          <a-radio-group v-model="form.duplicatePhone" type="button">
            <a-radio :value="1">跳过该行</a-radio>
            <a-radio :value="3">停止导入</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item label="默认状态" field="defaultStatus">
          <a-switch
              v-model="form.defaultStatus"
              :checked-value="1"
              :unchecked-value="2"
              checked-text="启用"
              unchecked-text="禁用"
              type="round"
          />
        </a-form-item>
      </fieldset>
    </a-form>
  </a-drawer>
</template>

<script setup lang="ts">
import { type FormInstance, Message, type RequestOption } from '@arco-design/web-vue'
import { useWindowSize } from '@vueuse/core'
import { type UserImportResp, downloadImportUserTemplate, importUser, parseImportUser } from '@/apis/system'
import { useDownload, useForm } from '@/hooks'

const emit = defineEmits<{
  (e: 'save-success'): void
}>()
const { width } = useWindowSize()

const formRef = ref<FormInstance>()
const uploadFile = ref([])

const { form, resetForm } = useForm({
  errorPolicy: 1,
  duplicateUser: 1,
  duplicateEmail: 1,
  duplicatePhone: 1,
  defaultStatus: 1
})

const dataResult = ref<UserImportResp>({
  importKey: '',
  totalRows: 0,
  validRows: 0,
  duplicateUserRows: 0,
  duplicateEmailRows: 0,
  duplicatePhoneRows: 0
})

// 重置
const reset = () => {
  formRef.value?.resetFields()
  dataResult.value.importKey = ''
  uploadFile.value = []
  resetForm()
}

const visible = ref(false)
const onImport = () => {
  reset()
  visible.value = true
}

// 下载模板
const downloadTemplate = () => {
  useDownload(() => downloadImportUserTemplate())
}

// 上传解析导入数据
const handleUpload = (options: RequestOption) => {
  const controller = new AbortController();
  (async function requestWrap() {
    const { onProgress, onError, onSuccess, fileItem, name = 'file' } = options
    onProgress(20)
    const formData = new FormData()
    formData.append(name as string, fileItem.file as Blob)
    try {
      const res = await parseImportUser(formData)
      dataResult.value = res.data
      Message.success('上传解析成功')
      onSuccess(res)
    } catch (error) {
      onError(error)
    }
  })()
  return {
    abort() {
      controller.abort()
    }
  }
}

// 执行导入
const save = async () => {
  try {
    if (!dataResult.value.importKey) {
      return false
    }
    form.importKey = dataResult.value.importKey
    const res = await importUser(form)
    Message.success(`导入成功，新增${res.data.insertRows},修改${res.data.updateRows}`)
    emit('save-success')
    return true
  } catch (error) {
    return false
  }
}

defineExpose({ onImport })
</script>

<style lang="scss" scoped>
fieldset {
  padding: 15px 15px 0 15px;
  margin-bottom: 15px;
  border: 1px solid var(--color-neutral-3);
  border-radius: 3px;
}

fieldset legend {
  color: rgb(var(--gray-10));
  padding: 2px 5px 2px 5px;
  border: 1px solid var(--color-neutral-3);
  border-radius: 3px;
}

.file-box {
  margin-bottom: 20px;
  margin-left: 10px;
}
</style>
