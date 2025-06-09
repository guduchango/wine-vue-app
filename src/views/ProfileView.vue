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
            <FormInput v-model="user.email" label="email" />
            <FormSelect v-model="lenguaje" label="Lenguage" @click="handleLenguaje" :options="['en', 'es']" />
          </div>
          <div class="flex justify-end pt-4">
            <button type="button" @click="handleSubmit" class="px-4 py-2 roundesd bg-blue-600 text-white">{{$t('Save')}}</button>
          </div>
        </form>
      </div>
    </main>

    <Menu />
  </div>
</template>

<script setup>
import { ref,watch,onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import FormInput from '../components/FormInput.vue'
import FormSelect from '../components/FormSelect.vue'
import Menu from '../components/Menu.vue'
import { useI18n } from 'vue-i18n'

const { t,locale } = useI18n()
const router = useRouter()
const auth = useAuthStore()

const user = ref(auth.user)
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
  auth.updateProfile(user.value.name)
  alert(t('Profile saved!'))
}

onMounted(() => {
  locale.value = lenguaje.value
})
</script>
