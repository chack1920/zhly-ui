import Vue from 'vue';import Router, { RouteConfig } from 'vue-router';;Vue.use(Router);export const routes: RouteConfig[] = [
            {
              component: () => import('../../pages/home/Index.vue'),
              name:'home',
              path:'/home',},
            {
              component: () => import('../../pages/login/Index.vue'),
              name:'login',
              path:'/login',},
      {
        path:'/',
        redirect:'/login'
      },
    ];const router = new Router({mode: 'hash',routes,});export default router;