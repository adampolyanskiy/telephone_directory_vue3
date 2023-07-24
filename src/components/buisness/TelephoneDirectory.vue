<script setup lang="ts">
import TelephoneDirectoryTable from '@/components/buisness/TelephoneDirectoryTable.vue';
import AppButton from '@/components/ui/AppButton.vue';
import FilterInput from '@/components/ui/FilterInput.vue';
import { ContactService, CsvToContactMapper, DEFAULT_FILE_NAMES, MODAL_NAMES } from '@/constants';
import { ModalService } from '@/constants';
import { MESSAGE } from '@/constants';
import type { Contact, ContactService as IContactService } from '@/interfaces';
import type { CsvToEntityMapper, ModalService as IModalService } from '@/interfaces';
import { contactToCsvMapper } from '@/services/csv-mappers';
import FileSaver from 'file-saver';
import { inject, ref, shallowRef, unref, watchEffect } from 'vue';

import ContactForm from './ContactForm.vue';
import CsvExportButton from './CsvExportButton.vue';
import CsvImportButton from './CsvImportButton.vue';

const modal = inject<IModalService>(ModalService);
const contactService = inject<IContactService>(ContactService);
const csvToContactMapper = inject<CsvToEntityMapper<Contact>>(CsvToContactMapper);
const emptyContact = {
  firstname: '',
  lastname: '',
  middlename: '',
  address: '',
  homephone: '',
  cellphone: ''
};
const formValid = ref<boolean>(false);
const filter = ref<string>('');
const contacts = ref<Contact[]>([]);
const formValue = shallowRef<Contact>({ ...emptyContact });
const filteredContacts = shallowRef<Contact[]>([]);
const title = ref<string>('');
const name = ref<string>('');

async function addContact(contact?: Contact) {
  if (!contact) {
    title.value = MESSAGE.TITLES.ADD;
    name.value = MODAL_NAMES.CONTACT_ADD;

    try {
      await modal!.open(MODAL_NAMES.CONTACT_ADD);
    } catch {
      clearFormValue();
      return;
    }
  }

  const item = contact ? contact : { ...unref(formValue) };

  if (!contact) {
    clearFormValue();
  }

  if ((await contactService?.add(item)) === -1) {
    await modal!.open(MODAL_NAMES.CONTACT_DUPLICATE);
    return;
  }

  await getContacts();
}

async function getContacts() {
  contacts.value = await contactService!.getAll();
}

async function deleteContact(id: number) {
  const res = await modal!.open(MODAL_NAMES.CONTACT_DELETE);

  if (res) {
    await contactService?.delete(id);
    await getContacts();
  }
}

async function updateContact(item: Contact) {
  title.value = MESSAGE.TITLES.UPDATE;
  name.value = MODAL_NAMES.CONTACT_UPDATE;
  formValue.value = { ...item };

  try {
    await modal!.open(MODAL_NAMES.CONTACT_UPDATE);
  } catch {
    clearFormValue();
    return;
  }

  await contactService?.update(unref(formValue));
  clearFormValue();
  await getContacts();
}

function clearFormValue() {
  formValue.value = { ...emptyContact };
}

async function importCSV(csv: string) {
  const items = csvToContactMapper!.map(csv);
  await contactService?.bulkPut(items);
  contacts.value = [...items];
}

function exportCSV() {
  const blob = new Blob([contactToCsvMapper.map(contacts.value)], {
    type: 'text/csv; charset=utf-8'
  });
  FileSaver.saveAs(blob, DEFAULT_FILE_NAMES.CONTACTS_CSV);
}

await getContacts();

watchEffect(() => {
  filteredContacts.value = contactService!.filterContacts(contacts.value, filter.value!);
});
</script>

<template>
  <main class="py-10 px-5 md:px-24">
    <div class="bg-gray-50 mb-4 p-4 rounded-lg drop-shadow-md flex flex-wrap content-center">
      <div class="basis-full sm:basis-1/2 sm:pr-1 xl:basis-auto mb-2 xl:mb-0">
        <AppButton
          class="w-full h-full"
          @click="addContact()"
          >{{ MESSAGE.ADD }}</AppButton
        >
      </div>
      <div class="basis-full sm:basis-1/2 sm:pl-1 xl:basis-auto mb-2 xl:mb-0 xl:pr-1">
        <AppButton
          class="w-full h-full"
          @click="addContact(contactService!.generateRandomContact())"
          >{{ MESSAGE.GENERATE }}</AppButton
        >
      </div>
      <div class="basis-full xl:basis-2/6 mb-2 xl:mb-0 xl:pl-1 xl:pr-1">
        <FilterInput v-model.trim="filter"> </FilterInput>
      </div>
      <div class="basis-full sm:basis-1/2 sm:pr-1 xl:basis-auto mb-2 xl:mb-0 xl:pl-1 xl:ml-auto">
        <CsvImportButton @change="importCSV($event)"></CsvImportButton>
      </div>
      <div class="basis-full sm:basis-1/2 sm:pl-1 xl:basis-auto mb-2 xl:mb-0">
        <CsvExportButton
          class="w-full h-full"
          @click="exportCSV()">
        </CsvExportButton>
      </div>
    </div>
    <div>
      <TelephoneDirectoryTable
        class="rounded-lg drop-shadow-lg"
        :contacts="filteredContacts"
        @contact-update="updateContact($event)"
        @contact-delete="deleteContact($event)">
      </TelephoneDirectoryTable>
    </div>
  </main>

  <AppPopup
    :name="MODAL_NAMES.CONTACT_DELETE"
    :message="MESSAGE.DELETE_ITEM"
    :accept="MESSAGE.YES"
    :cancel="MESSAGE.NO">
  </AppPopup>

  <AppPopup
    :name="MODAL_NAMES.CONTACT_DUPLICATE"
    :message="MESSAGE.ITEM_DUPLICATE"
    :accept="MESSAGE.OK">
  </AppPopup>

  <AppModal
    :name="name"
    :title="title"
    :accept="MESSAGE.SAVE"
    :cancel="MESSAGE.CANCEL"
    :accept-button-enabled="!formValid">
    <ContactForm
      v-model="formValue"
      @valid="formValid = $event">
    </ContactForm>
  </AppModal>
</template>

<style scoped></style>
