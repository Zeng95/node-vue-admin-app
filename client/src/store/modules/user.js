import users from '@/api/users'
import { getUserId } from '@/utils/user'

// initial state
const state = {
  id: getUserId(),
  name: '',
  email: '',
  avatar: '',
  role: ''
}

// getters
const getters = {
  role: (state) => {
    return state.role
  }
}

// mutations
const mutations = {
  SET_ID: (state, id) => {
    state.id = id
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_EMAIL: (state, email) => {
    state.email = email
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLE: (state, role) => {
    state.role = role
  }
}

// actions
const actions = {
  fetchUser({ commit, state }) {
    return new Promise((resolve, reject) => {
      users
        .getUser(state.id)
        .then((res) => {
          const { user } = res.data

          commit('SET_NAME', user.name)
          commit('SET_EMAIL', user.email)
          commit('SET_AVATAR', user.avatar)
          commit('SET_ROLE', user.role)

          resolve(user.role)
        })
        .catch((err) => {
          reject(err)
        })
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
