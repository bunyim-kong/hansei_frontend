import axios from 'axios'

export const useAxios = () => {
  const { token } = useAuth()

  const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  })

  api.interceptors.request.use(config => {
    if (token.value) {
      config.headers.Authorization = `Bearer ${token.value}`
    }
    return config
  })

  return { api }
}