import Vue from 'vue';
import Router from 'vue-router';
;
Vue.use(Router);
export var routes = [
    {
        component: function () { return import('../../pages/home/home.vue'); },
        name: 'home',
        path: '/home', children: [
            {
                component: function () { return import('../../pages/home/design/index.vue'); },
                name: 'home-design',
                path: 'design',
            },
        ],
    },
    {
        path: '/',
        redirect: '/home/design'
    },
];
var router = new Router({ mode: 'hash', routes: routes, });
export default router;
//# sourceMappingURL=router.js.map