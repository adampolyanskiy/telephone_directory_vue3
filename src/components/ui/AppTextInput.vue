<script setup lang="ts">
const $props = defineProps<{
  label?: string;
  modelValue?: string;
}>();

console.log($props);

const $emit = defineEmits<{
  'update:modelValue': [value: string];
}>();

function updateModelValue(e: Event) {
  $emit('update:modelValue', (e.target as HTMLInputElement).value);
}
</script>

<template>
  <label
    v-if="$props.label"
    :for="($attrs.id as string | undefined)"
    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
    {{ $props.label }}
  </label>
  <input
    :id="($attrs.id as string | undefined)"
    type="text"
    :value="$props.modelValue"
    :placeholder="($attrs.placeholder as string | undefined)"
    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    @input="updateModelValue" />
</template>

<style scoped></style>
