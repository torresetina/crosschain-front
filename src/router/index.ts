import { getCookie } from '@/components/utils/cookies'
import { getCurrentInstance, type ComponentInternalInstance } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import("@/components/Login.vue")
    },
    {
      path: '/tab',
      name: 'tab',
      component: () => import("@/components/TabView.vue")
    },

  ]
})

const isAuthenticated = (): boolean => {
  return !(getCookie('token') === undefined)
}

router.beforeEach((to, from, next) => {
  if(!isAuthenticated() && to.name !== 'login') {
    next("/")
  } else {
    next()
  }
})

export default router
