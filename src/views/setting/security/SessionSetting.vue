<template>
  <Card style="height: 100%">
    <template #header> 登录会话设置 </template>
    <template #body>
      <div class="content_title">
        <div class="icon"><GiSvgIcon name="loginStatus" :size="36" /></div>
        <div>
          <div style="font-size: 14px; font-weight: 500; line-height: 28px">登录态保持时间设置</div>
          <div style="font-size: 12px">保持登录状态的限制</div>
        </div>
      </div>
      <div class="content_Box">
        <p>操作登录会话保持120分钟，超时登录会话将失效</p>
        <p>登录会话最大保持0天，超时登录会话将失效</p>
        <p class="link_btn">修改规则(未开发)</p>
      </div>
    </template>
  </Card>
</template>
<script setup lang="ts">
import Card from '../components/Card.vue'
</script>
<style scoped lang="scss">
.content_title {
  display: flex;
  align-items: center;
  .icon {
    margin-right: 10px;
  }
}
.content_Box {
  border-left: 1px solid #ccc;
  margin-left: 40px;
  padding-left: 10px;
  font-size: 12px;
  margin-top: 20px;
  & > p {
    margin: 10px;
  }
}
.link_btn {
  cursor: pointer;
  color: #007aff;
  &:hover {
    color: rgba($color: #007aff, $alpha: 0.8);
  }
}
</style>
