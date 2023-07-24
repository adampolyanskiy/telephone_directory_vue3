<script setup lang="ts">
import { ref } from 'vue';

const fileInput = ref<HTMLElement | null>();

defineEmits(['change']);
defineExpose({ fileInput });
</script>

<template>
  <input
    ref="fileInput"
    v-bind="$attrs"
    class="opacity-0 peer absolute -z-10"
    type="file"
    @change="$emit('change', $event)" />
  <label
    :for="$attrs.id"
    class="text-white flex basis-full justify-center items-center text-center py-3 cursor-pointer bg-gray-800 hover:bg-gray-900 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gray-300 font-medium rounded-lg text-sm px-5 dark:bg-gray-800 dark:hover:bg-gray-700 dark:peer-focus:ring-gray-700 dark:border-gray-700">
    <slot></slot>
  </label>
</template>

<style scoped></style>
