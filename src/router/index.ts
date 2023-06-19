import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/page_home.vue'),
  },
  {
    path: '/main',
    name: 'Main',
    component: () => import('../views/page_main.vue'),
  }
];

export default createRouter({
    history: createWebHashHistory(),
    routes,
});