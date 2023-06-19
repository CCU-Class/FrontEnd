import { createApp } from 'vue'
import VueHtml2Canvas from 'vue-html2canvas';
import App from './App.vue'
import router from './router';
import './css/tailwind.css'

createApp(App).use(router, VueHtml2Canvas).mount('#app')
