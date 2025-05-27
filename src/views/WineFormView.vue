<template>
  <div class="flex flex-col min-h-screen bg-white">
    <!-- Header -->
    <header class="flex items-center justify-between p-4 border-b">
      <h1 class="text-lg font-semibold">{{ isEditMode ? 'Edit' : 'Create' }}</h1>
      <div class="flex gap-2">
        <RouterLink to="/wine_list">
          <button class="w-12 p-2 rounded bg-blue-500 text-white">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
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
            <div class="space-y-2">
              <label class="block text-sm font-medium">Name</label>
              <input v-model="wine.name" type="text" class="w-full p-2 border rounded" />
            </div>
            <div class="space-y-2">
              <label class="block text-sm font-medium">Winery</label>
              <input v-model="wine.winery" type="text" class="w-full p-2 border rounded" />
            </div>
            <div class="space-y-2">
              <label class="block text-sm font-medium">Variety</label>
              <input v-model="wine.variety" type="text" class="w-full p-2 border rounded" />
            </div>
            <div class="space-y-2">
              <label class="block text-sm font-medium">Vintage</label>
              <input v-model="wine.vintage" type="number" class="w-full p-2 border rounded" />
            </div>
            <div class="space-y-2">
              <label class="block text-sm font-medium">Country</label>
              <input v-model="wine.country" type="text" class="w-full p-2 border rounded" />
            </div>
          </div>
          <div class="flex justify-end pt-4">
            <button type="submit" class="px-4 py-2 rounded bg-blue-600 text-white">Save</button>
          </div>
        </form>
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


// Router
const route = useRoute()
const router = useRouter()
const wineId = route.query.id || null
const isEditMode = ref(false)

// Estado reactivo
const wine = reactive({
  name: '',
  winery: '',
  variety: '',
  vintage: '',
  country: '',
})

// Si hay un ID, traemos el vino de la API
onMounted(async () => {
  if (wineId) {
    isEditMode.value = true
    try {
      const response = await api.get(`wines/${wineId}`)
      Object.assign(wine, response.data)
    } catch (error) {
      alert('Error loading wine')
    }
  }
})

async function handleSubmit() {
  try {
    if (isEditMode.value) {
      await api.put(`wines/${wineId}`, wine)
      alert('Wine updated!')
    } else {
      await api.post('wines', wine)
      alert('Wine created!')
    }
    router.push('/wine_list')
  } catch (error) {
    alert('Error saving wine')
  }
}
</script>
