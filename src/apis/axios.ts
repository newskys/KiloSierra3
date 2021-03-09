import axios, { AxiosRequestConfig } from 'axios'

axios.defaults.baseURL = 'https://hu5mcclx4l.execute-api.ap-northeast-2.amazonaws.com/prod'
axios.defaults.timeout = 5000
axios.defaults.onUploadProgress = null

// axios.interceptors.request.use(
//   (config: AxiosRequestConfig) => {
//     return config
//   },
//   (error) => Promise.reject(error)
// )

export default axios