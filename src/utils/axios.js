import originalAxios from 'axios'

const axios = originalAxios.create({
    timeout: 5000,
    // withCredentials: true,
    onUploadProgress: null,
})

axios.defaults.headers.delete['Content-Type'] = 'application/json; charset=utf-8'

axios.interceptors.request.use((config) => {
    config.url = process.env.API_URL + config.url
    return config
})
export default axios
