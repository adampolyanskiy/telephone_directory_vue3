<script setup lang="ts">
interface Props {
  label?: string;
  modelValue?: string;
  valid: boolean;
}

const $props = withDefaults(defineProps<Props>(), {
  label: undefined,
  modelValue: undefined,
  valid: true
});

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
    :class="[
      'block mb-2 text-sm font-medium',
      valid && 'text-gray-900 dark:text-white',
      !valid && 'text-red-700 dark:text-red-500'
    ]">
    {{ $props.label }}
  </label>
  <input
    :id="($attrs.id as string | undefined)"
    type="text"
    :value="$props.modelValue"
    :placeholder="($attrs.placeholder as string | undefined)"
    :class="[
      'text-sm, rounded-lg block w-full p-2.5 focus:outline-none',
      valid &&
        'bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500',
      !valid &&
        'bg-red-50 border border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500'
    ]"
    @input="updateModelValue" />
</template>

<style scoped></style>
