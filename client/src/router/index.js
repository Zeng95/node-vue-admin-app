import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style

Vue.use(VueRouter)

// Layout
const Layout = () => import('@/layout')

// Views
const Dashboard = () => import('@/views/dashboard')

// Views - Auth
const Login = () => import('@/views/auth/Login')
const Register = () => import('@/views/auth/Register')

// Views - Components
// const Breadcrumb = () => import('@/views/ui-elements/base/Breadcrumb')
// const Card = () => import('@/views/ui-elements/base/Card')

const NotFound = () => import('@/views/error-page/404')

const whiteList = ['/login', '/register'] // no redirect whitelist

NProgress.configure({ showSpinner: false }) // NProgress Configuration

/**
 * 需要用户权限的路由表
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  {
    path: '/pages/permission',
    component: Layout,
    redirect: { name: 'PagePermission' },
    alwaysShow: true, // will always show the root menu
    name: 'Permission',
    meta: {
      title: 'Permission',
      icon: 'lock',
      roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [
      {
        path: 'page',
        component: () => import('@/views/pages/permission/Page'),
        name: 'PagePermission',
        meta: {
          title: 'Page Permission',
          roles: 'admin'
        }
      },
      {
        path: 'directive',
        component: () => import('@/views/pages/permission/Directive'),
        name: 'DirectivePermission',
        meta: {
          title: 'Directive Permission'
        }
      },
      {
        path: 'role',
        component: () => import('@/views/pages/permission/Role'),
        name: 'RolePermission',
        meta: {
          title: 'Role Permission',
          roles: 'admin'
        }
      }
    ]
  }
]

/**
 * 不需要用户权限的通用路由表
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  // Has layout
  {
    path: '/',
    redirect: '/dashboard',
    name: 'Home',
    component: Layout,
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: Dashboard
      },
      {
        path: 'pages',
        children: [
          {
            path: 'profile',
            name: 'Profile',
            component: () => import('@/views/pages/Profile')
          }
        ]
      }
    ]
  },
  // No layout
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
  routes: constantRoutes
})

router.beforeEach(async (to, from, next) => {
  const loggedIn = store.getters['auth/loggedIn']
  const hasRole = store.getters['user/role']

  // shows the progress bar
  NProgress.start()

  if (loggedIn) {
    // 已经登录意味着有 Token

    if (to.matched.some((record) => record.meta.requiresGuest)) {
      // 访问登录或者注册页面重定向到首页
      next({
        name: 'Home'
      })
    } else {
      if (hasRole) {
        //当有用户权限时，说明所有可访问路由已生成 如访问没权限的页面会自动进入 404 页面
        next()
      } else {
        try {
          const role = await store.dispatch('user/fetchUser')
          const accessibleRoutes = await store.dispatch(
            'permission/generateRoutes',
            role
          )

          // 使用 addRoutes 将 routes 挂载到 router 中
          router.addRoutes(accessibleRoutes)

          next()
        } catch (err) {
          console.log(err)
        }
      }
    }
  } else {
    // 没有登录意味着没有 Token

    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next({
        name: 'Login',
        query: { redirect: to.path }
      })
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})

export default router
