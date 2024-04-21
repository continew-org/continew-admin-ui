<template>
  <a-carousel
    indicator-type="slider"
    show-arrow="hover"
    auto-play
    style="width: 120px; height: 100px; border-radius: 4px; overflow: hidden"
  >
    <a-carousel-item v-for="(src, idx) in imageSrc" :key="idx">
      <div style="padding-bottom: 10px; text-align: center">
        <img :src="src" style="width: 80px" alt="QrCode" />
        <div style="text-align: center">备注cnadmin进群</div>
      </div>
    </a-carousel-item>
  </a-carousel>
</template>

<script lang="ts" setup>
const imageSrc = [`https://continew.top/qrcode.jpg?${new Date().getTime()}`]
</script>
