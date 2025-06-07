// components/FormInput.vue
<template>
  <div class="space-y-2">
    <label class="block text-sm font-medium">{{ label }}</label>
    <input
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      type="text"
      class="w-full p-2 border rounded"
    />
  </div>
</template>

<script setup>
const props = defineProps({
  label: String,
  modelValue: [String, Number],
  type: {
    type: String,
    default: 'text'
  }
})
const emit = defineEmits(['update:modelValue'])
</script>