<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-100">
      <div class="w-full max-w-md bg-white p-8 rounded shadow">
        <h1 class="text-2xl font-bold mb-6 text-center">Reset Password</h1>
  
        <form @submit.prevent="handleSubmit" class="space-y-4">
          <div>
            <label class="block text-sm font-medium mb-1">Email</label>
            <input v-model="form.email" type="email" required class="w-full p-2 border rounded" />
          </div>
  
          <div>
            <label class="block text-sm font-medium mb-1">New Password</label>
            <input v-model="form.password" type="password" required class="w-full p-2 border rounded" />
          </div>
  
          <div>
            <label class="block text-sm font-medium mb-1">Confirm Password</label>
            <input v-model="form.confirmPassword" type="password" required class="w-full p-2 border rounded" />
          </div>
  
          <button type="submit" class="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Reset Password
          </button>
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
  import { reactive } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { useAuthStore } from '../stores/auth.js'
  
  const router = useRouter()
  const route = useRoute()
  const auth = useAuthStore()
  
  const token = route.query.token || route.params.token // soporte para ambas formas

  console.log('Token:', token) // Verifica que el token se esté recibiendo correctamente
  
  const form = reactive({
    email: '',
    password: '',
    confirmPassword: '',
  })
  
  async function handleSubmit() {
    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match")
      return
    }

    try {
      await auth.reset(token,form)
      router.push('/login')
    } catch (e) {
      console.log(e)
      alert(e?.response?.data?.message || 'An error occurred while resetting the password')
    }
}
  
  </script>
  