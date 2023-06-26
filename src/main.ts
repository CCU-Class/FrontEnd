import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './css/tailwind.css';
import { Rowspanizer } from './functions/rowspanizer.ts';

createApp(App).use(router).mount('#app');

const rowspanizer = new Rowspanizer({
    target: '#class_table',
    colspan_index: 0
});

// wait for the DOM to be loaded
document.addEventListener('DOMContentLoaded', () => {
    rowspanizer.rowspanize();
});