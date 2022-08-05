import { createApp } from 'vue'
import App from './App.vue'
import {createPinia} from "pinia"
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

import './assets/scss/root.scss'
const pinia = createPinia()
const options = {
   //
};
const app = createApp(App)
app.use(pinia)
app.use(Toast, options)
app.mount('#app')