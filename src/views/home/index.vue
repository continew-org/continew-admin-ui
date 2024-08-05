<template>
  <div id="home" class="gi_page home">
    <WorkCard />

    <a-alert>
      全新版本 v3.2.0 已发布，新增定时任务支持，重构公告新增，点击查看
      <span class="link" @click="open('https://continew.top/admin/other/changelog.html')">更新日志</span>。
    </a-alert>

    <a-row class="home__content">
      <a-col :xs="24" :sm="24" :md="24" :lg="12" :xl="18" :xxl="18">
        <div class="home__item"><ProjectCard /></div>
        <div class="home__item"><AccessTrendCard /></div>
      </a-col>
      <a-col :xs="24" :sm="24" :md="24" :lg="12" :xl="6" :xxl="6">
        <div class="home__item"><FastCard /></div>
        <div class="home__item"><SponsorCard /></div>
        <div class="home__item"><NoticeCard /></div>
      </a-col>
    </a-row>

    <a-back-top :visible-height="100" target-container="#home" />
  </div>
</template>

<script setup lang="ts">
import WorkCard from './components/WorkCard.vue'
import ProjectCard from './components/ProjectCard.vue'
import AccessTrendCard from './components/AccessTrendCard.vue'
import FastCard from './components/FastCard.vue'
import NoticeCard from './components/NoticeCard.vue'
import SponsorCard from './components/SponsorCard.vue'

defineOptions({ name: 'Home' })

const open = (url: string) => {
  window.open(url, '_blank')
}
</script>

<style lang="scss" scoped>
.home {
  padding: 0;
  span.link {
    cursor: pointer;
    color: rgb(var(--arcoblue-6));
    font-weight: bold;
    &:hover {
      opacity: 0.7;
    }
  }
  &__content {
    padding: 6px;
  }
  &__item {
    padding: 6px;
    box-sizing: border-box;
  }
  .backtop-icon {
    cursor: pointer;
  }
}
</style>
