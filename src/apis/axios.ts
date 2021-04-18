import ConfirmSignUpPage from '@components/pages/confirmsignup/ConfirmSignUpPage'
import axios, { AxiosRequestConfig } from 'axios'

axios.defaults.baseURL = 'https://hu5mcclx4l.execute-api.ap-northeast-2.amazonaws.com/prod'
axios.defaults.timeout = 5000
axios.defaults.onUploadProgress = null

interface ServiceRequestConfig {
  useToken?: boolean
}

export const noTokenConfig: AxiosRequestConfig & ServiceRequestConfig = {
  useToken: false,
}

axios.interceptors.request.use(
  (config: AxiosRequestConfig & ServiceRequestConfig) => {
    config.headers = {
      'Content-Type': 'application/json'
    }

    if (config.useToken !== false) {
      config.headers.Authorization = window.__token
    }

    return config
  },
  (error) => Promise.reject(error)
)

export default axios