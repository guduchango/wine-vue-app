<template>
  <nav class="fixed bottom-0 left-0 right-0 bg-white border-t shadow z-10">
    <div class="flex justify-around p-2 text-xs relative">
      <!-- Home -->
      <RouterLink to="/dashboard">
        <button class="flex flex-col items-center text-gray-600 hover:text-blue-500">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7m-9 2v8m-4 0h8" />
          </svg>
          {{$t('Home')}}
        </button>
      </RouterLink>

      <!-- Wines -->
      <RouterLink to="/wine_list">
        <button class="flex flex-col items-center text-gray-600 hover:text-blue-500">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round"
        d="M8.25 3h7.5m0 0c.28 2.5-.51 4.75-2.25 6.25a4.5 4.5 0 0 1-3 1c-1.28 0-2.5-.5-3.25-1.25C7.01 7.75 7 5.5 8.25 3zm0 0v0M12 10v7m-3 4h6" />
            </svg>
          {{$t('Wines')}}
        </button>
      </RouterLink>

      <!-- Create -->
      <button @click="createWine" class="flex flex-col items-center text-gray-600 hover:text-blue-500">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
             stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round"
                d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
        {{$t('Create')}}
      </button>

      <!-- User -->
      <RouterLink to="/profile">
        <button class="flex flex-col items-center text-gray-600 hover:text-blue-500">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
               stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round"
                  d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0zM4.5 20.25a8.25 8.25 0 0 1 15 0" />
          </svg>
          {{$t('User')}}
        </button>
      </RouterLink>

      <!-- Exit -->
      <button @click="logout" class="flex flex-col items-center text-gray-600 hover:text-blue-500">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
             stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round"
                d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
        </svg>
        {{$t('Exit')}}
      </button>
    </div>
  </nav>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { useWineStore } from '../stores/wines'
import { useI18n } from 'vue-i18n'

const router = useRouter()
const auth = useAuthStore()
const wineStore = useWineStore()

function createWine() {
  wineStore.selectWine(null)
  router.push('/wine_form')
}

const logout = () => {
  auth.logout(router)
}


</script>
