import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import { auth, provider } from '../firebase/firebase'
import Greeter from "../views/Greeter";
import EliminationLogin from "../views/EliminationLogin";
import EliminationHub from "../views/EliminationHub";
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
      component: EliminationLogin
    },
    {
      path: '/elimination/login',
      name:'Elimination Login',
      component: EliminationLogin
    },
    {
      path: '/elimination',
      name:'Elimination',
      component: EliminationHub,
      meta: {
        requiresEliminationAuth:true
      }
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
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth);
  const requiresEliminationAuth = to.matched.some(x => x.meta.requiresEliminationAuth);
  const eliminationSession = localStorage.getItem('elimination_session');
  if (requiresAuth && !auth.currentUser) {
    next('/login')
  }
  else if (requiresEliminationAuth && !eliminationSession){
    next('/elimination/login')
  }
  else if (to.fullPath === "/elimination/login" && eliminationSession){
    next('/elimination')
  }
  else {
    next()
  }


})

export default router
