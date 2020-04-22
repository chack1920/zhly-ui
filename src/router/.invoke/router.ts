import Vue from 'vue';import Router, { RouteConfig } from 'vue-router';;Vue.use(Router);export const routes: RouteConfig[] = [
            {
              component: () => import('../../pages/bloc/bloc.vue'),
              name:'bloc',
              path:'/bloc',children:[
            {
              component: () => import('../../pages/bloc/blocPage/Index.vue'),
              name:'bloc-blocPage',
              path:'blocPage',},
            {
              component: () => import('../../pages/bloc/blocVideo/Index.vue'),
              name:'bloc-blocVideo',
              path:'blocVideo',},],},
            {
              component: () => import('../../pages/home/home.vue'),
              name:'home',
              path:'/home',children:[
            {
              component: () => import('../../pages/home/attendanceRecord/Index.vue'),
              name:'home-attendanceRecord',
              path:'attendanceRecord',},
            {
              component: () => import('../../pages/home/blackListPage/Index.vue'),
              name:'home-blackListPage',
              path:'blackListPage',},
            {
              component: () => import('../../pages/home/companyPage/Index.vue'),
              name:'home-companyPage',
              path:'companyPage',},
            {
              component: () => import('../../pages/home/homePage/Index.vue'),
              name:'home-homePage',
              path:'homePage',},
            {
              component: () => import('../../pages/home/personnelPage/Index.vue'),
              name:'home-personnelPage',
              path:'personnelPage',},],},
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