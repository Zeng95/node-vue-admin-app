import httpClient from './httpClient'

const END_POINT = '/users'

/**
 * 通过 id 获取指定用户
 */
const getUser = id => {
  return httpClient.get(`${END_POINT}/${id}`)
}

export default {
  getUser
}
