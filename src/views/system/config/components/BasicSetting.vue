<template>
  <a-form ref="formRef" :model="form" :rules="rules" size="large" layout="vertical" :disabled="!isUpdate">
    <a-list class="list-layout" :bordered="false">
      <a-list-item>
        <a-form-item class="image-item" hide-label field="site_favicon">
          {{ siteFavicon?.name }}
          <template #extra>
            {{ siteFavicon?.description }}
            <br />
            <a-upload
              :file-list="faviconFile ? [faviconFile] : []"
              accept="image/*"
              :show-file-list="false"
              :custom-request="handleUploadFavicon"
              @change="handleChangeFavicon"
            >
              <template #upload-button>
                <div
                  :class="`arco-upload-list-item${
                    faviconFile && faviconFile.status === 'error' ? ' arco-upload-list-item-error' : ''
                  }`"
                >
                  <div
                    v-if="faviconFile && faviconFile.url"
                    class="arco-upload-list-picture custom-upload-avatar favicon"
                  >
                    <img :src="faviconFile.url" alt="favicon" />
                    <div v-if="isUpdate" class="arco-upload-list-picture-mask favicon">
                      <IconEdit />
                    </div>
                  </div>
                  <div v-else class="arco-upload-picture-card favicon">
                    <div class="arco-upload-picture-card-text">
                      <icon-upload />
                    </div>
                  </div>
                </div>
              </template>
            </a-upload>
          </template>
        </a-form-item>
      </a-list-item>
      <a-list-item>
        <a-form-item class="image-item" hide-label field="site_logo">
          {{ siteLogo?.name }}
          <template #extra>
            {{ siteLogo?.description }}
            <br />
            <a-upload
              :file-list="logoFile ? [logoFile] : []"
              accept="image/*"
              :show-file-list="false"
              :custom-request="handleUploadLogo"
              @change="handleChangeLogo"
            >
              <template #upload-button>
                <div
                  :class="`arco-upload-list-item${
                    logoFile && logoFile.status === 'error' ? ' arco-upload-list-item-error' : ''
                  }`"
                >
                  <div v-if="logoFile && logoFile.url" class="arco-upload-list-picture custom-upload-avatar logo">
                    <img :src="logoFile.url" alt="Logo" />
                    <div v-if="isUpdate" class="arco-upload-list-picture-mask logo">
                      <IconEdit />
                    </div>
                  </div>
                  <div v-else class="arco-upload-picture-card logo">
                    <div class="arco-upload-picture-card-text">
                      <icon-upload />
                    </div>
                  </div>
                </div>
              </template>
            </a-upload>
          </template>
        </a-form-item>
      </a-list-item>
      <a-list-item style="padding-top: 13px; border: none">
        <a-form-item class="input-item" :label="siteTitle?.name" field="site_title">
          <a-input v-model.trim="form.site_title" placeholder="请输入网站标题" :max-length="18" />
        </a-form-item>
        <a-form-item class="input-item" :label="siteCopyright?.name" field="site_copyright" tooltip="支持HTML标签">
          <a-textarea
            v-model.trim="form.site_copyright"
            placeholder="请输入版权信息"
            :auto-size="{
              minRows: 3
            }"
            show-word-limit
          />
        </a-form-item>
        <div style="margin-top: 20px">
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
        </div>
      </a-list-item>
    </a-list>
  </a-form>
</template>

<script lang="ts" setup>
import { listOption, updateOption, resetOptionValue, uploadFile, type OptionResp } from '@/apis'
import { Message, Modal, type FileItem, type FormInstance, type RequestOption } from '@arco-design/web-vue'
import { useAppStore } from '@/stores'
import { useForm } from '@/hooks'

const formRef = ref<FormInstance>()
const rules: FormInstance['rules'] = {
  site_title: [{ required: true, message: '请输入系统标题' }],
  site_copyright: [{ required: true, message: '请输入版权信息' }]
}

const { form } = useForm({
  site_favicon: '',
  site_logo: '',
  site_title: '',
  site_copyright: ''
})

const siteFavicon = ref<OptionResp>()
const siteLogo = ref<OptionResp>()
const siteTitle = ref<OptionResp>()
const siteCopyright = ref<OptionResp>()
const faviconFile = ref<FileItem>({ uid: '-1' })
const logoFile = ref<FileItem>({ uid: '-2' })
// 重置
const reset = () => {
  form.site_favicon = siteFavicon.value?.value || ''
  form.site_logo = siteLogo.value?.value || ''
  form.site_title = siteTitle.value?.value || ''
  form.site_copyright = siteCopyright.value?.value || ''
  faviconFile.value.url = siteFavicon.value?.value
  logoFile.value.url = siteLogo.value?.value
}

const isUpdate = ref(false)
// 修改
const onUpdate = () => {
  isUpdate.value = true
}

// 取消
const handleCancel = () => {
  isUpdate.value = false
}

const dataList = ref<OptionResp[]>([])
const queryForm = reactive({
  code: ['site_title', 'site_copyright', 'site_logo', 'site_favicon']
})
// 查询列表数据
const getDataList = async () => {
  const res = await listOption(queryForm)
  dataList.value = res.data
  siteFavicon.value = dataList.value.find((option) => option.code === 'site_favicon')
  siteLogo.value = dataList.value.find((option) => option.code === 'site_logo')
  siteTitle.value = dataList.value.find((option) => option.code === 'site_title')
  siteCopyright.value = dataList.value.find((option) => option.code === 'site_copyright')
  reset()
}

const appStore = useAppStore()
// 保存
const handleSave = async () => {
  const isInvalid = await formRef.value?.validate()
  if (isInvalid) return false
  await updateOption(
    Object.entries(form).map((item) => {
      return {
        code: item[0],
        value: item[1]
      }
    })
  )
  appStore.setSiteConfig(form)
  handleCancel()
  Message.success('保存成功')
}

// 恢复默认
const handleResetValue = async () => {
  await resetOptionValue(queryForm)
  Message.success('恢复成功')
  await getDataList()
  appStore.setSiteConfig(form)
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

// 上传 favicon
const handleUploadFavicon = (options: RequestOption) => {
  const controller = new AbortController()
  ;(async function requestWrap() {
    const { onProgress, onError, onSuccess, fileItem, name = 'file' } = options
    onProgress(20)
    const formData = new FormData()
    formData.append(name as string, fileItem.file as Blob)
    uploadFile(formData)
      .then((res) => {
        onSuccess(res)
        form.site_favicon = res.data.url
        Message.success('上传成功')
      })
      .catch((error) => {
        onError(error)
      })
  })()
  return {
    abort() {
      controller.abort()
    }
  }
}
const handleChangeFavicon = (_: any, currentFile: any) => {
  faviconFile.value = {
    ...currentFile
  }
}

// 上传 Logo
const handleUploadLogo = (options: RequestOption) => {
  const controller = new AbortController()
  ;(async function requestWrap() {
    const { onProgress, onError, onSuccess, fileItem, name = 'file' } = options
    onProgress(20)
    const formData = new FormData()
    formData.append(name as string, fileItem.file as Blob)
    uploadFile(formData)
      .then((res) => {
        onSuccess(res)
        form.site_logo = res.data.url
        Message.success('上传成功')
      })
      .catch((error) => {
        onError(error)
      })
  })()
  return {
    abort() {
      controller.abort()
    }
  }
}
const handleChangeLogo = (_: any, currentFile: any) => {
  logoFile.value = {
    ...currentFile
  }
}

onMounted(() => {
  getDataList()
})
</script>

<style lang="scss" scoped>
.logo {
  width: 33px;
  height: 33px;
  min-width: 33px;
  line-height: 33px;
}

.favicon {
  width: 16px;
  height: 16px;
  min-width: 16px;
  line-height: 16px;
}

.arco-form .image-item,
.input-item {
  margin-bottom: 0;
}

:deep(.arco-list-medium .arco-list-content-wrapper .arco-list-content > .arco-list-item) {
  padding: 13px;
  border-bottom: 1px solid var(--color-fill-3);
}

:deep(.arco-form-item-wrapper-col) {
  width: 50%;
}
</style>
