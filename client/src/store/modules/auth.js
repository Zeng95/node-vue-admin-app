// import the API endpoints
import auth from '@/api/auth'

// initial state
const state = {
  user: null,
  status: {
    loggedIn: false
  }
}

// getters
const getters = {}

// actions
const actions = {
  async register({ commit }, data) {
    const response = await auth.register(data)
    commit('SET_STATUS', true)
    commit('SET_USER', response.data)
  },

  async login({ commit }) {
    commit('SET_STATUS', true)
  },

  async logout({ commit }) {
    commit('SET_STATUS', false)
  }
}

// mutations
const mutations = {
  SET_STATUS(state, status) {
    state.status.loggedIn = status
  },

  SET_USER(state, user) {
    state.user = user
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
