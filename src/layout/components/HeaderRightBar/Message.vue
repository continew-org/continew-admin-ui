<template>
  <div class="message">
    <a-tabs default-active-key="1">
      <a-tab-pane key="1">
        <template #title>通知({{ props.list.length }})</template>
        <section>
          <a-comment
            v-for="(item, index) in props.list"
            :key="index"
            :author="item.createUserString"
            :content="item.content"
            :datetime="item.createTime"
          >
            <template #actions></template>
          </a-comment>
        </section>
      </a-tab-pane>
      <a-tab-pane key="2">
        <template #title>关注({{ props.todulist?.length || 0 }})</template>
        <section>
          <a-comment
            v-for="(item, index) in props.follwlist"
            :key="index"
            :author="item.createUserString"
            :content="item.content"
            :datetime="item.createTime"
          >
            <template #actions></template>
          </a-comment>
        </section>
      </a-tab-pane>
      <a-tab-pane key="3">
        <template #title>待办({{ props.todulist?.length || 0 }})</template>

        <section>
          <a-comment
            v-for="(item, index) in props.todulist"
            :key="index"
            :author="item.createUserString"
            :content="item.content"
            :datetime="item.createTime"
          >
            <template #actions></template>
          </a-comment>
        </section>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: "Message" });
const props = defineProps({
  list: {
    type: Array as PropType<Array<{ name: string }>>, // 简化数据结构以便测试
    required: true,
  },
});
</script>

<style lang="scss" scoped></style>
