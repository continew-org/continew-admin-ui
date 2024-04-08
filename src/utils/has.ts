import { useUserStore } from '@/stores'

function authPermission(permission: string) {
  const all_permission = '*:*:*'
  const permissions = useUserStore().permissions
  if (permission && permission.length > 0) {
    return permissions.some((v) => {
      return all_permission === v || v === permission
    })
  } else {
    return false
  }
}

function authRole(role: string) {
  const super_admin = 'role_admin'
  const roles = useUserStore().roles
  if (role && role.length > 0) {
    return roles.some((v) => {
      return super_admin === v || v === role
    })
  } else {
    return false
  }
}

export default {
  /** 验证用户是否具备某权限 */
  hasPerm(permission: string) {
    return authPermission(permission)
  },
  /** 验证用户是否含有指定权限，只需包含其中一个 */
  hasPermOr(permissions: string[]) {
    return permissions.some((item) => authPermission(item))
  },
  /** 验证用户是否含有指定权限，必须全部拥有 */
  hasPermAnd(permissions: string[]) {
    return permissions.every((item) => authPermission(item))
  },
  /** 验证用户是否具备某角色 */
  hasRole(role: string) {
    return authRole(role)
  },
  /** 验证用户是否含有指定角色，只需包含其中一个 */
  hasRoleOr(roles: string[]) {
    return roles.some((item) => authRole(item))
  },
  /** 验证用户是否含有指定角色，必须全部拥有 */
  hasRoleAnd(roles: string[]) {
    return roles.every((item) => authRole(item))
  }
}
