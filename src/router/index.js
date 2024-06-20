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
    path: '/faq',
    name: 'faq',
    meta: {layout: 'main'},
    component: () => import('../views/FAQPage.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
