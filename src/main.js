import { createApp } from 'vue'
import App from './App.vue'
import router from './router' 
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import './style.css'
import { createI18n } from 'vue-i18n'
import en from './locales/en'
import es from './locales/es'
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

const i18n = createI18n({
  locale: 'es', // idioma por defecto
  fallbackLocale: 'en', // si no encuentra la traducción
  messages: { en, es },
})

const options = {
  position: "top-right",
  timeout: 3000,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  showCloseButtonOnHover: false,
};

const app = createApp(App)
app.use(i18n)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(router)
app.use(pinia)
app.use(Toast, options);
app.mount('#app')