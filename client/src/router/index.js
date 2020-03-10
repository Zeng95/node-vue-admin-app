import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/layout/Index'
import Login from '@/views/auth/Login'
import Register from '@/views/auth/Register'
import Dashboard from '@/views/Dashboard'
import NotFound from '@/views/404'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Layout,
    redirect: { name: 'Dashboard' },
    children: [
      {
        path: '/dashboard',
        name: 'Dashboard',
        component: Dashboard
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
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

export default router
