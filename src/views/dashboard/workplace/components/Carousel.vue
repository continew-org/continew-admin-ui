<template>
  <a-carousel
    indicator-type="slider"
    show-arrow="hover"
    auto-play
    style="width: 100%; height: 150px; border-radius: 4px; overflow: hidden"
  >
    <a-carousel-item v-for="(item, idx) in dataList" :key="idx">
      <div>
        <a-link
          :href="item.url"
          target="_blank"
          rel="noopener"
        >
          <img :src="item.img" style="width: 100%; height: 150px;" :alt="item.name" />
        </a-link>
      </div>
    </a-carousel-item>
  </a-carousel>
</template>

<script setup lang="ts">
import { isHttp } from '@/utils/validate'

export interface DataItem {
  name: string
  img: string
  url: string
}

const images = ref<DataItem[]>([
  {
    name: '公众号',
    img: `https://continew.top/images/sponsor/ads/cn-qrcode.jpg?${new Date().getTime()}`,
    url: 'https://continew.top/discussion.html',
  },
  {
    name: '赞助',
    img: `https://continew.top/images/sponsor/ads/cn-sponsor.jpg?${new Date().getTime()}`,
    url: 'https://continew.top/sponsor/',
  },
])

const dataList = ref<DataItem[]>([])
const loading = ref(false)
// 查询列表数据
const getDataList = async () => {
  try {
    loading.value = true
    const base = `https://continew.top`
    const data = await (await fetch(`${base}/sponsor.json?${new Date().getTime()}`)).json()
    if (data) {
      // 只获取 special 和 platinum 赞助者
      const sponsors = [...data.special, ...data.platinum]
      sponsors.forEach((item) => {
        if (!item.name) {
          return
        }
        dataList.value.push({
          name: item.name,
          img: isHttp(item.img) ? item.img : `${base}/images/sponsor/ads/${item.img}`,
          url: item.url,
        })
      })
      dataList.value = [...dataList.value, ...images.value]
    } else {
      dataList.value = images.value
    }
  } catch (err) {
    // console.log(err)
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  await getDataList()
})
</script>
