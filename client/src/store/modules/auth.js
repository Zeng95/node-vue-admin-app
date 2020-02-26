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
    try {
      const response = await auth.register(data)
      commit('SET_STATUS', true)
      commit('SET_USER', response.data)
    } catch (error) {
      // handle the error here
    }
  },

  async login({ commit }) {
    try {
      commit('SET_STATUS', true)
    } catch (error) {
      // handle the error here
    }
  },

  async logout({ commit }) {
    try {
      commit('SET_STATUS', false)
    } catch (error) {
      // handle the error here
    }
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
