import { createApp } from 'vue';
import App from './App.vue';
import Vue3DraggableResizable from 'vue3-draggable-resizable';
import router from './router';
import './css/tailwind.css';
import * as Icons from '@ant-design/icons-vue';
import 'vue3-draggable-resizable/dist/Vue3DraggableResizable.css';
import store from './store';

const app = createApp(App);

const icons: any = Icons;

for (const i in icons) {
    app.component(i, icons[i]);
}

app.use(store);
app.use(router);
app.use(Vue3DraggableResizable);
app.mount('#app');



