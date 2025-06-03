import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // cambia por tu URL base
  headers: {
    Accept: 'application/json'
  }
})

// Token automático si existe
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default api
