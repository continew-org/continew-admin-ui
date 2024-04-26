import http from '@/utils/http'
import type * as System from './type'

const BASE_URL = '/system/announcement'

export function listAnnouncement(query: System.AnnouncementQuery) {
  return http.get<PageRes<System.AnnouncementResp[]>>(`${BASE_URL}`, query)
}

export function getAnnouncement(id: string) {
  return http.get<System.AnnouncementResp>(`${BASE_URL}/${id}`)
}

export function addAnnouncement(req: any) {
  return http.post(BASE_URL, req)
}

export function updateAnnouncement(req: any, id: string) {
  return http.put(`${BASE_URL}/${id}`, req)
}

export function delAnnouncement(ids: string | Array<number>) {
  return http.del(`${BASE_URL}/${ids}`)
}
