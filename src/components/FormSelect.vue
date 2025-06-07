<!-- components/FormSelect.vue -->
<template>
  <div class="space-y-2">
    <label class="block text-sm font-medium flex items-center gap-2">
      {{ label }}
      <TooltipInfo v-if="getInfo" :text="getInfo" />
    </label>
    
    <select  class="w-full p-2 border rounded" 
      :value="modelValue"  
      @change="$emit('update:modelValue', $event.target.value)">
      <option value="">Select</option>
      <option v-for="option in options" :key="option" :value="option">{{ option }}</option>
    </select>
  </div>
</template>
<script setup>
import TooltipInfo from '../components/TooltipInfo.vue'
import { tooltips } from '../constants/tooltips.js' 
import { computed } from 'vue'
const props = defineProps({
  text: String,
  label: String,
  modelValue: String,
  options: Array
})
const emit = defineEmits(['update:modelValue'])

// Función que devuelve el texto del tooltip
const getInfo = computed(() => {
  return props.text && tooltips[props.text] ? tooltips[props.text] : ''
})



</script>