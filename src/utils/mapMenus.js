export function mapMenusToRoutes(userMenus) {
  const routes = []
  //1 先去加载默认所有的routes
  const allRoutes = []
  const routeFiles = require.context("../router/main", true, /\.js/)
  routeFiles.keys().forEach((key) => {
    const route = require("../router/main" + key.split(".")[1])
    allRoutes.push(route.default)
  })

  //2根据菜单获取需要添加的routes
  const _recurseGetRoute = (menus) => {
    for (const menu of menus) {
      if (menu.type === 2) {
        const route = allRoutes.find((route) => route.path === menu.url)
        if (route) routes.push(route)
      } else {
        _recurseGetRoute(menu.children)
      }
    }
  }

  _recurseGetRoute(userMenus)
  return routes
}

// ---
export function mapPathToBreadcrumbs(userMenus, currentPath) {
  const breadcrumbs = []
  for (const menu of userMenus) {
    if (menu.type === 1) {
      const findBreadcrumbs = mapPathToMenus(menu.children ?? [], currentPath)
      if (findBreadcrumbs) {
        breadcrumbs.push({ name: menu.name })
        breadcrumbs.push({ name: findBreadcrumbs.name })
        // return findBreadcrumbs
      }
    } else if (menu.type === 2 && menu.url === currentPath) {
      return menu
    }
  }

  return breadcrumbs
}

export function mapPathToMenus(userMenus, currentPath) {
  for (const menu of userMenus) {
    if (menu.type === 1) {
      const findMenu = mapPathToMenus(menu.children, currentPath)
      if (findMenu) {
        return findMenu.id
      }
    } else if (menu.type === 2 && menu.url === currentPath) {
      return menu
    }
  }
}

export function mapMenusToPermissions(userMenus) {
  const permissions = []

  const _recurseGetPermission = (menus) => {
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

export function mapMenuToLeafKeys(menuList) {
  const leafKeys = []

  const _recurseGetLeaf = (menuList) => {
    for (const menu of menuList) {
      if (menu.children) {
        _recurseGetLeaf(menu.children)
      } else {
        leafKeys.push(menu.id)
      }
    }
  }
  _recurseGetLeaf(menuList)
  return leafKeys
}
