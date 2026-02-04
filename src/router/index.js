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
  {
    path: '/feedback-last-session',
    name: 'FeedBackLastSession',
    meta: {layout: 'main'},
    component: () => import('../views/FeedbackLastSessionPage.vue')
  },
  {
    path: '/expert-assessment',
    name: 'ExpertAssessmet',
    meta: {layout: 'main'},
    component: () => import('../views/ExpertAssessmentPage.vue')
  },
  {
    path: '/cycle-couple',
    name: 'CycleCouple',
    meta: {layout: 'main'},
    component: () => import('../views/CycleCouplePage.vue')
  },

  // --- Supervisor (individual_supervision) routes ---
  {
    path: '/supervisor',
    name: 'SupervisorDashboard',
    meta: { layout: 'main', role: 'supervisor' },
    component: () => import('../views/supervisor/SupervisorDashboardPage.vue')
  },
  {
    path: '/supervisor/sessions',
    name: 'SupervisorSessions',
    meta: { layout: 'main', role: 'supervisor' },
    component: () => import('../views/supervisor/SupervisorSessionsPage.vue')
  },
  {
    path: '/supervisor/materials',
    name: 'SupervisorMaterials',
    meta: { layout: 'main', role: 'supervisor' },
    component: () => import('../views/supervisor/SupervisorMaterialsPage.vue')
  },
  {
    path: '/supervisor/case-description',
    name: 'SupervisorCaseDescription',
    meta: { layout: 'main', role: 'supervisor' },
    component: () => import('../views/supervisor/SupervisorCaseDescriptionPage.vue')
  },
  {
    path: '/supervisor/feedback',
    name: 'SupervisorFeedback',
    meta: { layout: 'main', role: 'supervisor' },
    component: () => import('../views/supervisor/SupervisorFeedbackPage.vue')
  },
    {
        path: '/supervisor/feedback/details',
        name: 'SupervisorFeedbackDetails',
        meta: { layout: 'main', role: 'supervisor' },
        component: () => import('../views/supervisor/SupervisorFeedbackDetailsPage.vue')
    },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

function getRole() {
  const originType = localStorage.getItem('origin_type');

  if (originType === 'individual_supervision') return 'supervisor';

  // if (["couple", "couple_xxx"].includes(originType)) return 'couple';

  return 'individual';
}

router.beforeEach((to, from, next) => {
  const role = getRole();

  // Role-based home redirect
  if (to.path === '/' && role === 'supervisor') {
    return next({ name: 'SupervisorDashboard' });
  }

  const requiredRole = to.meta?.role;

  // If route doesn't require a role — allow
  if (!requiredRole) return next();

  // If role doesn't match — redirect to home
  if (role !== requiredRole) return next({ name: 'home' });

  return next();
});

export default router
