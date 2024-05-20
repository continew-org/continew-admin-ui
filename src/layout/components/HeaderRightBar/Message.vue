<template>
  <div class="message">
    <a-tabs default-active-key="1">
      <a-tab-pane key="1">
        <template #title>通知({{ props.list.length }})</template>
        <section>
          <a-comment v-for="(item, index) in props.list" v-if="props.list.length > 0" :key="index"
            :author="item.createUserString" :content="item.content" :datetime="item.createTime">
            <template #actions></template>
          </a-comment>
          <Empty :fetch="props.fetch" :list="props.list" />
        </section>
      </a-tab-pane>
      <a-tab-pane key="2">
        <template #title>关注({{ props.follwlist?.length || 0 }})</template>
        <section>
          <a-comment v-for="(item, index) in props.follwlist" v-if="props.follwlist.length > 0" :key="index"
            :author="item.createUserString" :content="item.content" :datetime="item.createTime">
            <template #actions></template>
          </a-comment>
          <Empty :fetch="props.fetch" :list="props.follwlist" />
        </section>
      </a-tab-pane>
      <a-tab-pane key="3">
        <template #title>待办({{ props.todulist?.length || 0 }})</template>

        <section>
          <a-comment v-for="(item, index) in props.todulist" v-if="props.todulist.length > 0" :key="index"
            :author="item.createUserString" :content="item.content" :datetime="item.createTime">
            <template #actions></template>
          </a-comment>
          <Empty :fetch="props.fetch" :list="props.todulist" />
        </section>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script setup lang="ts">
import Empty from './empty.vue'

defineOptions({ name: 'Message' })
const props = defineProps({
  list: {
    type: Array as PropType<any>, // 简化数据结构以便测试
    required: true
  },
  todulist: {
    type: Array as PropType<any>, // 简化数据结构以便测试
    required: true
  },
  follwlist: {
    type: Array as PropType<any>, // 简化数据结构以便测试
    required: true
  },
  fetch: {
    type: Function, // 简化数据结构以便测试
    required: true
  }
})
</script>

<style lang="scss" scoped></style>
