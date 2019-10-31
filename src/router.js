import Vue from 'vue'
import Router from 'vue-router'
import AuthGuard from '@/auth-guard.js'
import Home from '@/components/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/components/auth/Login.vue')
    },
    {
      path: '/registration',
      name: 'reg',
      component: () => import('@/components/auth/Registration.vue')
    },
    {
      path: '/ad/:id',
      props: true,
      name: 'ad',
      component: () => import('@/components/advertising/Ad.vue')
    },
    {
      path: '/list',
      name: 'list',
      component: () => import('@/components/advertising/AdList.vue'),
      beforeEnter: AuthGuard
    },
    {
      path: '/news',
      name: 'newAd',
      component: () => import('@/components/advertising/NewAd.vue'),
      beforeEnter: AuthGuard
    },
    {
      path: '/orders',
      name: 'orders',
      component: () => import('@/components/user/Orders.vue'),
      beforeEnter: AuthGuard
    }
  ]
})
