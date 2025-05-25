<template>
    <div class="flex items-center justify-center min-h-screen bg-gray-100">
      <form class="bg-white p-8 rounded shadow-md w-96 space-y-4">
        <h2 class="text-2xl font-bold text-center">Registro</h2>
  
        <div>
          <label class="block text-sm font-medium">Nombre</label>
          <input type="text" v-model="firstName" class="w-full mt-1 p-2 border rounded" />
        </div>
  
        <div>
          <label class="block text-sm font-medium">Apellido</label>
          <input type="text" v-model="lastName" class="w-full mt-1 p-2 border rounded" />
        </div>
  
        <div>
          <label class="block text-sm font-medium">Email</label>
          <input type="email" v-model="email" class="w-full mt-1 p-2 border rounded" />
        </div>
  
        <div>
          <label class="block text-sm font-medium">Contraseña</label>
          <input type="password" v-model="password" class="w-full mt-1 p-2 border rounded" />
        </div>
  
        <div>
          <label class="block text-sm font-medium">Repetir Contraseña</label>
          <input type="password" v-model="confirmPassword" class="w-full mt-1 p-2 border rounded" />
        </div>
  
        <button
          type="button"
          @click="handleRegister"
          class="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded"
        >
          Registrarse
        </button>
  
        <p class="text-sm text-center">
          ¿Ya tenés cuenta?
          <router-link to="/login" class="text-blue-500 hover:underline">Iniciar sesión</router-link>
        </p>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useAuthStore } from '../stores/auth'
  import { useRouter } from 'vue-router'
  
  const firstName = ref('')
  const lastName = ref('')
  const email = ref('')
  const password = ref('')
  const confirmPassword = ref('')
  const auth = useAuthStore()
  const router = useRouter()
  
  function handleRegister() {
    if (password.value !== confirmPassword.value) {
      alert('Las contraseñas no coinciden')
      return
    }
  
    auth.register({
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      password: password.value,
    })
  
    router.push('/login') // o loguearlo directo y redirigir a /
  }
  </script>
  