<template>
  <RouterLink :to="to" class="block bg-white p-4 rounded shadow hover:bg-gray-50 transition text-center">
    <div class="text-2xl">{{ icon }}</div>
    <div class="text-sm text-gray-500">{{ $t(title) }}</div>
    <div class="text-lg font-bold">{{ value }}</div>
  </RouterLink>
</template>

<script setup>
defineProps({
  title: String,
  value: [String, Number],
  icon: String,
  to: String
})
</script>