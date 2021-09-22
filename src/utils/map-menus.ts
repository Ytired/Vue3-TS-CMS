import { IBreadcrumb } from '@/base-ui/breadcrumb/src/types/index'
import { RouteRecordRaw } from 'vue-router'

let firstMenu: any = null

export function mapMenusToRoutes(userMenus: any[]): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = []

  // 加载默认所有的routes
  const allRoutes: RouteRecordRaw[] = []
  const routeFiles = require.context('../router/main', true, /\.ts/)
  routeFiles.keys().forEach(key => {
    const route = require('../router/main' + key.split('.')[1])
    // 将每一个路径添加到数组中
    allRoutes.push(route.default)
  })

  // 根据菜单添加需要的routes
  const _recurseGetRoute = (menus: any[]) => {
    for (const menu of menus) {
      // 判断菜单类型是否等于2
      if (menu.type === 2) {
        // 查找并返回第一个元素
        const route = allRoutes.find(route => route.path === menu.url)
        // 将满足条件的元素添加进routes
        if (route) routes.push(route)
        if (!firstMenu) firstMenu = menu
      } else {
        // 递归调用
        _recurseGetRoute(menu.children)
      }
    }
  }
  _recurseGetRoute(userMenus)

  return routes
}

export function pathMapBreadcrumbs(userMenus: any[], currentPath: string): any {
  const breadcrumb: IBreadcrumb[] = []
  pathMapToMenu(userMenus, currentPath, breadcrumb)
  return breadcrumb
}

// 菜单
export function pathMapToMenu(
  userMenus: any[],
  currentPath: string,
  breadcrumbs?: IBreadcrumb[]
): any {
  for (const menu of userMenus) {
    if (menu.type === 1) {
      const findMenu = pathMapToMenu(menu.children ?? [], currentPath)
      if (findMenu) {
        breadcrumbs?.push({ name: menu.name })
        breadcrumbs?.push({ name: findMenu.name })
        return findMenu
      }
    } else if (menu.type === 2 && menu.url === currentPath) {
      return menu
    }
  }
}
export function mapMenusToPermissions(userMenus: any[]) {
  const permissions: string[] = []

  const _recurseGetPermission = (menus: any[]) => {
    for (const menu of menus) {
      if (menu.type === 1 || menu.type === 2) {
        _recurseGetPermission(menu.children ?? [])
      } else if (menu.type === 3) {
        permissions.push(menu.permission)
      }
    }
  }
  _recurseGetPermission(userMenus)
  return permissions
}

export { firstMenu }
