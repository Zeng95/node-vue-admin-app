import httpClient from './httpClient'

const END_POINT = '/auth'

const checkName = data => {
  return httpClient.post(`${END_POINT}/register/check_name`, data)
}

const checkEmail = data => {
  return httpClient.post(`${END_POINT}/register/check_email`, data)
}

const register = data => {
  return httpClient.post(`${END_POINT}/register`, data)
}

const login = data => {
  return httpClient.post(`${END_POINT}/login`, data)
}

export default {
  register,
  checkName,
  checkEmail,
  login
}
