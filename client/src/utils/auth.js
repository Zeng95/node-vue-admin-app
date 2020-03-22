const UserKey = 'user-info'

const getUser = () => {
  return JSON.parse(localStorage.getItem(UserKey))
}

/**
 *
 * @param {Object} user
 */
const setUser = user => {
  return localStorage.setItem(UserKey, JSON.stringify(user))
}

const removeUser = () => {
  return localStorage.removeItem(UserKey)
}

export { getUser, setUser, removeUser }
