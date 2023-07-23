<script setup lang="ts">
import TelephoneDirectoryTable from '@/components/buisness/TelephoneDirectoryTable.vue';
import AppButton from '@/components/ui/AppButton.vue';
import FilterInput from '@/components/ui/FilterInput.vue';
import { ContactService } from '@/constants';
import type { Contact, ContactService as IContactService } from '@/interfaces';
import { inject, reactive, ref, watch } from 'vue';

const contactService = inject<IContactService>(ContactService);

const filter = ref<string>();

const contacts = reactive<Contact[]>([]);

let filteredContacts = contacts;

function generateRandomContact() {
  contacts.push(contactService!.generateRandomContact());
}

watch(filter, () => {
  filteredContacts = contactService!.filterContacts(contacts, filter.value!);
});
</script>

<template>
  <main class="p-10">
    <div class="bg-gray-50 mb-4 p-3 rounded-lg drop-shadow-md flex">
      <AppButton class="mr-3">Добавить</AppButton>
      <AppButton
        class="mr-3"
        @click="generateRandomContact()"
        >Сгенерировать</AppButton
      >
      <FilterInput
        v-model.trim="filter"
        class="basis-1/3">
      </FilterInput>
    </div>
    <div>
      <TelephoneDirectoryTable
        class="rounded-lg drop-shadow-lg"
        :contacts="filteredContacts">
      </TelephoneDirectoryTable>
    </div>
  </main>
</template>

<style scoped></style>
