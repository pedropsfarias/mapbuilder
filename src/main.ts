import './assets/main.css';
import 'primevue/resources/themes/aura-light-indigo/theme.css';
import 'primeicons/primeicons.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import PrimeVue from 'primevue/config';
import AppController from './classes/AppController';
import Tooltip from 'primevue/tooltip';

import App from './App.vue';
import router from './router';

const app = createApp(App);

app.use(PrimeVue);
app.directive('tooltip', Tooltip);
app.use(createPinia());
app.use(router);

app.config.globalProperties.app = new AppController();

app.mount('#app');
