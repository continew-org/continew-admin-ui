<template>
  <div class="json_pretty_container">
    <VueJsonPretty path="res" :data="JSONObject" :show-length="true" />
    <icon-copy class="copy_icon" @click="onCopy(JSONObject)" />
  </div>
</template>

<script setup lang="ts">
import VueJsonPretty from 'vue-json-pretty'
import 'vue-json-pretty/lib/styles.css'
import { copyText } from '@/utils'

defineOptions({ name: 'JsonPretty', inheritAttrs: false })

const props = defineProps<{
  json: string
}>()

const JSONObject = computed(() => JSON.parse(props?.json))

// 拷贝
const onCopy = (data: object) => {
  copyText(JSON.stringify(data))
}
</script>

<style lang="scss" scoped>
.json_pretty_container {
  width: 100%;
  height: 100%;
  overflow: auto;
  position: relative;
  .copy_icon {
    position: absolute;
    right: 10px;
    top: 10px;
    font-size: 18px;
    cursor: pointer;
  }
}
</style>
