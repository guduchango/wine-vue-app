<template>
  <div class="p-4">
    <Bar :data="chartData" :options="chartOptions" />
    <div class="mt-6">
      <p class="text-sm text-gray-600">{{ $t('Total Wines') }}: {{ totalWines }}</p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useWineStore } from '../stores/wines'
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const wineStore = useWineStore()

const varietyCounts = computed(() => {
  const counts = {}
  wineStore.wines.forEach(wine => {
    const variety = wine.variety || 'Unknown'
    counts[variety] = (counts[variety] || 0) + 1
  })
  return counts
})

const chartData = computed(() => ({
  labels: Object.keys(varietyCounts.value),
  datasets: [
    {
      label: 'Cantidad de vinos',
      backgroundColor: '#3b82f6',
      data: Object.values(varietyCounts.value),
    },
  ],
}))

const chartOptions = {
  responsive: true,
  plugins: {
    legend: { display: false },
    title: { display: true, text: 'Cantidad por variedad' },
  },
}

const totalWines = computed(() => wineStore.wines.length)
</script>