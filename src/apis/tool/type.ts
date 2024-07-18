/** 工具代码生成类型 */
export interface TableResp {
  tableName: string
  comment?: string
  engine: string
  charset: string
  createTime?: string
  isConfiged: boolean
  disabled: boolean
}
export interface TableQuery {
  tableName?: string
}
export interface TablePageQuery extends PageQuery, TableQuery {}

export interface FieldConfigResp {
  tableName: string
  columnName: string
  columnType: string
  fieldName: string
  fieldType: string
  fieldSort: number
  comment: string
  isRequired: boolean
  showInList: boolean
  showInForm: boolean
  showInQuery: boolean
  formType: string
  queryType: string
  createTime?: string
}
export interface GenConfigResp {
  tableName: string
  moduleName: string
  packageName: string
  businessName: string
  author: string
  tablePrefix: string
  isOverride: boolean
  createTime?: string
  updateTime?: string
}
export interface GeneratorConfigResp {
  genConfig: GenConfigResp
  fieldConfigs: FieldConfigResp[]
}
export interface GeneratePreviewResp {
  path: string
  fileName: string
  content: string
}
