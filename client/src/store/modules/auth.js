import auth from '@/api/auth'
import { getUser, setUser, removeUser } from '@/utils/auth'

const SUCCESS_OK = 200
const user = getUser()
const initialState = user
  ? {
      status: { loggedIn: true },
      user,
      token: user.accessToken
    }
  : {
      status: { loggedIn: false },
      user: null,
      token: null
    }

// initial state
const state = initialState

// getters
const getters = {
  loggedIn: state => {
    return state.status.loggedIn
  },
  user: state => {
    return state.user
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

  SET_USER: (state, user) => {
    state.user = user
  },

  SET_TOKEN: (state, token) => {
    state.token = token
  }
}

// actions
const actions = {
  async register({ commit }, data) {
    const res = await auth.register(data)

    commit('SET_STATUS', true)
    commit('SET_USER', res.data)
  },

  async login({ commit }, formData) {
    try {
      const res = await auth.login(formData)
      const { data, status } = res

      // 状态码是否等于 200
      if (status === SUCCESS_OK) {
        commit('AUTH_SUCCESS')
        commit('SET_TOKEN', data.accessToken)
        commit('SET_USER', data.user)

        // 存储用户信息
        setUser({
          ...data.user,
          accessToken: data.accessToken
        })

        return 'success'
      }
    } catch (err) {
      console.log(err)
    }
  },

  logout({ commit }) {
    return new Promise(resolve => {
      commit('AUTH_FAILURE', false)
      commit('SET_TOKEN', null)
      commit('SET_USER', null)

      // 清空用户信息
      removeUser()

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
