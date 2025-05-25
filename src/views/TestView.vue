<template>
    <div class="flex flex-col min-h-screen bg-white">
      <!-- Header -->
      <header class="flex items-center justify-between p-4 border-b">
        <h1 class="text-lg font-semibold">Wines</h1>
        <div class="flex gap-2">
          <RouterLink to="/wine_form">
            <button class="w-12 p-2 rounded bg-blue-500 text-white">
            <span class="text-xl">+</span>
          </button>
          </RouterLink>
        </div>
      </header>
  
      <!-- Filtros -->
      <div class="p-4 border-b grid grid-cols-1 gap-4 md:grid-cols-3">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search by name..."
          class="w-full p-2 border rounded"
        />
        <select v-model="selectedCountry" class="w-full p-2 border rounded">
          <option value="">All Countries</option>
          <option v-for="country in uniqueCountries" :key="country" :value="country">
            {{ country }}
          </option>
        </select>
        <select v-model="selectedVariety" class="w-full p-2 border rounded">
          <option value="">All Varieties</option>
          <option v-for="variety in uniqueVarieties" :key="variety" :value="variety">
            {{ variety }}
          </option>
        </select>
      </div>
  
      <!-- Reservations List -->
      <main class="flex-1 overflow-y-auto p-4 pb-24">
        <div v-for="wine in filteredWines" :key="wine.id" class="p-4 mb-4 border rounded shadow-sm">
          <h2 class="font-semibold">{{ wine.name  }}</h2>
          <p><span class="font-semibold">variety:</span> {{ wine.variety }}</p>
          <p><span class="font-semibold">winery:</span> {{ wine.winery }}</p>
          <p><span class="font-semibold">vintage:</span> {{ wine.vintage }}</p>
          <p><span class="font-semibold">country:</span> {{ wine.country }}</p>
        </div>
      </main>
  
      <!-- Bottom Menu -->
      <nav class="fixed bottom-0 left-0 right-0 bg-white border-t shadow z-10">
        <div class="flex justify-around p-2 text-xs">
          <button class="flex flex-col items-center text-gray-600 hover:text-blue-500">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2"
              viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M3 12l2-2m0 0l7-7 7 7m-9 2v8m-4 0h8" />
            </svg>
            Home
          </button>
          <button class="flex flex-col items-center text-gray-600 hover:text-blue-500">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2"
              viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
            Units
          </button>
          <button class="flex flex-col items-center text-gray-600 hover:text-blue-500">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2"
              viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M5.121 17.804A4 4 0 017 16h10a4 4 0 011.879.804M12 12a4 4 0 100-8 4 4 0 000 8z" />
            </svg>
            Guests
          </button>
          <button class="flex flex-col items-center text-blue-600 font-medium">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2"
              viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M8 7V3m8 4V3M3 11h18M5 19h14a2 2 0 002-2v-5H3v5a2 2 0 002 2z" />
            </svg>
            Reservations
          </button>
        </div>
      </nav>
    </div>
  </template>
  
  <script setup>
import { ref, computed } from 'vue'
import { useWineStore } from '../stores/wines'

const searchQuery = ref('')
const selectedCountry = ref('')
const selectedVariety = ref('')  
const wineStore = useWineStore()
const wines = ref(wineStore.wines)

const filteredWines = computed(() => {
  return wines.value.filter(wine => {
    const matchesSearch = wine.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesCountry = selectedCountry.value === '' || wine.country === selectedCountry.value
    const matchesVariety = selectedVariety.value === '' || wine.variety === selectedVariety.value
    return matchesSearch && matchesCountry && matchesVariety
  })
})

// Utilidades para selects
const uniqueCountries = computed(() => [...new Set(wines.value.map(w => w.country))])
const uniqueVarieties = computed(() => [...new Set(wines.value.map(w => w.variety))])
</script>
  