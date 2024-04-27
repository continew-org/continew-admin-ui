<template>
  <a-card title="密码策略" bordered class="gradient-card">
    <div class="item">
      <div class="icon-wrapper"><GiSvgIcon name="password" :size="26" /></div>
      <div class="info">
        <div class="info-top">
          <span class="label">登录密码</span>
        </div>
        <div class="info-desc">为了您的账号安全，建议定期修改密码</div>
      </div>
      <div class="btn-wrapper">
        <a-button class="btn">修改</a-button>
      </div>
    </div>
    <div class="detail">
      <div class="sub-text-wrapper">
        <div class="sub-text">
          密码至少包含
          <span class="sub-text-value">大写字母</span>
          <span class="sub-text-value">大写字母</span>
          <span class="sub-text-value">小写字母</span>
          <span class="sub-text-value">数字</span>
          <span class="sub-text-value">特殊字符</span>3种
        </div>
        <div class="sub-text">限制密码长度至少为<span class="sub-text-value">6</span>位</div>
        <div class="sub-text">未设置密码有效期</div>
        <div class="sub-text">新密码不能与历史前<span class="sub-text-value">N</span>次密码重复</div>
        <div class="sub-text">1小时内密码错误可重试<span class="sub-text-value">N</span>次</div>
        <div class="sub-text">超过错误密码重试次数账号将被锁定<span class="sub-text-value">N</span>分钟</div>
        <a-link class="link">修改规则（未开放）</a-link>
      </div>
    </div>
  </a-card>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped></style>
