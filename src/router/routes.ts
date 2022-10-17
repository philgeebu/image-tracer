import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
    {
        path: '',
        component: () => import('layouts/MainLayout.vue'),
        children: [
            { path: '', component: () => import('pages/SearchPage.vue') },
            {
                path: '/:id',
                component: () => import('pages/TracingPage.vue'),
            },
        ],
    },
];

export default routes;
