<template>
  <a-card class="general-card" title="我的项目">
    <template #extra>
      <a-link href="https://github.com/charles7c" target="_blank" rel="noopener">更多</a-link>
    </template>
    <a-row :gutter="16">
      <a-col
        v-for="(item, index) in list"
        :key="index"
        :xs="12"
        :sm="12"
        :md="12"
        :lg="12"
        :xl="8"
        :xxl="8"
        class="my-project-item"
      >
        <a-card style="min-height: 204px; max-height: 204px" :bordered="true" hoverable>
          <div class="badge badge-right" :style="`background-color: ${item.statusColor}`">{{ item.status }}</div>
          <a :href="item.url" target="_blank">
            <a-space direction="vertical">
              <a-space>
                <a-image :src="item.logo" width="30px" alt="logo" />
                <a-typography-text bold>{{ item.name }}</a-typography-text>
              </a-space>
              <a-typography-paragraph
                :ellipsis="{
                  rows: 6,
                  showTooltip: true,
                  css: true,
                }"
              >
                <a-typography-text type="secondary">
                  {{ item.desc }}
                </a-typography-text>
              </a-typography-paragraph>
            </a-space>
          </a>
        </a-card>
      </a-col>
    </a-row>
  </a-card>
</template>

<script lang="ts" setup>
const list = [
  {
    name: 'ContiNew Admin',
    desc: '🔥Almost最佳后端规范🔥持续迭代优化的前后端分离中后台管理系统框架，开箱即用，持续提供舒适的开发体验。当前采用技术栈：Spring Boot3（Java17）、Vue3 & Arco Design、TS、Vite5 、Sa-Token、MyBatisPlus、Redisson、JetCache、Jackson、SpringDoc、Crane4j、Liquibase、Hutool 等。',
    logo: 'https://continew.top/logo.svg',
    url: 'https://gitee.com/continew/continew-admin',
    status: '迭代',
    statusColor: 'rgb(var(--primary-6))'
  },
  {
    name: 'ContiNew Starter',
    desc: '🔥高质量Starter🔥包含了一系列经过企业实践优化的依赖包（如 MyBatis-Plus、SaToken），可轻松集成到应用中，为开发人员减少手动引入依赖及配置的麻烦，为 Spring Boot Web 项目的灵活快速构建提供支持。',
    logo: 'https://continew.top/logo.svg',
    url: 'https://gitee.com/continew/continew-starter',
    status: '迭代',
    statusColor: 'rgb(var(--primary-6))'
  },
  {
    name: 'ContiNew Admin UI',
    desc: '全新 3.x 版本，基于 Gi Demo 前端模板开发的 ContiNew Admin 前端适配项目。',
    logo: 'https://continew.top/logo.svg',
    url: 'https://gitee.com/continew/continew-admin-ui',
    status: '迭代',
    statusColor: 'rgb(var(--primary-6))'
  },
  {
    name: 'ContiNew Admin UI Arco',
    desc: '2.5 版本，基于 Arco Design Pro 前端模板开发的 ContiNew Admin 前端适配项目。',
    logo: 'https://continew.top/logo.svg',
    url: 'https://gitee.com/continew/continew-admin-ui-arco',
    status: '归档',
    statusColor: 'rgb(var(--warning-6))'
  },
  {
    name: 'ContiNew Cloud',
    desc: 'ContiNew Admin 微服务版本。',
    logo: 'https://continew.top/logo.svg',
    url: '#',
    status: '孵化',
    statusColor: 'rgb(var(--danger-6))'
  },
  {
    name: 'charles7c.github.io',
    desc: '基于 VitePress 构建的个人知识库/博客。扩展 VitePress 默认主题：增加ICP备案号、公安备案号显示，增加文章元数据信息（原创标识、作者、发布时间、分类、标签）显示，增加文末版权声明，增加 Gitalk 评论功能，主页美化、自动生成侧边栏、文章内支持 Mermaid 流程图、MD公式、MD脚注、增加我的标签、我的归档等独立页面，以及浏览器滚条等细节优化。查尔斯的个人技术知识库，记录 & 分享个人碎片化、结构化、体系化的技术知识内容。',
    logo: 'https://blog.charles7c.top/logo.png',
    url: 'https://github.com/Charles7c/charles7c.github.io',
    status: '归档',
    statusColor: 'rgb(var(--warning-6))'
  }
]
</script>

<style scoped lang="less">
:deep(.arco-card-body) {
  min-height: 128px;
  overflow: hidden;
  position: relative;
  .badge {
    position: absolute;
    font-size: 12px;
    height: 18px;
    line-height: 18px;
    text-align: center;
    width: 74px;
    color: #fff;
  }
  .badge-left {
    -moz-transform: rotate(-45deg);
    -ms-transform: rotate(-45deg);
    -o-transform: rotate(-45deg);
    -webkit-transform: rotate(-45deg);
    transform: rotate(-45deg);
    left: -18px;
    top: 9px;
  }
  .badge-right {
    -moz-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    -o-transform: rotate(45deg);
    -webkit-transform: rotate(45deg);
    transform: rotate(45deg);
    right: -18px;
    top: 9px;
  }
}
.my-project {
  &-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
  }

  &-title {
    margin-top: 0 !important;
    margin-bottom: 18px !important;
  }

  &-list {
    display: flex;
    justify-content: space-between;
  }

  &-item {
    // padding-right: 16px;
    margin-bottom: 16px;

    &:last-child {
      padding-right: 0;
    }
  }
}
</style>
