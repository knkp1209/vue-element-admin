import { asyncRoutes, constantRoutes } from '@/router'
import Layout from '@/layout'

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

/**
 * Filter asynchronous API routing tables by recursion
 * @param permissions asyncRoutes
 */
export function toRoutes(permissions) {
  const res = []
  permissions.forEach(item => {
    const temp = {
      name: item.name,
      component: resolve => require([`@/views/${item.component}`], resolve),
      path: item.path,
      meta: {
        title: item.menu_name,
        icon: item.icon
      }
    }
    if (item.component === '@/layout') {
      temp.component = Layout
    }
    if (item.menu_status === 0) {
      temp.hidden = true
    }
    if (item.redirect) {
      temp.redirect = item.redirect
    }
    if (item.children && item.children.length > 0) {
      temp.children = toRoutes(item.children)
    }
    res.push(temp)
  })
  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes({ commit }, permissions) {
    /*
    return new Promise(resolve => {
      let accessedRoutes
      if (roles.includes('admin')) {
        accessedRoutes = asyncRoutes || []
      } else {
        accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
      }
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
     */

    return new Promise(resolve => {
      let accessedRoutes = []
      accessedRoutes = asyncRoutes.concat(toRoutes(permissions)) // 开发
      console.log(accessedRoutes)
      // accessedRoutes = toRoutes(permissions) // 正式
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
