<template>
  <a-empty v-if="props.list.length === 0">
    <template #image>
      <img src="./emp.svg" />
    </template>
    暂无数据
  </a-empty>
  <div class="footer">
    <a class="more_btn" @click="open">查看更多 ></a>
    <a class="end_all_btn" @click="endAll">一键已读</a>
  </div>
</template>

<script setup lang="ts">
import { Message } from '@arco-design/web-vue'
import { endAllMessage } from '@/apis'

// 定义组件名称
defineOptions({ name: 'Empty' })

const props = defineProps({
  list: {
    type: Array as PropType<any>, // 简化数据结构以便测试
    required: true
  },
  fetch: {
    type: Function, // 简化数据结构以便测试
    required: true
  }
})
const open = () => {
  window.open('/#/setting/message')
}
const endAll = async () => {
  const response = await endAllMessage('1')
  if (response?.code === 200) {
    props.fetch()
    Message.success('全部已读')
  }
}
</script>

<style lang="scss" scoped>
.footer {
  height: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 5px;

  .more_btn {
    color: rgb(0, 119, 255);
    cursor: pointer;
  }

  .end_all_btn {
    color: rgb(0, 119, 255);
    cursor: pointer;
  }
}
</style>
