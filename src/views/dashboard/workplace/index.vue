<template>
  <div class="gi_page container">
    <div class="left-side">
      <div class="panel">
        <Welcome />
      </div>
      <div style="margin-top: 14px">
        <a-grid :cols="24" :col-gap="14" :row-gap="14">
          <a-grid-item :span="24">
            <Project />
          </a-grid-item>
          <a-grid-item :span="24">
            <LatestActivity />
          </a-grid-item>
        </a-grid>
      </div>
    </div>
    <div class="right-side">
      <a-grid :cols="24" :row-gap="14">
        <a-grid-item :span="24">
          <div class="panel moduler-wrap">
            <QuickOperation />
          </div>
        </a-grid-item>
        <a-grid-item class="panel" :span="24">
          <Carousel />
        </a-grid-item>
        <a-grid-item class="panel" :span="24">
          <Notice />
        </a-grid-item>
        <a-grid-item class="panel" :span="24">
          <Docs />
        </a-grid-item>
      </a-grid>
    </div>
  </div>
</template>

<script setup lang="ts">
import Welcome from './components/Welcome.vue'
import Project from './components/Project.vue'
import LatestActivity from './components/LatestActivity.vue'
import QuickOperation from './components/QuickOperation.vue'
import Carousel from './components/Carousel.vue'
import Notice from './components/Notice.vue'
import Docs from './components/Docs.vue'

defineOptions({ name: 'Workplace' })
</script>

<style lang="scss" scoped>
.container {
  display: flex;
}

.left-side {
  flex: 1;
}

.right-side {
  width: 280px;
  margin-left: 14px;
}

.panel {
  background-color: var(--color-bg-2);
  border-radius: 4px;
  overflow: auto;
}
:deep(.panel-border) {
  margin-bottom: 0;
  border-bottom: 1px solid rgb(var(--gray-2));
}
.moduler-wrap {
  border-radius: 4px;
  background-color: var(--color-bg-2);
  :deep(.text) {
    font-size: 12px;
    text-align: center;
    color: rgb(var(--gray-8));
  }

  :deep(.wrapper) {
    margin-bottom: 8px;
    text-align: center;
    cursor: pointer;

    &:last-child {
      .text {
        margin-bottom: 0;
      }
    }
    &:hover {
      .icon {
        color: rgb(var(--arcoblue-6));
        background-color: #e8f3ff;
      }
      .text {
        color: rgb(var(--arcoblue-6));
      }
    }
  }

  :deep(.icon) {
    display: inline-block;
    width: 32px;
    height: 32px;
    margin-bottom: 4px;
    color: rgb(var(--dark-gray-1));
    line-height: 32px;
    font-size: 16px;
    text-align: center;
    background-color: rgb(var(--gray-1));
    border-radius: 4px;
  }
}
</style>

<style lang="less" scoped>
// responsive
.mobile {
  .container {
    display: block;
  }
  .right-side {
    // display: none;
    width: 100%;
    margin-left: 0;
    margin-top: 16px;
  }
}
</style>
