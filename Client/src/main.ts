import { createApp } from 'vue';
import App from './App.vue';

import './style.css'
import Notifications from '@kyvg/vue3-notification'

interface Window {
  ethereum: any;
}



createApp(App)
  .use(Notifications)
  .mount('#app');

