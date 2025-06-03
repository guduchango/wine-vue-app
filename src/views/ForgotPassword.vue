<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-100">
      <div class="w-full max-w-md bg-white p-8 rounded shadow">
        <h1 class="text-2xl font-bold mb-6 text-center">Forgot Password</h1>
  
        <form @submit.prevent="handleSubmit" class="space-y-4">
          <div>
            <label class="block text-sm font-medium mb-1">Email</label>
            <input
              v-model="email"
              type="email"
              required
              class="w-full p-2 border rounded"
              placeholder="your@email.com"
            />
          </div>
  
          <button
            type="submit"
            class="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Send Reset Link
          </button>
        </form>
  
        <p v-if="message" class="text-green-600 text-sm mt-4">{{ message }}</p>
        <p v-if="error" class="text-red-600 text-sm mt-4">{{ error }}</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const email = ref('')
  const message = ref('')
  const error = ref('')
  
  async function handleSubmit() {
    message.value = ''
    error.value = ''
    const url = import.meta.env.VITE_API_URL+'/forgot-password'
  
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json', // importante si usás Sanctum o API
        },
        body: JSON.stringify({ email: email.value }),
      })
  
      const data = await response.json()
  
      if (!response.ok) {
        throw new Error(data.message || data.errors?.email?.[0] || 'Something went wrong')
      }
  
      message.value = 'A reset link has been sent to your email.'
      email.value = ''
    } catch (err) {
      error.value = err.message
    }
  }
  </script>
  