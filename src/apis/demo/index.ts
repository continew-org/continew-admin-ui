import http from '@/utils/http'

export interface GeneralChart {
  xAxis: string[]
  data: Array<{ name: string, value: number[] }>
}
export interface ChartDataRecord {
  x: string
  y: number
  name: string
}
export interface DataChainGrowth {
  quota: string
}

export interface DataChainGrowthRes {
  count: number
  growth: number
  chartData: {
    xAxis: string[]
    data: { name: string, value: number[] }
  }
}
export function queryDataChainGrowth(data: DataChainGrowth) {
  return http.post<DataChainGrowthRes>('/data-chain-growth', data)
}

export interface PopularAuthorRes {
  list: {
    ranking: number
    author: string
    contentCount: number
    clickCount: number
  }[]
}

export function queryPopularAuthor() {
  return http.get<PopularAuthorRes>('/popular-author/list')
}

export interface ContentPublishRecord {
  x: string[]
  y: number[]
  name: string
}

export function queryContentPublish() {
  return http.get<ContentPublishRecord[]>('/content-publish')
}

export function queryContentPeriodAnalysis() {
  return http.get<GeneralChart>('/content-period-analysis')
}

export interface PublicOpinionAnalysis {
  quota: string
}
export interface PublicOpinionAnalysisRes {
  count: number
  growth: number
  chartData: ChartDataRecord[]
}
export function queryPublicOpinionAnalysis(data: DataChainGrowth) {
  return http.post<PublicOpinionAnalysisRes>(
    '/public-opinion-analysis',
    data
  )
}
export interface DataOverviewRes {
  xAxis: string[]
  data: Array<{ name: string, value: number[], count: number }>
}

export function queryDataOverview() {
  return http.get<DataOverviewRes>('/data-overview')
}
