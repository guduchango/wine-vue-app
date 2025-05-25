<template>
    <div class="flex items-center justify-center min-h-screen bg-gray-100">
      <form class="bg-white p-8 rounded shadow-md w-96 space-y-4">
        <h2 class="text-2xl font-bold text-center">Login</h2>
  
        <div>
          <label class="block text-sm font-medium">Email</label>
          <input type="email" v-model="email" class="w-full mt-1 p-2 border rounded" />
        </div>
  
        <div>
          <label class="block text-sm font-medium">Password</label>
          <input type="password" v-model="password" class="w-full mt-1 p-2 border rounded" />
        </div>
  
        <button
          type="button"
          @click="handleLogin"
          class="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded"
        >
          Iniciar Sesión
        </button>
  
        <p class="text-sm text-center">
          ¿No tenés cuenta?
          <router-link to="/register" class="text-blue-500 hover:underline">Registrate</router-link>
        </p>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted  } from 'vue'
  import { useAuthStore } from '../stores/auth'
  import { useRouter } from 'vue-router'
  
  const email = ref('')
  const password = ref('')
  const auth = useAuthStore()
  const router = useRouter()

  onMounted(() => {
  if (auth.user) {
    router.push('/wine_list') // Redirige al home o a donde quieras
  }
})
  
  function handleLogin() {
    auth.login(email.value, password.value)
    router.push('/wine_list') // o a donde quieras redirigir después de login
  }
  </script>
  