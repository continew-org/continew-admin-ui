export interface DeptReq {
  parentId: string
  name: string
  sort: number
  description: string
  status: 1 | 2
}
