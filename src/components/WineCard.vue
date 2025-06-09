<!-- WineCard.vue -->
<template>
  <div class="bg-white rounded-2xl shadow-md p-4 flex justify-between items-center gap-4 hover:shadow-md transition-all">
    <div class="flex-1">
      <div class="text-lg font-semibold text-gray-800 capitalize">
        {{ wine.name }} | {{ wine.variety }} <span class="text-gray-500 font-normal">({{ wine.vintage }})</span>
      </div>
      <div class="text-sm text-gray-500 mt-1">
        <span class="font-semibold text-gray-700">{{$t('Score')}}:</span> {{wine.score}}
      </div>
    </div>
    <div class="flex gap-2">
      <button
        class="p-2 rounded-full hover:bg-blue-100 text-blue-600"
        @click="$emit('edit', wine)"
      >
        <i class="fas fa-pen"></i>
      </button>
      <button
        class="p-2 rounded-full hover:bg-red-100 text-red-600"
        @click="$emit('delete', wine)"
      >
        <i class="fas fa-trash"></i>
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  wine: Object
})
defineEmits(['edit', 'delete'])
</script>
