import auth from '@/api/auth'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { setUserId } from '@/utils/user'

const token = getToken()
const initialState = token
  ? {
      status: { loggedIn: true },
      token
    }
  : {
      status: { loggedIn: false },
      token: null
    }

// initial state
const state = initialState

// getters
const getters = {
  loggedIn: state => {
    return state.status.loggedIn
  }
}

// mutations
const mutations = {
  AUTH_SUCCESS: state => {
    state.status.loggedIn = true
  },

  AUTH_FAILURE: state => {
    state.status.loggedIn = false
  },

  SET_TOKEN: (state, token) => {
    state.token = token
  }
}

// actions
const actions = {
  register({ commit }, formData) {
    return new Promise((resolve, reject) => {
      auth
        .login(formData)
        .then(res => {
          const { token } = res.data

          setToken(token)

          commit('AUTH_SUCCESS')
          commit('SET_TOKEN', token)

          resolve()
        })
        .catch(err => {
          commit('AUTH_FAILURE')

          reject(err)
        })
    })
  },

  login({ commit }, formData) {
    return new Promise((resolve, reject) => {
      auth
        .login(formData)
        .then(res => {
          const { token, user } = res.data

          setUserId(user.id)
          setToken(token)

          commit('user/SET_ID', user.id, { root: true })
          commit('SET_TOKEN', token)
          commit('AUTH_SUCCESS')

          resolve()
        })
        .catch(err => {
          commit('AUTH_FAILURE')

          reject(err)
        })
    })
  },

  logout({ commit }) {
    return new Promise(resolve => {
      commit('AUTH_FAILURE', false)
      commit('SET_TOKEN', null)

      // 清空用户信息
      removeToken()

      resolve()
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
