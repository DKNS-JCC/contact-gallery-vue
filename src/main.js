import { createApp } from "vue";
import PrimeVue from "primevue/config";
import ConfirmationService from 'primevue/confirmationservice';
import ToastService from 'primevue/toastservice';
import 'primeicons/primeicons.css';
import Aura from '@primeuix/themes/aura';
import "primeflex/primeflex.css";
import "./style.css";
import App from './App.vue'
import router from './router';
import { createPinia } from 'pinia'

const app = createApp(App);
app.use(router)
app.use(createPinia())
app.use(PrimeVue, {
    theme: {
        preset: Aura
    }
});
app.use(ConfirmationService);
app.use(ToastService);
app.mount('#app')

