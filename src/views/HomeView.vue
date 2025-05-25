<script setup>
import { useAuthStore } from '../stores/auth'
const auth = useAuthStore()
</script>

<template>
  <div class="p-4 bg-gray-800 text-white flex justify-between">
    <div>Mi App</div>
    <div v-if="auth.user">
      Bienvenido, {{ auth.user.name || auth.user.email }} |
      <button @click="auth.logout" class="underline">Salir</button>
    </div>
    <div v-else>
      <router-link to="/login" class="underline">Login</router-link>
    </div>
  </div>
</template>
