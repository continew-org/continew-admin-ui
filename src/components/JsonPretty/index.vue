<template>
  <div class="json_prettt_container">
    <vue-json-pretty
              :path="'res'"
              :data="JSONObject"
              :show-length="true"
            />
    <icon-copy class="copy_icon" @click="onCopy(JSONObject)"/>
  </div>
</template>
<script setup lang="ts">
import VueJsonPretty from 'vue-json-pretty'
import 'vue-json-pretty/lib/styles.css'
import {copyText} from '@/utils'
defineOptions({ name: 'JsonPretty', inheritAttrs: false })
const props = defineProps<{
  josn: string
}>()
const JSONObject = computed(()=>JSON.parse(props?.josn))
const onCopy =(data:object)=>{
  copyText(JSON.stringify(data))
  console.log('copyObject',data)
}
</script>
<style lang="scss" scoped>
.json_prettt_container{
  width: 100%;
  height: 100%;
  overflow: auto;
  position: relative;
  .copy_icon{
    position: absolute;
    right: 10px;
    top: 10px;
    font-size: 20px;
    cursor: pointer;
  }
}
</style>