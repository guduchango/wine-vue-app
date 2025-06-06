<template>
  <div class="flex flex-col min-h-screen bg-white">
    <!-- Header -->
    <header class="flex items-center justify-between p-4 border-b">
      <h1 class="text-lg font-semibold">View</h1>
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

      <div class="flex justify-between items-center mb-">
        <h2 class="text-2xl font-bold text-gray-800">
          🍷 {{ wine.name }} <span class="text-sm text-gray-500">({{ wine.variety }})</span>
        </h2>
        <button @click="goToEdit" class="text-white bg-blue-600 px-4 py-1 rounded hover:bg-blue-700">
          Edit
        </button>
      </div>

      <div class="grid grid-cols-2 gap-4 text-gray-700">
        <Info label="Vintage" :value="wine.vintage" />
        <Info label="Alcohol" :value="wine.alcohol + '%'" />
        <Info label="Price" :value="'$' + wine.price" />
        <Info label="Color" :value="wine.color" />
        <Info label="Aroma" :value="wine.aroma" />
        <Info label="Sweetness" :value="wine.sweetness" />
        <Info label="Acidity" :value="wine.acidity" />
        <Info label="Tannin" :value="wine.tannin" />
        <Info label="Body" :value="wine.body" />
        <Info label="Persistence" :value="wine.persistence" />
      </div>

      <div class="mt-6">
        <span class="text-sm font-semibold text-gray-600">Score:</span>
        <span class="ml-2 text-gray-800">{{ wine.score }}</span>
      </div>


    </main>
    <Menu />

  </div>
</template>

<script setup>
import { reactive, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Menu from '../components/Menu.vue'
import api from '../services/api'
import Info from '../components/Info.vue'


const props = defineProps({
  wine: Object
})

const router = useRouter()

const goToEdit = () => {
   router.push({ path: '/wine_form', query: { id: wine.id } })
}


// Router
const route = useRoute()
const wineId = route.query.id || null

// Estado reactivo
const wine = reactive({
  name: '',
  variety: '',
  vintage: '',
  alcohol: '',
  price: '',
  color: '',
  aroma: '',
  sweetness: '',
  acidity: '',
  tannin: '',
  body: '',
  persistence: '',
  score: '',
})

// Si hay un ID, traemos el vino de la API
onMounted(async () => {
  try {
    const response = await api.get(`wines/${wineId}`)
    Object.assign(wine, response.data)
  } catch (error) {
    alert('Error loading wine')
  }
})

</script>
