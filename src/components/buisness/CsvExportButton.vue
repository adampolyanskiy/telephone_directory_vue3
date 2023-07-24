<script setup lang="ts">
import { MESSAGE } from '@/constants';
</script>

<template>
  <button
    type="button"
    class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-3 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
    {{ MESSAGE.EXPORT_CSV }}
  </button>
</template>

<style scoped></style>
