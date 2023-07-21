import { createRouter, createWebHashHistory } from 'vue-router';
import { RouteRecordRaw } from 'vue-router'

const routes : RouteRecordRaw[] = [
  {
    path: "/:pathMatch(.*)*",
    name: 'Error404',
    component: () => import('../views/page_404.vue'),
  },
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/page_home.vue'),
  },
  {
    path: '/main',
    name: 'Main',
    component: () => import('../views/page_main.vue'),
  },
  
  
];


export default createRouter({
    history: createWebHashHistory(),
    routes,
});