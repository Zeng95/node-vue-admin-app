import axios from 'axios'

const { VUE_APP_BASE_URL } = process.env
const httpClient = axios.create({
  baseURL: VUE_APP_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
    // anything you want to add to the headers
  }
})

// Add a request interceptor
httpClient.interceptors.request.use(
  config => {
    // Do something before request is sent
    return config
  },
  error => {
    // Do something with request error
    return Promise.reject(error)
  }
)

// Add a response interceptor
httpClient.interceptors.response.use(
  response => {
    return response
  },
  error => {
    return Promise.reject(error)
  }
)

export default httpClient
