<template>
    <div class="flex flex-col min-h-screen bg-white">
      <!-- Header -->
      <header class="flex items-center justify-between p-4 border-b">
        <h1 class="text-lg font-semibold">Create</h1>
        <div class="flex gap-2">
          <RouterLink to="/wine_list">
            <button class="w-12 p-2 rounded bg-blue-500 text-white">
            <span class="text-xl">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
              </svg>
            </span>
          </button>
          </RouterLink>
        </div>
      </header>
      <main class="flex-1 overflow-y-auto p-4 pb-24">
        <div class="p-4 mb-4  rounded ">
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
        <!-- Bottom Menu -->
        <Menu />
      </div>
    
</template>

<script setup>
import { reactive } from 'vue'
import { useWineStore } from '../stores/wines'
import { useRouter } from 'vue-router'
import Menu from '../components/Menu.vue'

const wineStore = useWineStore()
const router = useRouter()

// Creamos un objeto reactivo para el formulario
const wine = reactive({
  name: '',
  winery: '',
  variety: '',
  vintage: '',
  country: '',
})

// Si hay un vino seleccionado (modo edición), copiamos sus datos
if (wineStore.selectedWine) {
  Object.assign(wine, wineStore.selectedWine)
}

function handleSubmit() {
  // Si es edición, actualizamos. Si no, agregamos.
  if (wineStore.selectedWine) {
    wineStore.updateWine(wine)  // Necesitás definir esta función en el store
    alert(`Vino actualizado: ${wine.name}`)
  } else {
    wineStore.addWine(wine)
    alert(`Vino agregado: ${wine.name}`)
  }

  // Limpiamos el formulario
  Object.assign(wine, {
    name: '',
    winery: '',
    variety: '',
    vintage: '',
    country: '',
  })

  // Navegamos de vuelta a la lista
  router.push('/wine_list')
}
</script>