import { createRouter, createWebHistory } from 'vue-router';
import Index from '@/pages/index.vue';
import Login from '@/pages/login.vue';
import { useAuthStore } from '@/store/auth'

const routes = [
  {
    name: 'Index',
    path: '/',
    component: Index
  },
  {
    name: 'Login',
    path: '/login',
    component: Login
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach(async(to, from, next) => {
  const { isLoggedIn, initialize } = useAuthStore();

  await initialize();

  if (to.name === 'Login') {
    if (isLoggedIn()) {
      // 既にログインしているのにログインページに行こうとしていたらTOPページに移動させる
      next({
        name: 'Index',
      });
      return;
    }
  } else if (!isLoggedIn()) {
    // ログインページに遷移
    next({
      name: 'Login',
      query: {
        path: to.fullPath
      }
    });
  }

  // 通常遷移
  next();
})

export default router;
