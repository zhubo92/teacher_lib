import { createRouter, createWebHashHistory } from 'vue-router';

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'index',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('@/views/home/HomeView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login/LoginView.vue')
    },
    {
      path: '/login/ForgetPassword',
      name: 'ForgetPassword',
      component: () => import('@/views/login/ForgetPassword.vue')
    },
    {
      path: '/my',
      name: 'my',
      component: () => import('@/views/my/MyView.vue')
    },
    {
      path: '/course',
      name: 'course',
      component: () => import('@/views/course/CourseView.vue')
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('@/views/search/SearchView.vue')
    },
    {
      path: '/demo',
      name: 'demo',
      component: () => import('@/views/demo/DemoView.vue')
    },
    {
      path: '/section',
      name: 'section',
      component: () => import('@/views/section/SectionView.vue')
    },
    {
      path: '/slides',
      name: 'slides',
      component: () => import('@/views/slides/SlidesView.vue')
    }
  ]
});

export default router;
