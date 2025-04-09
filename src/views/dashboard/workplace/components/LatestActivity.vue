<template>
  <a-card class="general-card" title="最新动态" style="margin-bottom: 14px">
    <template #extra>
      <a-dropdown>
        <a-link>更多</a-link>
        <template #content>
          <a-doption>
            <a-link href="https://gitee.com/organizations/continew/events" target="_blank" rel="noopener">Gitee</a-link>
          </a-doption>
          <a-doption>
            <a-link href="https://gitcode.com/org/continew/discussion" target="_blank" rel="noopener">GitCode</a-link>
          </a-doption>
          <a-doption>
            <a-link href="https://github.com/orgs/continew-org/discussions" target="_blank" rel="noopener">GitHub</a-link>
          </a-doption>
        </template>
      </a-dropdown>
    </template>
    <a-skeleton v-if="loading" :loading="loading" :animation="true">
      <a-skeleton-line :rows="10" />
    </a-skeleton>
    <div v-else>
      <a-empty v-if="dataList.length === 0">暂无动态</a-empty>
      <a-comment
        v-for="(item, index) in dataList"
        v-else
        :key="index"
        :author="item.actor.nickname"
        :class="`animated-fade-up-${index}`"
      >
        <template #avatar>
          <a-badge>
            <template #content>
              <GiSvgIcon v-if="item.platform === 'GitHub'" name="github" :size="15" />
              <GiSvgIcon v-else-if="item.platform === 'Gitee'" name="gitee" :size="15" />
            </template>
            <a :href="item.actor.url" target="_blank" rel="noopener">
              <a-avatar :size="30">
                <img :src="item.actor.avatar" alt="avatar" />
              </a-avatar>
            </a>
          </a-badge>
        </template>
        <template #datetime>
          <span :title="item.createTime">{{ item.createTimeString }}</span>
        </template>
        <template #content>
          <div class="content">
            <p v-if="item.type === 'PUSH'">
              推送到了 <a-link :href="item.repo.url" target="_blank" rel="noopener">{{ item.repo.alias }}</a-link>
              {{ `的 ${item.payload.branch} 分支 ${item.payload.commits.length} 个提交` }}
              <a-comment
                v-for="(commit, idx) in item.payload.commits"
                :key="idx"
                class="commit"
              >
                <template #content>
                  <a-link :href="commit.url" target="_blank" rel="noopener" style="font-size: 12px" :title="commit.message">{{ commit.sha.substring(0, 7) }}</a-link>
                  <a :href="commit.url" target="_blank" rel="noopener" :title="commit.message">{{ commit.message }}</a>
                </template>
              </a-comment>
            </p>
            <p v-else-if="item.type === 'ISSUE_OPEN'">
              在 <a-link :href="item.repo.url" target="_blank" rel="noopener">{{ item.repo.alias }}</a-link>
              创建了 Issue <a-link :href="item.payload.url" target="_blank" rel="noopener">{{ item.payload.title }}</a-link>
            </p>
            <p v-else-if="item.type === 'ISSUE_CLOSE' || item.type === 'ISSUE_REOPEN'">
              更改了 <a-link :href="item.repo.url" target="_blank" rel="noopener">{{ item.repo.alias }}</a-link>
              的 Issue <a-link :href="item.payload.url" target="_blank" rel="noopener">{{ item.payload.title }}</a-link>
              状态为 {{ item.payload.stateString }}
            </p>
            <p v-else-if="item.type === 'ISSUE_COMMENT'">
              评论了 <a-link :href="item.repo.url" target="_blank" rel="noopener">{{ item.repo.alias }}</a-link>
              的 Issue <a-link :href="item.payload.url" target="_blank" rel="noopener">{{ item.payload.title }}</a-link>
            </p>
            <p v-else-if="item.type === 'PULL_REQUEST_OPEN'">
              在 <a-link :href="item.repo.url" target="_blank" rel="noopener">{{ item.repo.alias }}</a-link>
              创建了 Pull Request <a-link :href="item.payload.url" target="_blank" rel="noopener">{{ item.payload.title }}</a-link>
            </p>
            <p v-else-if="item.type === 'PULL_REQUEST_MERGE'">
              接受了 <a-link :href="item.repo.url" target="_blank" rel="noopener">{{ item.repo.alias }}</a-link>
              的 Pull Request <a-link :href="item.payload.url" target="_blank" rel="noopener">{{ item.payload.title }}</a-link>
            </p>
            <p v-else-if="item.type === 'PULL_REQUEST_CLOSE' || item.type === 'PULL_REQUEST_REOPEN'">
              更改了 <a-link :href="item.repo.url" target="_blank" rel="noopener">{{ item.repo.alias }}</a-link>
              的 Pull Request <a-link :href="item.payload.url" target="_blank" rel="noopener">{{ item.payload.title }}</a-link>
              状态为 {{ item.payload.stateString }}
            </p>
            <p v-else-if="item.type === 'CREATE'">
              推送了新的 {{ item.payload.refType }}
              <a-link :href="item.payload.url" target="_blank" rel="noopener">{{ item.payload.ref }}</a-link>
              到 <a-link :href="item.repo.url" target="_blank" rel="noopener">{{ item.repo.alias }}</a-link>
            </p>
            <p v-else-if="item.type === 'DELETE'">
              删除了 <a-link :href="item.repo.url" target="_blank" rel="noopener">{{ item.repo.alias }}</a-link>
              的 {{ item.payload.ref }} {{ item.payload.refType }}
            </p>
            <p v-else>暂无</p>
          </div>
        </template>
      </a-comment>
    </div>
  </a-card>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime'
import axios, { type AxiosRequestConfig, type AxiosResponse } from 'axios'
import qs from 'query-string'

dayjs.extend(relativeTime)
dayjs.locale('zh-cn')
export interface DataItem {
  type: string
  actor: {
    username: string
    nickname: string
    avatar: string
    url: string
  }
  repo: {
    name: string
    alias: string
    url: string
  }
  payload: object
  createTime: string
  createTimeString: string
}

const get = <T = unknown>(url: string, params?: object, config?: AxiosRequestConfig): Promise<ApiRes<T>> => {
  return new Promise((resolve, reject) => {
    axios
      .request<T>({
        method: 'get',
        url,
        params,
        paramsSerializer: (obj) => {
          return qs.stringify(obj)
        },
        ...config,
      })
      .then((res: AxiosResponse) => resolve(res.data))
      .catch((err: { msg: string }) => reject(err))
  })
}

const dataList = ref<DataItem[]>([])
const loading = ref(false)
// 查询列表数据
const getDataList = async () => {
  try {
    loading.value = true
    const { data } = await get('https://api.charles7c.top/git/orgs/events/continew')
    data.forEach((item) => {
      dataList.value.push({
        ...item,
        createTimeString: dayjs(new Date(item.createTime)).fromNow(),
      })
    })
  } catch (err) {
    // console.log(err)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  getDataList()
})
</script>

<style scoped lang="scss">
:deep(.arco-comment:not(:first-of-type), .arco-comment-inner-comment) {
  margin-top: 10px;
}

:deep(.arco-comment:not(:last-of-type)) {
  border-bottom: 1px solid var(--color-border-1);
  padding-bottom: 10px;
}

:deep(.arco-comment-content) {
  color: var(--color-text-2);
}

:deep(.arco-comment-datetime) {
  color: var(--color-text-4);
}

.commit.arco-comment {
  margin-top: 10px;
  font-size: 12px;
  border-bottom: none;
  padding-bottom: 0;
}
</style>
