import { createApp } from "vue";
import App from "./App.vue";
import Vue3DraggableResizable from "vue3-draggable-resizable";
import router from "./router";
import "./css/tailwind.css";
import * as Icons from "@ant-design/icons-vue";
import "vue3-draggable-resizable/dist/Vue3DraggableResizable.css";
import VueCarousel from "@chenfengyuan/vue-carousel";
import store from "./store";
import VueDragSelect from "@coleqiu/vue-drag-select";
import VueLazyload from "vue-lazyload";

const app = createApp(App);

const icons: any = Icons;

for (const i in icons) {
  app.component(i, icons[i]);
}

app.component(VueCarousel.name, VueCarousel);
app.use(store);
app.use(router);
app.use(VueDragSelect);
app.use(Vue3DraggableResizable);
app.use(VueLazyload);
app.mount("#app");
