export interface StorageReq {
  name: string
  code: string
  type: number
  accessKey: string
  secretKey: string
  endpoint: string
  bucketName: string
  domain: string
  sort: number
  description: string
  isDefault: boolean
  status: 1 | 2
}
