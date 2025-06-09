<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 px-4">
    <div class="max-w-md w-full bg-white shadow-md rounded-xl p-8 space-y-6">
      <h2 class="text-2xl font-semibold text-center text-gray-800">{{ $t('Login') }}</h2>

      <form @submit.prevent="handleLogin" class="space-y-4">
        <div>
          <label class="block text-sm text-gray-700">{{ $t('Email') }}</label>
          <input v-model="email" type="email" :placeholder="$t('Enter your email')"
            class="mt-1 w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" required />
        </div>

        <div>
          <label class="block text-sm text-gray-700">{{ $t('Password') }}</label>
          <input v-model="password" type="password" :placeholder="$t('Enter your password')"
            class="mt-1 w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" required />
        </div>

        <div v-if="error" class="text-red-500 text-sm">
          {{ error }}
        </div>

        <button type="submit"
          class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-300">
          {{ $t('Login') }}
        </button>
      </form>

      <div class="flex justify-between text-sm text-gray-600 pt-2">
        <div>
          <RouterLink to="/forgot-password" class="text-blue-600 hover:underline">
            {{ $t('Forgot password?') }}
          </RouterLink>
        </div>
        <div>
          <RouterLink to="/register" class="text-blue-600 hover:underline">
            {{ $t('Register') }}
          </RouterLink>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth.js'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const email = ref('')
const password = ref('')
const error = ref(null)
const router = useRouter()
const auth = useAuthStore()

const handleLogin = async () => {
  error.value = null
  try {
    await auth.login({ email: email.value, password: password.value })
    router.push('/wine_list')
  } catch (e) {
    error.value = t('Invalid email or password.')
  }
}
</script>
