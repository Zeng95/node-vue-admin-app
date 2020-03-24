import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/layout/Index'
import Login from '@/views/auth/Login'
import Register from '@/views/auth/Register'
import Dashboard from '@/views/Dashboard'
import Profile from '@/views/profile/Profile'
import NotFound from '@/views/404'
import store from '@/store'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style

Vue.use(VueRouter)

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Layout,
    redirect: { name: 'Dashboard' },
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: Dashboard
      },
      {
        path: 'settings/profile',
        name: 'Profile',
        component: Profile
      }
    ],
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { requiresGuest: true }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: { requiresGuest: true }
  },
  {
    path: '/404',
    alias: '*',
    component: NotFound
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const loggedIn = store.getters['auth/loggedIn']

  // shows the progress bar
  NProgress.start()

  if (to.matched.some(record => record.meta.requiresAuth)) {
    !loggedIn ? next({ name: 'Login' }) : next()
  } else if (to.matched.some(record => record.meta.requiresGuest)) {
    loggedIn ? next({ name: 'Home' }) : next()
  } else {
    next()
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})

export default router
