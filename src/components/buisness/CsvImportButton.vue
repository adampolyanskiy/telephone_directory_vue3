<script setup lang="ts">
import { MESSAGE } from '@/constants';
import type { AppFileInput as IAppFileInput } from '@/interfaces';
import { ref } from 'vue';

import AppFileInput from '../ui/AppFileInput.vue';

const appFileInput = ref<IAppFileInput>();

const $emit = defineEmits<{
  change: [value: string];
}>();

function onChange() {
  const reader = new FileReader();
  reader.onload = () => {
    $emit('change', reader.result as string);
  };
  reader.readAsText(appFileInput.value!.fileInput.files![0]);
}
</script>

<template>
  <AppFileInput
    id="csv-import"
    ref="appFileInput"
    accept=".csv"
    @change="onChange()">
    {{ MESSAGE.IMPORT_CSV }}
  </AppFileInput>
</template>

<style scoped></style>
