<template>
  <div class="flex flex-col min-h-screen bg-white">
    <!-- Header -->
    <header class="flex items-center justify-between p-4 border-b">
      <h1 class="text-lg font-semibold">{{$t('Profile')}}</h1>
      <div class="flex gap-2">
        <RouterLink to="/wine_list">
          <button class="w-12 p-2 rounded bg-blue-500 text-white">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
            </svg>
          </button>
        </RouterLink>
      </div>
    </header>

    <main class="flex-1 overflow-y-auto p-4 pb-24">
      <div class="p-4 mb-4 rounded">
        <form @submit.prevent="handleSubmit">
          <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
            <FormInput v-model="user.name" label="name" />
            <div class="space-y-2">
              <label class="block text-sm font-medium">{{$t('Email')}}</label>
              <input
                color="gray"
                :value="user.email"
                type="email"
                class="w-full p-2 rounded border bg-gray-100 border-gray-300 text-gray-500 cursor-not-allowed"
                readonly
                disabled
              />
            </div>
            <FormSelect v-model="lenguaje" label="Lenguage" @click="handleLenguaje" :options="['en', 'es']" />
          </div>
          <div class="flex justify-end pt-4">
            <button type="button" @click="handleSubmit" class="px-4 py-2 rounded bg-blue-600 text-white">{{$t('Save')}}</button>
          </div>
        </form>
      </div>
    </main>

    <Menu />
  </div>
</template>

<script setup>
import { ref,watch,onMounted, readonly } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import FormInput from '../components/FormInput.vue'
import FormSelect from '../components/FormSelect.vue'
import Menu from '../components/Menu.vue'
import { useI18n } from 'vue-i18n'
import { useToast } from "vue-toastification";

const { t,locale } = useI18n()
const router = useRouter()
const auth = useAuthStore()
const toast = useToast();

const user = ref(auth.user)
console.log('user', user.value)
const lenguaje = ref(auth.getLenguaje() || 'en')

const handleLenguaje = () => {
  if (lenguaje.value === 'en') {
    auth.setLenguaje('en')
    locale.value = 'en'   
  } else {
    auth.setLenguaje('es')
    locale.value = 'es'   
  }
}

function handleSubmit() {
  try {
    auth.updateProfile(user.value.name)
    toast.success(t('Profile saved!'))
  } catch (error) {
    console.error('Error updating profile:', error)
    toast.error(t('Failed to save profile. Please try again.'))
  }
}

onMounted(() => {
  locale.value = lenguaje.value
})
</script>
