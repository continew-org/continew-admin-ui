<template>
  <a-card title="特别赞助" :bordered="false" size="medium" class="card gi_card_title">
    <template #extra>
      <a-link href="https://continew.top/other/sponsor.html" target="_blank" rel="noopener">>></a-link>
    </template>
    <a-row :gutter="8">
      <a-carousel
        v-if="imageList.length"
        indicator-type="slider"
        show-arrow="always"
        auto-play
        style="width: 100%; height: 110px; border-radius: 4px; overflow: hidden"
      >
        <a-carousel-item v-for="(image, idx) in imageList" :key="idx">
          <a :href="image.link" target="_blank" :title="image.title">
            <img :src="image.src" style="width: 100%; height: 100%" :alt="image.title" />
          </a>
        </a-carousel-item>
      </a-carousel>
      <a-empty v-else />
    </a-row>
  </a-card>
</template>

<script lang="ts" setup>
interface ImageType {
  src: string
  title: string
  link: string
}

const imageList: ImageType[] = [
]
</script>
