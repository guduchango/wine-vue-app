<template>
  <div class="flex flex-col min-h-screen bg-white">
    <!-- Header -->
    <header class="flex items-center justify-between p-4 border-b">
      <h1 class="text-lg font-semibold">{{$t('Dashboard')}}</h1>
      <div class="flex gap-2">
        <button class="px-3 py-2 text-sm bg-blue-500 text-white rounded" @click="refreshWines()">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
          </svg>
        </button>
      </div>
    </header>
    <Menu />
  </div>
</template>

<script setup>
import { ref} from 'vue'
import { useWineStore } from '../stores/wines'
import Menu from '../components/Menu.vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const loading = ref(true)
const wineStore = useWineStore()

async function refreshWines() {
   await wineStore.fetchWines({ force: true })
  loading.value = true
  wineStore.fetchWines().finally(() => {
    loading.value = false
  })
}
</script>
