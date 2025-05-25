import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)

  function login(email, password) {
    console.log('Logging in:', email, password)
    user.value = { email }
  }

  function register({ firstName, lastName, email, password }) {
    console.log('Registering:', firstName, lastName, email, password)
    user.value = { email, name: `${firstName} ${lastName}` }
  }

  function logout() {
    user.value = null
  }

  return { user, login, register, logout }
}, {
  persist: true
})
