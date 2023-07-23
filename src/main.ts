import { createApp } from 'vue';

import App from './App.vue';
import './assets/styles/main.css';
import { ContactService as ContactServiceSymbol } from './constants';
import { contactService } from './services/contact-service';

const app = createApp(App);

app.provide(ContactServiceSymbol, contactService);

app.mount('#app');
