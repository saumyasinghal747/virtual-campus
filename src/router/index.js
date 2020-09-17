import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import { auth, provider } from '../firebase/firebase'
import Greeter from "../views/Greeter";
import NoLogin from "../components/NoLogin";
import msgBar from "../components/msgBar";
import Info from "../components/Info";
Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Greeter',
    component: Greeter,

  },
    {
      path: '/tmp',
      name:'Tester',
      component: Info
    },

    {
      path: '/app',
      name: 'Home',
      component: Home,

    },
    {
      path: '/settings',
      name: 'Settings',
      meta: {
        requiresAuth: true
      },
      // route level code-splitting
      // this generates a separate chunk (settings.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: function () {
        return import(/* webpackChunkName: "settings" */ '../views/Settings.vue')
      }
    },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: function () {
      return import(/* webpackChunkName: "about" */ '../views/About.vue')
    }
  },
    {
      path: '/login',
      name: 'Login',
      // route level code-splitting
      // this generates a separate chunk (login.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: function () {
        return import(/* webpackChunkName: "login" */ '../views/Login.vue')
      }
    }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth)

  if (requiresAuth && !auth.currentUser) {
    next('/login')
  } else {
    next()
  }
})

export default router
