<template>
  <div class="inline-block relative">
    <!-- Trigger -->
    <button type="button" @click="handleOpen" >
      <span
        class="text-xl font-bold text-blue-600 bg-blue-100 rounded-full w-6 h-6 flex items-center justify-center cursor-help"
        title="Click or hover for more info">
        ?
        </span>
    </button>

    <!-- Modal and Backdrop -->
    <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center">
      <!-- Backdrop -->
      <div class="absolute inset-0 bg-black bg-opacity-40" @click="handleClose"></div>
      <!-- Modal -->
      <div class="relative z-60 max-w-xs w-full bg-white rounded-xl p-4 shadow-lg border">
        <div class="text-sm text-gray-800 whitespace-pre-line">
          {{ $t(text) }}
        </div>
        <div class="text-right mt-4">
          <button
            type="button"
             @click="handleClose"
            class="text-blue-600 font-semibold"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  text: String
})

const show = ref(false)

function handleOpen(event) {
  event.preventDefault()
  event.stopPropagation()
  console.log('Tooltip abierto sin interferencias')
  show.value = true
}

function handleClose(event) {
  event.preventDefault()
  event.stopPropagation()
  console.log('Cerrando tooltip...')
  show.value = false
}
</script>
