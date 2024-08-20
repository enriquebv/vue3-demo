import { createRouter, createWebHistory } from 'vue-router'
import VacancyBoardView from '@/ui/views/VacancyBoardView.vue'

// Demo: We centralize route names to avoid typos and make it easier to modify them
export const ROUTE_NAMES = {
  VACANCY_BOARD: 'vacancy-board'
} as const

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      // Demo: For demo purposes, we redirect to a specific vacancy
      redirect: { name: ROUTE_NAMES.VACANCY_BOARD, params: { id: import.meta.env.VITE_VACANCY_ID } }
    },
    {
      path: '/vacancy/:id',
      meta: { title: 'Reclutamiento' },
      name: ROUTE_NAMES.VACANCY_BOARD,
      component: VacancyBoardView
    }
    // TODO: Add 404 page
  ]
})

// Add a title to the page when the route changes
router.afterEach((to) => {
  document.title = to.meta.title as string
})

export default router
