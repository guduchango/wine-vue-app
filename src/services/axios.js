import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8000/api', // cambia por tu URL base
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
