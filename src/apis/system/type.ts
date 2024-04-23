/** 系统用户类型 */
export interface UserResp {
  id: string
  username: string
  nickname: string
  avatar: string
  gender: number
  email: string
  phone: string
  description: string
  status: 1 | 2
  isSystem?: boolean
  createUserString: string
  createTime: string
  updateUserString: string
  updateTime: string
  deptId: string
  deptName: string
  disabled: boolean
}
export type UserDetailResp = UserResp & {
  roleIds?: Array<number>
  roleNames: string
  pwdResetTime?: string
}
export interface UserQuery {
  description?: string
  status?: number
  deptId?: string
  sort: Array<string>
}
export interface UserPageQuery extends PageQuery, UserQuery {}

/** 系统角色类型 */
export interface RoleResp {
  id: string
  name: string
  code: string
  sort: number
  description: string
  dataScope: number
  status: 1 | 2
  isSystem: boolean
  createUserString: string
  createTime: string
  updateUserString: string
  updateTime: string
  disabled: boolean
}
export interface RoleDetailResp {
  id: string
  name: string
  code: string
  sort: number
  description: string
  menuIds: Array<number>
  dataScope: number
  deptIds: Array<number>
  status: 1 | 2
  isSystem: boolean
  createUserString: string
  createTime: string
  updateUserString: string
  updateTime: string
  disabled: boolean
}
export interface RoleQuery extends PageQuery {
  description?: string
  status?: number
}

/** 系统菜单类型 */
export interface MenuResp {
  id: string
  title: string
  parentId: string
  type: 1 | 2 | 3
  path: string
  name: string
  component: string
  redirect: string
  icon: string
  isExternal: boolean
  isCache: boolean
  isHidden: boolean
  permission: string
  sort: number
  status: 1 | 2
  createUserString: string
  createTime: string
  updateUserString: string
  updateTime: string
  children: MenuResp[]
}
export interface MenuQuery {
  title?: string
  status?: number
  sort: Array<string>
}

/** 系统部门类型 */
export interface DeptResp {
  id: string
  name: string
  sort: number
  status: 1 | 2
  isSystem: boolean
  description: string
  createUserString: string
  createTime: string
  updateUserString: string
  updateTime: string
  parentId: string
  children: DeptResp[]
}
export interface DeptQuery {
  description?: string
  status?: number
  sort: Array<string>
}

/** 系统字典类型 */
export interface DictResp {
  id: string
  name: string
  code: string
  isSystem: boolean
  description: string
  createUserString: string
  createTime: string
  updateUserString: string
  updateTime: string
}
export interface DictQuery extends PageQuery {
  description?: string
}
export type DictItemResp = {
  id: string
  label: string
  value: string
  color: string
  sort: number
  description: string
  status: 1 | 2
  dictId: number
  createUserString: string
  createTime: string
  updateUserString: string
  updateTime: string
}
export interface DictItemQuery extends PageQuery {
  description?: string
  status?: number
  dictId: string
}

/** 系统文件类型 */
export type FileItem = {
  id: string
  name: string
  size: number
  url: string
  extension: string
  type: number
  storageId: string
  createUserString: string
  createTime: string
  updateUserString: string
  updateTime: string
}
export interface FileQuery extends PageQuery {
  name?: string
  type?: string
}

/** 系统存储类型 */
export type StorageResp = {
  id: string
  name: string
  code: string
  type: number
  accessKey: string
  secretKey: string
  endpoint: string
  bucketName: string
  domain: string
  description: string
  isDefault: boolean
  sort: number
  status: number
  createUserString: string
  createTime: string
  updateUserString: string
  updateTime: string
}
export interface StorageQuery extends PageQuery {
  description?: string
  status?: number
}

/** 系统参数类型 */
export interface OptionResp {
  name: string
  code: string
  value: string
  description: string
}
export interface OptionQuery {
  code: Array<string>
}

/** 基础配置类型 */
export interface BasicConfigResp {
  site_favicon: string
  site_logo: string
  site_title: string
  site_copyright: string
}

/** 绑定三方账号信息*/
export interface BindSocialAccountRes {
  source: string
  description: string
}
