<!-- src/components/Info.vue -->
<template>
  <div>
    <div class="text-sm text-gray-500">{{ $t(label) }}</div>
    <div class="text-base font-medium">{{ $t(value) }}</div>
  </div>
</template>

<script setup>
defineProps({
  label: String,
  value: [String, Number],
})
</script>