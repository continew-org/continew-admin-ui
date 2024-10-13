<template>
  <a-card title="项目" :bordered="false" size="medium" class="gi_card_title" style="overflow: hidden">
    <a-row align="stretch">
      <a-col v-for="(item, index) in list" :key="item.name" :xs="12" :sm="8" :md="8">
        <a-card-grid class="w-full h-full">
          <a-card :bordered="false" hoverable :class="`animated-fade-up-${index}`">
            <a :href="item.url" target="_blank">
              <section class="item">
                <div class="item__header">
                  <img :src="item.logo" width="30px" alt="logo" />
                  <span class="item__name gi_line_1">{{ item.name }}</span>
                </div>
                <div class="item__middle">
                  <p class="item__desc gi_line_2">{{ item.desc }}</p>
                </div>
              </section>
            </a>
          </a-card>
        </a-card-grid>
      </a-col>
    </a-row>
  </a-card>
</template>

<script setup lang="ts">
const list = [
  {
    name: 'ContiNew Admin',
    desc: '持续优化的前后端分离中后台管理框架，开箱即用，持续提供舒适的开发体验。',
    logo: 'https://continew.top/logo.svg',
    url: 'https://gitee.com/continew/continew-admin'
  },
  {
    name: 'ContiNew Starter',
    desc: '包含了一系列经过企业实践优化的依赖包（如 MyBatis-Plus、SaToken）。',
    logo: 'https://continew.top/logo.svg',
    url: 'https://gitee.com/continew/continew-starter'
  },
  {
    name: 'ContiNew Admin UI',
    desc: '全新 3.0 版本，基于 Gi Demo 前端模板开发的 ContiNew Admin 前端适配项目。',
    logo: 'https://continew.top/logo.svg',
    url: 'https://gitee.com/continew/continew-admin-ui'
  },
  {
    name: 'ContiNew Admin UI Arco',
    desc: '2.5 版本，基于 Arco Design Pro 前端模板开发的 ContiNew Admin 前端适配项目。',
    logo: 'https://continew.top/logo.svg',
    url: 'https://gitee.com/continew/continew-admin-ui-arco'
  },
  {
    name: 'ContiNew Cloud（孵化中）',
    desc: 'ContiNew Admin 微服务版本',
    logo: 'https://continew.top/logo.svg',
    url: '#'
  },
  {
    name: 'charles7c.github.io',
    desc: '基于 VitePress 构建的个人知识库/博客，扩展 VitePress 默认主题。',
    logo: 'https://blog.charles7c.top/logo.png',
    url: 'https://github.com/Charles7c/charles7c.github.io'
  }
]
</script>

<style lang="scss" scoped>
:deep(.arco-card) {
  height: 100%;
  .arco-card-body {
    height: 100%;
    box-sizing: border-box;
  }
}

:deep(.arco-card-header) {
  border: none;
}

.item {
  height: 100%;
  display: flex;
  flex-direction: column;
  &__header {
    display: flex;
    align-items: center;
  }
  &__name {
    margin-left: 10px;
    font-size: 1.125rem;
    line-height: 1.75rem;
    color: var(--color-text-1);
    &:hover {
      color: rgb(var(--arcoblue-6));
    }
  }
  &__middle {
    flex: 1;
  }
  &__desc {
    flex: 1;
    margin-top: 10px;
    line-height: 1.5;
    color: var(--color-text-2);
  }
  &__footer {
    font-size: 12px;
    color: var(--color-text-3);
    margin-top: 8px;
  }
}
</style>
