import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    meta: {layout: 'main'},
    component: () => import('../views/HomePage.vue')
  },
  {
    path: '/statistic-client',
    name: 'statistic',
    meta: {layout: 'main'},
    component: () => import('../views/StatisticPage.vue')
  },
  {
    path: '/informed-consent',
    name: 'infoConsent',
    meta: {layout: 'main'},
    component: () => import('../views/InformedPage.vue')
  },
  {
    path: '/all-session',
    name: 'allSessionClient',
    meta: {layout: 'main'},
    component: () => import('../views/AllSessionPage.vue')
  },
  {
    path: '/one-session/:sessionId',
    name: 'oneSessionClient',
    meta: {layout: 'main'},
    component: () => import('../views/OneSessionPage.vue'),
    props: true // Enable props to be passed as route parameters
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
