<!-- components/FormSelect.vue -->
<template>
  <div class="space-y-2">
    <label class="block text-sm font-medium flex items-center gap-2">
      {{ label }}
      <TooltipInfo text="hola" />
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
const props = defineProps({
  label: String,
  modelValue: String,
  options: Array
})
const emit = defineEmits(['update:modelValue'])
</script>