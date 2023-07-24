import 'flowbite/dist/flowbite.js';
import { createApp } from 'vue';

import App from './App.vue';
import './assets/styles/main.css';
import AppButton from './components/ui/AppButton.vue';
import AppFileInput from './components/ui/AppFileInput.vue';
import AppForm from './components/ui/AppForm.vue';
import AppModal from './components/ui/AppModal.vue';
import AppPopup from './components/ui/AppPopup.vue';
import AppTable from './components/ui/AppTable.vue';
import AppTextInput from './components/ui/AppTextInput.vue';
import FilterInput from './components/ui/FilterInput.vue';
import { ContactService, ContactToCsvMapper, CsvToContactMapper, ModalService } from './constants';
import { contactService } from './services/contact-service';
import { contactToCsvMapper, csvToContactMapper } from './services/csv-mappers';
import { modalService } from './services/modal';

const app = createApp(App);

app
  .provide(ContactService, contactService)
  .provide(ModalService, modalService)
  .provide(CsvToContactMapper, csvToContactMapper)
  .provide(ContactToCsvMapper, contactToCsvMapper)
  .component('AppButton', AppButton)
  .component('AppTextInput', AppTextInput)
  .component('AppFileInput', AppFileInput)
  .component('FilterInput', FilterInput)
  .component('AppTable', AppTable)
  .component('AppModal', AppModal)
  .component('AppForm', AppForm)
  .component('AppPopup', AppPopup)
  .mount('#app');
