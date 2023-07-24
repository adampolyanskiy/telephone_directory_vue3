<script setup lang="ts">
import TelephoneDirectory from './components/buisness/TelephoneDirectory.vue';
</script>

<template>
  <Suspense>
    <TelephoneDirectory></TelephoneDirectory>
    <template #fallback>
      <main class="p-10">
        <div class="bg-gray-50 mb-4 p-8 rounded-lg drop-shadow-md animate-pulse"></div>
        <div class="bg-gray-50 mb-4 p-4 rounded-lg drop-shadow-md animate-pulse"></div>
      </main>
    </template>
  </Suspense>
</template>

<style scoped></style>
