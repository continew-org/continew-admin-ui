<template>
  <a-card class="general-card" title="我的项目">
    <template #extra>
      <a-dropdown>
        <a-link>更多</a-link>
        <template #content>
          <a-doption>
            <a-link href="https://gitee.com/charles7c" target="_blank" rel="noopener">Gitee</a-link>
          </a-doption>
          <a-doption>
            <a-link href="https://atomgit.com/charles_7c" target="_blank" rel="noopener">GitCode</a-link>
          </a-doption>
          <a-doption>
            <a-link href="https://github.com/charles7c" target="_blank" rel="noopener">GitHub</a-link>
          </a-doption>
        </template>
      </a-dropdown>
    </template>
    <a-row :gutter="[14, 14]">
      <a-col
        v-for="(item, index) in list"
        :key="index"
        :xs="24"
        :sm="24"
        :md="12"
        :lg="12"
        :xl="8"
        :xxl="8"
      >
        <a-card :bordered="true" hoverable>
          <div class="badge badge-right" :style="`background-color: ${item.statusColor}`">{{ item.status }}</div>
          <a-card-meta>
            <template #title>
              <a-space>
                <img :src="item.logo" width="25px" height="25px" alt="logo" />
                <a-typography-paragraph
                  :ellipsis="{
                    rows: 1,
                    showTooltip: true,
                    css: true,
                  }"
                >
                  {{ item.alias }}
                </a-typography-paragraph>
              </a-space>
            </template>
            <template #description>
              <a-typography-paragraph
                :ellipsis="{
                  rows: 2,
                  showTooltip: true,
                  css: true,
                }"
              >
                <a-typography-text type="secondary">
                  {{ item.desc }}
                </a-typography-text>
              </a-typography-paragraph>
            </template>
          </a-card-meta>
          <template #actions>
            <a-tooltip content="点个 Star 吧">
              <span class="icon-hover">
                <a :href="item.url" target="_blank" rel="noopener"><IconThumbUp :size="20" /></a>
              </span>
            </a-tooltip>
          </template>
        </a-card>
      </a-col>
    </a-row>
  </a-card>
</template>

<script setup lang="ts">
const list = [
  {
    alias: 'ContiNew Admin',
    name: 'continew-admin',
    owner: 'continew-org',
    desc: '🔥Almost最佳后端规范🔥持续迭代优化的前后端分离中后台管理系统框架，开箱即用，持续提供舒适的开发体验。',
    logo: 'https://continew.top/logo.svg',
    url: 'https://gitee.com/continew/continew-admin/stargazers',
    status: '迭代',
    statusColor: 'rgb(var(--primary-6))',
  },
  {
    alias: 'ContiNew Starter',
    name: 'continew-starter',
    owner: 'continew-org',
    desc: '🔥高质量Starter🔥包含了一系列经过企业实践优化的依赖包（如 MyBatis-Plus、SaToken），可轻松集成到应用中，为开发人员减少手动引入依赖及配置的麻烦，为 Spring Boot Web 项目的灵活快速构建提供支持。',
    logo: 'https://continew.top/logo.svg',
    url: 'https://gitee.com/continew/continew-starter/stargazers',
    status: '迭代',
    statusColor: 'rgb(var(--primary-6))',
  },
  {
    alias: 'ContiNew Admin UI',
    name: 'continew-admin-ui',
    owner: 'continew-org',
    desc: '全新 3.x 版本，基于 Gi Demo 前端模板开发的 ContiNew Admin 前端适配项目。',
    logo: 'https://continew.top/logo.svg',
    url: 'https://gitee.com/continew/continew-admin-ui/stargazers',
    status: '迭代',
    statusColor: 'rgb(var(--primary-6))',
  },
  {
    alias: 'ContiNew Admin UI Arco',
    name: 'continew-admin-ui-arco',
    owner: 'continew-org',
    desc: '2.5 版本，基于 Arco Design Pro 前端模板开发的 ContiNew Admin 前端适配项目。',
    logo: 'https://continew.top/logo.svg',
    url: 'https://gitee.com/continew/continew-admin-ui-arco/stargazers',
    status: '归档',
    statusColor: 'rgb(var(--warning-6))',
  },
  {
    alias: 'ContiNew Cloud',
    name: 'continew-admin',
    owner: 'continew',
    desc: 'ContiNew Admin 微服务版本。基于 SpringBoot 3.x、Spring Cloud 2023 & Alibaba。',
    logo: 'https://continew.top/logo.svg',
    url: '#',
    status: '孵化',
    statusColor: 'rgb(var(--danger-6))',
  },
  {
    alias: 'charles7c.github.io',
    name: 'charles7c.github.io',
    owner: 'charles7c',
    desc: '基于 VitePress 构建的个人知识库/博客。扩展 VitePress 默认主题：增加ICP备案号、公安备案号显示，增加文章元数据信息（原创标识、作者、发布时间、分类、标签）显示，增加文末版权声明，增加 Gitalk 评论功能，主页美化、自动生成侧边栏、文章内支持 Mermaid 流程图、MD公式、MD脚注、增加我的标签、我的归档等独立页面，以及浏览器滚条等细节优化。',
    logo: 'https://charles7c.top/logo.png',
    url: 'https://github.com/Charles7c/charles7c.github.io/stargazers',
    status: '归档',
    statusColor: 'rgb(var(--warning-6))',
  },
]
</script>

<style scoped lang="less">
:deep(.arco-card-body) {
  position: relative;
  overflow: hidden;
  .badge {
    position: absolute;
    font-size: 11px;
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
    left: -20px;
    top: 6px;
  }
  .badge-right {
    -moz-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    -o-transform: rotate(45deg);
    -webkit-transform: rotate(45deg);
    transform: rotate(45deg);
    right: -20px;
    top: 6px;
  }
}

.icon-hover {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  color: rgba(var(--primary-6));
  border-radius: 50%;
  transition: all 0.1s;
  animation: icon-hover-animated 1.2s ease-in-out infinite;
}
.icon-hover:hover {
  background-color: rgb(var(--gray-2));
}

@keyframes icon-hover-animated {
  50% {
    transform: scale(0.8);
  }
}
</style>
