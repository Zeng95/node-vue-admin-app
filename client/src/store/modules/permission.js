import { asyncRoutes, constantRoutes } from '@/router'

// initial state
const state = {
  routes: []
}

// getters
const getters = {}

// mutations
const mutations = {
  SET_ROUTES(state, routes) {
    state.routes = constantRoutes.concat(routes)
  }
}

// actions
const actions = {
  generateRoutes({ commit }, role) {
    return new Promise((resolve) => {
      let accessedRoutes

      if (role === 'admin') {
        // 如果是管理员，获取所有需要用户权限的路由表
        accessedRoutes = asyncRoutes
      } else {
        accessedRoutes = filterAsyncRoutes(asyncRoutes, role)
      }

      commit('SET_ROUTES', accessedRoutes)

      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
