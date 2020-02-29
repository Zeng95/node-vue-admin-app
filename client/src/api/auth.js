import httpClient from './httpClient'

const END_POINT = '/auth'

const checkName = data => {
  return httpClient.post(`${END_POINT}/register/check/name`, data)
}

const checkEmail = data => {
  return httpClient.post(`${END_POINT}/register/check/email`, data)
}

const register = data => {
  return httpClient.post(`${END_POINT}/register`, data)
}

const login = data => {
  return httpClient.post(`${END_POINT}/login`, data)
}

const logout = () => {
  return httpClient.post(`${END_POINT}/logout`)
}

export default {
  register,
  checkName,
  checkEmail,
  login,
  logout
}
