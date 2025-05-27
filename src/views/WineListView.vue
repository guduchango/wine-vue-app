<template>
  <div class="flex flex-col min-h-screen bg-white px-2">
    <!-- Header -->
    <header class="flex items-center justify-between border-b">
      <h1 class="text-lg font-semibold">Wines</h1>
      <div class="flex gap-2 py-2">
        <button class="px-2 py-1 text-sm bg-blue-400 rounded" @click="createWine()">
          <!-- plus icon -->
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
            stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </button>
        <button @click="showFilters = !showFilters" class="px-2 py-1 text-sm bg-gray-200 rounded">

          <svg v-if="showFilters" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
            stroke-width="1.5" stroke="currentColor" class="size-6 text-blue-500">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z" />
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
            stroke-width="1.5" stroke="currentColor" class="size-6 text-gray-500">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z" />
          </svg>
          
        </button>

      </div>
    </header>

    <!-- Filtros -->
    <div class="grid grid-cols-1 gap-4 pt-2">
      <div v-if="showFilters" class="space-y-2 mb-4">
        <input v-model="searchQuery" type="text" placeholder="Search by name..." class="w-full p-2 border rounded" />
        <select v-model="selectedCountry" class="w-full p-2 border rounded">
          <option value="">All Countries</option>
          <option v-for="country in uniqueCountries" :key="country" :value="country">{{ country }}</option>
        </select>
        <select v-model="selectedVariety" class="w-full p-2 border rounded">
          <option value="">All Varieties</option>
          <option v-for="variety in uniqueVarieties" :key="variety" :value="variety">{{ variety }}</option>
        </select>
      </div>
    </div>

    <!-- Lista de vinos -->
    <main class="flex-1 overflow-y-auto pb-24">
      <div v-if="loading" class="text-center mt-8 text-gray-500">Loading wines...</div>
      <div v-else-if="filteredWines.length === 0" class="text-center mt-8 text-gray-500">No wines found</div>
      <div v-else v-for="wine in filteredWines" :key="wine.id" @click="editWine(wine)"
        class="border p-3 m-2 rounded shadow cursor-pointer hover:bg-gray-100">
        <h2 class="font-semibold">{{ wine.name }}</h2>
        <p><span class="font-semibold">variety:</span> {{ wine.variety }}</p>
        <p><span class="font-semibold">winery:</span> {{ wine.winery }}</p>
        <p><span class="font-semibold">vintage:</span> {{ wine.vintage }}</p>
        <p><span class="font-semibold">country:</span> {{ wine.country }}</p>
      </div>
    </main>

    <!-- Bottom Menu -->
    <Menu />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useWineStore } from '../stores/wines'
import { useRouter } from 'vue-router'
import Menu from '../components/Menu.vue'

const searchQuery = ref('')
const selectedCountry = ref('')
const selectedVariety = ref('')
const showFilters = ref(false)
const loading = ref(true)

const wineStore = useWineStore()
const router = useRouter()

onMounted(async () => {
  try {
    await wineStore.fetchWines()
  } catch (e) {
    console.error('Failed to fetch wines:', e)
    alert('Error loading wines from server')
  } finally {
    loading.value = false
  }
})

const wines = computed(() => wineStore.wines)

const filteredWines = computed(() => {
  return wines.value.filter(wine => {
    const matchesSearch = wine.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesCountry = selectedCountry.value === '' || wine.country === selectedCountry.value
    const matchesVariety = selectedVariety.value === '' || wine.variety === selectedVariety.value
    return matchesSearch && matchesCountry && matchesVariety
  })
})

const uniqueCountries = computed(() => [...new Set(wines.value.map(w => w.country))])
const uniqueVarieties = computed(() => [...new Set(wines.value.map(w => w.variety))])

function editWine(wine) {
  wineStore.selectWine(wine)
  router.push({ path: '/wine_form', query: { id: wine.id } })
}

function createWine() {
  wineStore.selectWine(null)
  router.push('/wine_form')
}
</script>
