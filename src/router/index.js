import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue')
    },
    {
      path: '/auth-otp',
      name: 'auth-otp',
      component: () => import('../views/AuthOtpView.vue')
    },
    {
      path: '/member-list',
      name: 'member-list',
      component: () => import('../views/MemberListView.vue')
    }
  ]
})

router.beforeEach((to, _, next) => {
  //navguard
  const isLogin = !!localStorage.getItem('access_token')

  if (isLogin && to.path === '/login') {
    next('/')
  } else if (!isLogin && to.path !== '/login' && to.path !== '/Register') {
    next('/login')
  } else {
    next()
  }
})

export default router
