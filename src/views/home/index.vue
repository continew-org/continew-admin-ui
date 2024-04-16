<template>
  <div class="gi_page home" id="home">
    <WorkCard />

    <a-row class="home__content">
      <a-col :xs="24" :sm="24" :md="24" :lg="12" :xl="18" :xxl="20">
        <div class="home__item"><ProjectCard /></div>
        <div class="home__item"><AccessTrendCard /></div>
      </a-col>
      <a-col :xs="24" :sm="24" :md="24" :lg="12" :xl="6" :xxl="4">
        <div class="home__item"><FastCard /></div>
        <div class="home__item"><SponsorCard /></div>
        <div class="home__item"><NoticeCard /></div>
      </a-col>
    </a-row>

    <a-back-top :visible-height="100" target-container="#home">
      <GiSvgIcon name="backtop" :size="50" class="backtop-icon" />
    </a-back-top>
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
</script>

<style lang="scss" scoped>
.home {
  padding: 0;
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
