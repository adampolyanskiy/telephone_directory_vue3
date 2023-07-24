<script setup lang="ts">
import AppButton from '@/components/ui/AppButton.vue';
import { MESSAGE } from '@/constants';
import type { Contact } from '@/interfaces';

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
    v-bind="$attrs"
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
      'Отчество',
      'Фамилия',
      'Адрес',
      'Домашний телефон',
      'Мобильный телефон',
      ''
    ]">
    <template #actions="{ item }">
      <AppButton
        class="mr-4"
        @click="$emit('contactUpdate', item)">
        {{ MESSAGE.UPDATE }}
      </AppButton>
      <AppButton @click="$emit('contactDelete', item.id)">{{ MESSAGE.DELETE }}</AppButton>
    </template>
  </AppTable>
</template>

<style scoped></style>
