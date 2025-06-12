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

    <div class="grid grid-cols-2 gap-4 mx-2.5">
      <!-- Total Wines -->
      <CardStat
        title="Wines"
        :value="totalWines"
        icon="🍷"
        to="/wine_list"
      />

      <!-- Most Common Variety -->
      <CardStat
        title="Top Variety"
        :value="mostCommonVariety"
        icon="🌱"
        to="/dashboard/varieties"
      />

      <!-- Average Price -->
      <CardStat
        title="Avg. Price"
        :value="`$${avgPrice}`"
        icon="💰"
        to="/dashboard/price"
      />

      <!-- Highest Score -->
      <CardStat
        title="Top Score"
        :value="highestScore"
        icon="⭐"
        to="/dashboard/score"
      />
    </div>
     <CardDraw
        title="Last Wine"
        :value="lastWineName"
        icon="🍾"
        to="/wine_list"
      />
    <Menu />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useWineStore } from '../stores/wines'
import CardStat from '../components/CardStat.vue'
import CardDraw from '../components/CardDraw.vue'
import { ref} from 'vue'
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


const totalWines = computed(() => wineStore.wines.length)

const mostCommonVariety = computed(() => {
  const count = {}
  wineStore.wines.forEach(w => {
    count[w.variety] = (count[w.variety] || 0) + 1
  })
  return Object.entries(count).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A'
})

const avgPrice = computed(() => {
  const prices = wineStore.wines.map(w => parseFloat(w.price)).filter(p => !isNaN(p))
  if (!prices.length) return '0.00'
  const avg = prices.reduce((a, b) => a + b, 0) / prices.length
  return avg.toFixed(2)
})

const highestScore = computed(() => {
  const scores = wineStore.wines.map(w => parseInt(w.score)).filter(s => !isNaN(s))
  return scores.length ? Math.max(...scores) : 'N/A'
})

const lastWineName = computed(() => {
  if (!wineStore.wines.length) return 'N/A'
  const sorted = [...wineStore.wines].sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
  return sorted[0]?.name || 'N/A'
})
</script>
