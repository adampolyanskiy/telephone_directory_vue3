import { createApp } from 'vue';

import App from './App.vue';
import './assets/styles/main.css';
import AppButton from './components/ui/AppButton.vue';
import AppTextInput from './components/ui/AppTextInput.vue';
import FilterInput from './components/ui/FilterInput.vue';
import { ContactService as ContactServiceSymbol } from './constants';
import { contactService } from './services/contact-service';

const app = createApp(App);

app.provide(ContactServiceSymbol, contactService);

app.component('AppButton', AppButton);
app.component('AppTextInput', AppTextInput);
app.component('FilterInput', FilterInput);

app.mount('#app');
