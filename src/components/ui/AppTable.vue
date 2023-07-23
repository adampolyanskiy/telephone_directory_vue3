<script setup lang="ts">
defineProps<{
  fieldNames?: string[];
  columnNames?: string[];
  items: any[];
}>();
</script>

<template>
  <div class="relative overflow-x-auto">
    <table class="w-full text-sm text-center text-gray-500 dark:text-gray-400">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th
            v-for="column in columnNames"
            :key="column"
            scope="col"
            class="px-6 py-3">
            {{ column }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in items"
          :key="item.id"
          class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
          <td
            v-for="fieldName in fieldNames"
            :key="fieldName"
            scope="row"
            class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
            <slot
              :name="fieldName"
              :item="item">
              {{ item[fieldName] }}
            </slot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped></style>
