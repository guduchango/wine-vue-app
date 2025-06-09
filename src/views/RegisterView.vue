<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 px-4">
    <div class="max-w-md w-full bg-white shadow-md rounded-xl p-8 space-y-6">
      <h2 class="text-2xl font-semibold text-center text-gray-800">Create an account</h2>

      <form @submit.prevent="handleRegister" class="space-y-4">
        <div>
          <label class="block text-sm text-gray-700">{{$t('Name')}}</label>
          <input
            v-model="name"
            type="text"
            placeholder="Your name"
            class="mt-1 w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div>
          <label class="block text-sm text-gray-700">{{$t('Email')}}</label>
          <input
            v-model="email"
            type="email"
            placeholder="Your email"
            class="mt-1 w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div>
          <label class="block text-sm text-gray-700">{{$t('Password')}}</label>
          <input
            v-model="password"
            type="password"
            placeholder="Create a password"
            class="mt-1 w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div>
          <label class="block text-sm text-gray-700">{{$t('Confirm Password')}}</label>
          <input
            v-model="password_confirmation"
            type="password"
            placeholder="Confirm your password"
            class="mt-1 w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div v-if="error" class="text-red-500 text-sm">
          {{ error }}
        </div>

        <button
          type="submit"
          class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-300"
        >
          {{$t('Register')}}
        </button>
      </form>

      <div class="flex justify-between text-sm text-gray-600 pt-2">
        <RouterLink to="/login" class="text-blue-600 hover:underline">
          {{$t('Already have an account?')}}
        </RouterLink>
        <RouterLink to="/forgot-password" class="text-blue-600 hover:underline">
          {{$t('Forgot password?')}}
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const name = ref('')
const email = ref('')
const password = ref('')
const password_confirmation = ref('')
const error = ref(null)

const router = useRouter()
const auth = useAuthStore()

const handleRegister = async () => {
  error.value = null
  try {
    await auth.register({
      name: name.value,
      email: email.value,
      password: password.value,
      password_confirmation: password_confirmation.value
    })
    router.push('/wine_list')
  } catch (err) {
    console.error(err)
    error.value = t('Registration failed. Please check your input.')
  }
}
</script>
