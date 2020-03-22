import httpClient from './httpClient'

const END_POINT = '/auth'

const checkName = name => {
  return httpClient.post(`${END_POINT}/register/check_name`, name)
}

const checkEmail = email => {
  return httpClient.post(`${END_POINT}/register/check_email`, email)
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
