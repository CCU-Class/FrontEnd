import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './css/tailwind.css';
import * as Icons from '@ant-design/icons-vue';

const app = createApp(App);

const icons: any = Icons;

for (const i in icons) {
  app.component(i, icons[i]);
}

app.use(icons)
app.use(router);
app.mount('#app');

