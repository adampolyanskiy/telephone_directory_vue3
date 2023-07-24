<script setup lang="ts">
import TelephoneDirectoryTable from '@/components/buisness/TelephoneDirectoryTable.vue';
import AppButton from '@/components/ui/AppButton.vue';
import FilterInput from '@/components/ui/FilterInput.vue';
import { ContactService, MODAL_NAMES } from '@/constants';
import { ModalService } from '@/constants';
import { MESSAGE } from '@/constants';
import type { Contact, ContactService as IContactService } from '@/interfaces';
import type { ModalService as IModalService } from '@/interfaces';
import { inject, ref, shallowRef, unref, watchEffect } from 'vue';

import ContactForm from './ContactForm.vue';

const $modal = inject<IModalService>(ModalService);
const contactService = inject<IContactService>(ContactService);
const emptyContact = {
  firstname: '',
  lastname: '',
  middlename: '',
  address: '',
  homephone: '',
  cellphone: ''
};
const addFormValid = ref<boolean>(false);
const filter = ref<string>('');
const contacts = ref<Contact[]>([]);
const formValue = shallowRef<Contact>({ ...emptyContact });
const filteredContacts = shallowRef<Contact[]>([]);

async function addContact(contact?: Contact) {
  if (!contact) {
    const res = await $modal!.open(MODAL_NAMES.CONTACT_ADD);

    if (!res) {
      clearFormValue();
      return;
    }
  }

  const item = contact ? contact : unref(formValue.value);

  if (!contact) {
    clearFormValue();
  }

  if ((await contactService?.add(item)) === -1) {
    await $modal!.open(MODAL_NAMES.CONTACT_DUPLICATE);
    return;
  }

  await getContacts();
}

async function getContacts() {
  contacts.value = await contactService!.getAll();
}

function clearFormValue() {
  formValue.value = { ...emptyContact };
}

async function deleteContact(id: number) {
  const res = await $modal!.open(MODAL_NAMES.CONTACT_DELETE);

  if (res) {
    await contactService?.delete(id);
    await getContacts();
  }
}

await getContacts();

watchEffect(() => {
  filteredContacts.value = contactService!.filterContacts(contacts.value, filter.value!);
});
</script>

<template>
  <main class="py-10 px-36">
    <div class="bg-gray-50 mb-4 p-3 rounded-lg drop-shadow-md flex">
      <AppButton
        class="mr-3"
        @click="addContact()"
        >{{ MESSAGE.ADD }}</AppButton
      >
      <AppButton
        class="mr-3"
        @click="addContact(contactService!.generateRandomContact())"
        >{{ MESSAGE.GENERATE }}</AppButton
      >
      <FilterInput
        v-model.trim="filter"
        class="basis-1/3">
      </FilterInput>
    </div>
    <div>
      <TelephoneDirectoryTable
        class="rounded-lg drop-shadow-lg"
        :contacts="filteredContacts"
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
    :name="MODAL_NAMES.CONTACT_ADD"
    :title="MESSAGE.TITLES.ADD"
    :accept="MESSAGE.SAVE"
    :cancel="MESSAGE.CANCEL"
    :accept-button-enabled="!addFormValid">
    <ContactForm
      v-model="formValue"
      @valid="addFormValid = $event"></ContactForm>
  </AppModal>

  <AppModal
    :name="MODAL_NAMES.CONTACT_UPDATE"
    :title="MESSAGE.TITLES.UPDATE"
    :accept="MESSAGE.SAVE"
    :cancel="MESSAGE.CANCEL">
    <ContactForm></ContactForm>
  </AppModal>
</template>

<style scoped></style>
