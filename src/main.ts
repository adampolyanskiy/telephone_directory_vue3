import 'flowbite/dist/flowbite.js';
import { createApp } from 'vue';

import App from './App.vue';
import './assets/styles/main.css';
import AppButton from './components/ui/AppButton.vue';
import AppForm from './components/ui/AppForm.vue';
import AppModal from './components/ui/AppModal.vue';
import AppPopup from './components/ui/AppPopup.vue';
import AppTable from './components/ui/AppTable.vue';
import AppTextInput from './components/ui/AppTextInput.vue';
import FilterInput from './components/ui/FilterInput.vue';
import { ContactService as ContactServiceSymbol, ModalService } from './constants';
import { contactService } from './services/contact-service';
import { modalService } from './services/modal';

const app = createApp(App);

app
  .provide(ContactServiceSymbol, contactService)
  .provide(ModalService, modalService)
  .component('AppButton', AppButton)
  .component('AppTextInput', AppTextInput)
  .component('FilterInput', FilterInput)
  .component('AppTable', AppTable)
  .component('AppModal', AppModal)
  .component('AppForm', AppForm)
  .component('AppPopup', AppPopup)
  .mount('#app');
