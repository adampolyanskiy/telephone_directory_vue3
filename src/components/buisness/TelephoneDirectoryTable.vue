<script setup lang="ts">
import type { Contact } from '@/interfaces';

import AppButton from '../ui/AppButton.vue';

defineProps<{
  contacts: Contact[];
}>();

defineEmits<{
  contactUpdate: [contact: Contact];
  contactDelete: [contact: number];
}>();
</script>

<template>
  <AppTable
    :items="contacts"
    :field-names="[
      'firstname',
      'middlename',
      'lastname',
      'address',
      'homephone',
      'cellphone',
      'actions'
    ]"
    :column-names="[
      'Имя',
      'Фамилия',
      'Отчество',
      'Адрес',
      'Домашний телефон',
      'Мобильный телефон',
      ''
    ]">
    <template #actions="{ item }">
      <AppButton
        class="mr-4"
        @click="$emit('contactUpdate', item)">
        Изменить
      </AppButton>
      <AppButton @click="$emit('contactUpdate', item.id)">Удалить</AppButton>
    </template>
  </AppTable>
</template>

<style scoped></style>
