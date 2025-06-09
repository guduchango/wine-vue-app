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

    <!-- Detalle -->
    <main class="flex-1 overflow-y-auto p-4 pb-24">
      <div v-if="!wine" class="text-gray-500">{{$t('Loading wine...')}}</div>
      <div v-else>
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-2xl font-bold text-gray-800">
            🍷 {{ wine.name }} <span class="text-sm text-gray-500">({{ wine.variety }})</span>
          </h2>
          <button @click="goToEdit" class="text-white bg-blue-500 px-4 py-1 rounded hover:bg-blue-700">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
            </svg>
          </button>
          <button @click="goToRemove()" class="text-white bg-red-700 px-4 py-1 rounded hover:bg-red-900">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
            </svg>
          </button>
        </div>

        <div class="grid grid-cols-2 gap-4 text-gray-700">
          <Info label="vintage" :value="wine.vintage" />
          <Info label="alcohol" :value="wine.alcohol + '%'" />
          <Info label="price" :value="'$' + wine.price" />
          <Info label="color" :value="wine.color" />
          <Info label="aroma" :value="wine.aroma" />
          <Info label="sweetness" :value="wine.sweetness" />
          <Info label="acidity" :value="wine.acidity" />
          <Info label="tannin" :value="wine.tannin" />
          <Info label="body" :value="wine.body" />
          <Info label="persistence" :value="wine.persistence" /> 
        </div>

        <div class="mt-6">
          <span class="text-sm font-semibold text-gray-600">{{$t('Score')}}</span>
          <span class="ml-2 text-gray-800">{{ $t(wine.score) }}</span>
        </div>
      </div>
    </main>

    <Menu />
  </div>
</template>

<script setup>
import { onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useWineStore } from '../stores/wines'
import Menu from '../components/Menu.vue'
import Info from '../components/Info.vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const wineStore = useWineStore()
const route = useRoute()
const router = useRouter()

const wineId = route.query.id
const wine = computed(() => wineStore.selectedWine)

// Si se accede directamente por URL (sin pasar por selectWine), buscamos el vino localmente
onMounted(() => {
  if (!wine.value && wineId) {
    const localWine = wineStore.wines.find(w => w.id == wineId)
    if (localWine) {
      wineStore.selectWine(localWine)
    } else {
      alert(t('Wine not found in store'))
      router.push('/wine_list')
    }
  }
})

const goToEdit = () => {
  router.push({ path: '/wine_form', query: { id: wine.value.id } })
}

async function goToRemove() {
  if (confirm(t('Are you sure you want to remove this wine?'))) {
    try {
      wineStore.deleteWine(wine.value.id)
      alert(t('Wine removed!'))
      router.push('/wine_list')
    } catch (error) {
      alert(t('Error removing wine:') + error)
    }
  }
}

</script>
