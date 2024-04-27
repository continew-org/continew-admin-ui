<template>
  <a-card title="登录会话设置" bordered class="gradient-card">
    <div class="item">
      <div class="icon-wrapper"><GiSvgIcon name="message-color" :size="26" /></div>
      <div class="info">
        <div class="info-top">
          <span class="label">登录态保持时间设置</span>
        </div>
        <div class="info-desc">保持登录状态的限制</div>
      </div>
    </div>
    <div class="detail">
      <div class="sub-text-wrapper">
        <div class="sub-text">无操作登录会话保持<span class="sub-text-value">30</span>分钟，超时登录会话将失效</div>
        <div class="sub-text">登录会话最大保持<span class="sub-text-value">0</span>天，超时登录会话将失效</div>
        <a-link class="link">修改规则（未开放）</a-link>
      </div>
    </div>
  </a-card>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped></style>
