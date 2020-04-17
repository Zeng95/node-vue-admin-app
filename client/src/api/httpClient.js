import axios from 'axios'
import { getToken } from '@/utils/auth'

const { VUE_APP_BASE_URL } = process.env
const httpClient = axios.create({
  baseURL: VUE_APP_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

const authInterceptor = (config) => {
  config.headers['Authorization'] = getToken()
  return config
}

// Add a request interceptor
httpClient.interceptors.request.use(authInterceptor, (error) => {
  // Do something with request error
  return Promise.reject(error)
})

// Add a response interceptor
httpClient.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default httpClient
