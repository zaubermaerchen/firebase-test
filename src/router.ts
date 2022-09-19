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

const isLoggedInApp = async() => {
  const { isLoggedIn, initAuth } = useAuthStore();

  if (isLoggedIn()) {
    return true;
  }

  await initAuth()

  return isLoggedIn()
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach(async(to, from, next) => {
  const isLoggedIn = await isLoggedInApp()
  if (to.name === 'Login') {
    if (isLoggedIn) {
      // 既にログインしているのにログインページに行こうとしていたらTOPページに移動させる
      next({
        name: 'Index',
      })
    } else {
      next();
    }
    return;
  }

  if (isLoggedIn) {
    // ログイン済みなのでそのまま遷移
    next();
    return;
  }

  // ログインページに遷移
  next({
    name: 'Login',
    query: {
      path: to.fullPath
    }
  })
})

export default router;
