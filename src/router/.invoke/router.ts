import Vue from 'vue';import Router, { RouteConfig } from 'vue-router';;Vue.use(Router);export const routes: RouteConfig[] = [
            {
              component: () => import('../../pages/home/home.vue'),
              name:'home',
              path:'/home',children:[
            {
              component: () => import('../../pages/home/companyPage/Index.vue'),
              name:'home-companyPage',
              path:'companyPage',},
            {
              component: () => import('../../pages/home/homePage/Index.vue'),
              name:'home-homePage',
              path:'homePage',},],},
            {
              component: () => import('../../pages/login/Index.vue'),
              name:'login',
              path:'/login',},
      {
        path:'/',
        redirect:'/login'
      },
    
      {
        path:'/home',
        redirect:'/home/homePage'
      },
    ];const router = new Router({mode: 'hash',routes,});export default router;