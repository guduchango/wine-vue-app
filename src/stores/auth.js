import {
  defineStore
} from 'pinia'
import api from '../services/api'
import axios from 'axios'
import {
  useRouter
} from 'vue-router'
const router = useRouter()

const public_api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true, // usalo solo si Sanctum y cookie
  withXSRFToken: true
})

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: localStorage.getItem('token') || null,
    lenguaje: 'en'
  }),

  persist: {
    lenguaje: 'en'
  },

  actions: {
    async login(credentials) {
      const {
        data
      } = await api.post('/login', credentials)
      this.token = data.token
      localStorage.setItem('token', data.token)
      await this.getUser()
    },

    async register(form) {
      console.log('form', form)
      try {
        const {
          data
        } = await public_api.post('/register', form)
        const token = data.token
        localStorage.setItem('token', token)
        this.token = token
        await this.getUser()
      } catch (error) {
        throw error
      }
    },

    async reset(token, form) {

      const info = {
        token: token,
        password: form.password,
        password_confirmation: form.confirmPassword,
        email: form.email
      }
      try {
        const {
          data
        } = await public_api.post('/reset-password', info)
        console.log('Success:', data)
        return data
      } catch (error) {
        throw error
      }
    },


    async updateProfile(name) {

      const info = {
        token: this.token,
        name: name,
      }

      try {
        const {
          data
        } = await api.post('/update-profile', info)
        console.log('Success:', data)
        return data
      } catch (error) {
        throw error
      }
    },

    async getUser() {
      if (!this.token) {
        throw new Error('No token found')
      }
      const {
        data
      } = await api.get('/user')
      this.user = data
    },

    logout(router) {
      this.user = null
      this.token = null
      localStorage.removeItem('token')
      router.push('/login')
    },

    setLenguaje(lenguaje) {
      this.lenguaje = lenguaje
    },

    getLenguaje() {
      return this.lenguaje
    },

  }
})