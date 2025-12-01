import { createApp } from "vue";
import PrimeVue from "primevue/config";
import Aura from '@primeuix/themes/aura';
import "primeflex/primeflex.css";
import "./style.css";
import App from './App.vue'
import router from './router';
import { createPinia } from 'pinia'

const app = createApp(App);
app.use(router)
app.use(createPinia())
app.mount('#app')

    
app.use(PrimeVue, {
    theme: {
        preset: Aura
    }
});

