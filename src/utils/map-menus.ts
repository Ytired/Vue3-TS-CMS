import { RouteRecordRaw } from 'vue-router'

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
      } else {
        // 递归调用
        _recurseGetRoute(menu.children)
      }
    }
  }
  _recurseGetRoute(userMenus)

  return routes
}
