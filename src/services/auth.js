// src/services/auth.js
import axios from 'axios'
import api from './api';

const API_URL = 'http://localhost:8000/api' // Asegurate que coincida con tu backend

axios.defaults.withCredentials = true // Necesario si usás Sanctum
axios.defaults.withXSRFToken = true;

export const login = async (credentials) => {
    console.log('credentials', credentials)
  const res = await axios.post(`${API_URL}/login`, credentials)
  localStorage.setItem('token', response.data.token) // si usás Passport
  return res.data
}

export const register = async (user) => {
  const res = await axios.post(`${API_URL}/register`, user)
  return res.data
}

export const logout = async () => {
  await axios.post(`${API_URL}/logout`)
}

export const getUser = async () => {
  const res = await api.get(`${API_URL}/user`)
  return res.data
}
