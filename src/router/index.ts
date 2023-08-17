import { createRouter, createWebHashHistory } from 'vue-router';
import Token from '../functions/token.ts';


const routes = [
  {
    //error 404
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../views/page_error.vue'),
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
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/page_login.vue'),
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('../views/page_admin.vue'),
    meta: { requireAuth: true }
  },
  
];


const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
    console.log(`to=${to.fullPath} from=${from.fullPath}, to.meta.requireAuth=${to.meta.requireAuth}`);
    if(to.meta.requireAuth){
      try{
        const token :string|null= Token.loadToken();
        const result = Boolean(await Token.varifyToken(token));
        //console.log(`result=${result}`);
        if(result)next();
        else {
          next(from.fullPath);
          alert("您的權限不足");
        }
      }catch(err){
        next(from.fullPath);
      }
    }else next();
});

export default router;