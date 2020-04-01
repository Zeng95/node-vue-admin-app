const TOKEN_KEY = 'access_token'

// Token
const getToken = () => {
  return localStorage.getItem(TOKEN_KEY)
}

const setToken = token => {
  return localStorage.setItem(TOKEN_KEY, token)
}

const removeToken = () => {
  return localStorage.removeItem(TOKEN_KEY)
}

export { getToken, setToken, removeToken }
