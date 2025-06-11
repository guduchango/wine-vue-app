<template>
  <div class="flex flex-col min-h-screen bg-white">
    <!-- Header -->
    <header class="flex items-center justify-between p-4 border-b">
      <h1 class="text-lg font-semibold">{{ isEditMode ? $t('Edit') : $t('Create') }}</h1>
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
            <FormDate v-model="wine.tasted_day" label="tasted day" />
            <FormInput v-model="wine.name" label="name" />
            <FormInput v-model="wine.variety" label="variety" />
            <FormInput v-model="wine.vintage" label="vintage" />
            <FormInput v-model="wine.alcohol" label="alcohol" type="number" step="0.1" />
            <FormInput v-model="wine.price" label="price" type="number" /> 
            <FormSelect v-model="wine.color" label="color" :options="['translucent', 'medium', 'deep']" />
            <FormSelect v-model="wine.aroma" label="aroma" :options="['low', 'medium', 'intense']" />
            <FormSelect v-model="wine.sweetness" label="sweetness" :options="['dry', 'semi-dry', 'sweet']" text="sweetness" />
            <FormSelect v-model="wine.acidity" label="acidity" :options="['low', 'medium', 'high']" text="acidity" />
            <FormSelect v-model="wine.tannin" label="tannin" :options="['mild', 'medium', 'antringent']" text="tannin" />
            <FormSelect v-model="wine.body" label="body" :options="['light', 'medium', 'robust']" text="body" />
            <FormSelect v-model="wine.persistence" label="persistence" :options="['short', 'medium', 'long']" text="persistence" />
             <FormSelect
              v-model="wine.score"
              label="score"
              :options="[
                'special gathering',
                'get-together with close friends',
                'hangout with friends',
                'its tasty, but expensive',
                'I wouldnt buy it'
                ]"
              />
          </div>
          <div class="flex justify-end pt-4">
            <button type="submit" class="px-4 py-2 rounded bg-blue-600 text-white">{{$t('Save')}}</button>
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
import { useWineStore } from '../stores/wines'
import Menu from '../components/Menu.vue'
import api from '../services/api'
import FormInput from '../components/FormInput.vue'
import FormSelect from '../components/FormSelect.vue'
import FormDate from '../components/FormDate.vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const wineStore = useWineStore()

const route = useRoute()
const router = useRouter()
const wineId = route.query.id || null
const isEditMode = ref(!!wineId)

// Estado local para el formulario
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
  tasted_day: '',
})

onMounted(async () => {
  if (isEditMode.value) {
    // Usa el store si ya tiene los datos
    if (wineStore.selectedWine && wineStore.selectedWine.id === Number(wineId)) {
      Object.assign(wine, wineStore.selectedWine)
    } else {
      try {
        const response = await api.get(`wines/${wineId}`)
        Object.assign(wine, response.data)
        wineStore.setSelectedWine(response.data)
      } catch (error) {
        alert(t('Error loading wine'))
      }
    }
  }
})

async function handleSubmit() {
  console.log('Submitting wine:', wine)
  try {
    if (isEditMode.value) {
      await wineStore.updateWine(wine)
      alert(t('Wine updated!'))
    } else {
      await wineStore.addWine(wine)
      alert(t('Wine created!'))
    }
    wineStore.clearSelectedWine()
    router.push('/wine_list')
  } catch (error) {
    alert(t('Error saving wine'))  
  }
}
</script>
