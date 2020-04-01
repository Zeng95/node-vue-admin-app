const USER_ID_KEY = 'user_id'

// User Id
const getUserId = () => {
  return localStorage.getItem(USER_ID_KEY)
}

const setUserId = id => {
  return localStorage.setItem(USER_ID_KEY, id)
}

const removeUserId = () => {
  return localStorage.removeItem(USER_ID_KEY)
}

export { getUserId, setUserId, removeUserId }
