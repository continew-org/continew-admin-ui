<template>
  <Card>
    <template #header> 账号保护 </template>
    <template #body>
      <div class="mode-item" v-for="item in modeList" :key="item.title">
        <div class="mode-item-content">
          <div class="icon"><GiSvgIcon :name="item.icon" :size="36" /></div>
          <div>
            <div style="font-size: 14px; font-weight: 500; line-height: 28px; display: flex; align-items: center">
              <span>{{ item.title }}</span>
              <div style="margin-left: 10px">
                <GiSvgIcon :name="item.status ? 'success' : 'warning'" :size="14" /><span
                  style="margin-left: 5px; font-size: 12px"
                  >{{ item.status ? '已开启' : '未开启' }}</span
                >
              </div>
            </div>
            <div style="font-size: 12px">{{ item.subtitle }}</div>
          </div>
        </div>
        <div>
          <a-button disabled>未开放</a-button>
        </div>
      </div>
      <div>
        <div class="content_title">
          <div class="icon"><GiSvgIcon name="login-protect" :size="36" /></div>
          <div>
            <div style="font-size: 14px; font-weight: 500; line-height: 28px">操作保护</div>
            <div style="font-size: 12px">进行敏感操作时需进行二次身份校验</div>
          </div>
        </div>
        <div class="content_Box">
          <p>可使用<span class="subTitle">手机号</span>进行二次身份验证</p>
          <p>未设置密码有效期</p>
          <p>敏感操作二次身份验证后<span class="subTitle">10</span>分钟内不需要再次进行验证</p>
          <p class="link_btn">修改规则(未开发)</p>
        </div>
      </div>
    </template>
  </Card>
</template>
<script setup lang="ts">
import Card from '../components/Card.vue'
interface ModeItem {
  title: string
  icon: string
  subtitle: string
  status: boolean
}
const modeList = ref<ModeItem[]>([])
modeList.value = [
  { title: '登录保护', icon: 'login-protect', subtitle: '开启登录保护后，账号登录需进行二次身份验证', status: false }
]
</script>
<style scoped lang="scss">
.mode-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  .mode-item-content {
    display: flex;
    align-items: center;
    .icon {
      margin-right: 10px;
    }
  }
}
.content_title {
  display: flex;
  align-items: center;
  .icon {
    margin-right: 10px;
  }
}
.content_Box {
  border-left: 1px solid #ccc;
  margin-left: 40px;
  padding-left: 10px;
  font-size: 12px;
  margin-top: 20px;
  & > p {
    margin: 10px;
  }
}
.link_btn {
  cursor: pointer;
  color: #007aff;
  &:hover {
    color: rgba($color: #007aff, $alpha: 0.8);
  }
}
.subTitle {
  background: var(--color-neutral-2);
  padding: 1px 5px;
  margin: 0px 5px;
  border-radius: 3px;
}
</style>
