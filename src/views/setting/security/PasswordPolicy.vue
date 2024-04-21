<template>
  <Card>
    <template #header> 密码策略 </template>
    <template #body>
      <div class="content_title">
        <div class="icon"><GiSvgIcon name="password" :size="36" /></div>
        <div>
          <div style="font-size: 14px; font-weight: 500; line-height: 28px">登录密码</div>
          <div style="font-size: 12px">为了您的账号安全，建议定期修改密码</div>
        </div>
      </div>
      <div class="content_Box">
        <p>
          密码至少包含 <span class="subTitle">大写字母</span><span class="subTitle">小写字母</span
          ><span class="subTitle">数字</span><span class="subTitle">特殊字符</span>3种
        </p>
        <p>限制密码长度至少为<span class="subTitle">8</span>位</p>
        <p>未设置密码有效期</p>
        <p>新密码不能与历史前<span class="subTitle">3</span>次密码重复</p>
        <p>1小时内密码错误可重试 <span class="subTitle">5</span>次</p>
        <p>超过错误密码重试次数账号将被锁定<span class="subTitle">60</span>分钟</p>
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
.subTitle {
  background: var(--color-neutral-2);
  padding: 1px 5px;
  margin: 0px 5px;
  border-radius: 3px;
}
</style>
