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
import axios, { type AxiosRequestConfig, type AxiosResponse } from 'axios'
import qs from 'query-string'
import { isHttp } from '@/utils/validate'

export interface DataItem {
  name: string
  img: string
  url: string
}

const images = ref<DataItem[]>([
  {
    name: '公众号',
    img: `https://continew.top/qrcode-text.jpg?${new Date().getTime()}`,
    url: 'https://continew.top/about/intro.html',
  },
  {
    name: '赞助',
    img: `https://continew.top/sponsor.jpg?${new Date().getTime()}`,
    url: 'https://continew.top/sponsor.html',
  },
])

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
    const { data } = await get('https://api.charles7c.top/sponsor/platinum')
    if (data) {
      data.forEach((item) => {
        dataList.value.push({
          name: item.name,
          img: isHttp(item.img) ? item.img : `https://continew.top${item.img}`,
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
