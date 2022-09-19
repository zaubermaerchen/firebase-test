import { createRouter, createWebHistory } from 'vue-router';
import Index from '@/pages/index.vue';

const routes = [
  {
    name: 'Index',
    path: '/',
    component: Index
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
