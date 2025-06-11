<template>
  <div class="space-y-2">
    <label class="block text-sm font-medium">{{ $t(label) }}</label>
    <input
      type="date"
      :value="displayValue"
      @input="$emit('update:modelValue', $event.target.value)"
      class="w-full p-2 border rounded"
    />
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'

const props = defineProps({
  label: String,
  modelValue: String
})
const emit = defineEmits(['update:modelValue'])

// Genera la fecha de hoy en formato YYYY-MM-DD
function getToday() {
  const today = new Date()
  const yyyy = today.getFullYear()
  const mm = String(today.getMonth() + 1).padStart(2, '0')
  const dd = String(today.getDate()).padStart(2, '0')
  return `${yyyy}-${mm}-${dd}`
}

// Computed para mostrar valor actual o default
const displayValue = computed(() => props.modelValue || getToday())

// Emitir valor inicial si no está seteado
onMounted(() => {
  if (!props.modelValue) {
    emit('update:modelValue', getToday())
  }
})
</script>
