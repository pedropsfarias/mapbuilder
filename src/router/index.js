import { createRouter, createWebHistory } from 'vue-router'
import MainLayoutComponent from '@/components/layout/MainLayoutComponent.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('@/components/layout/NotFoundComponent.vue')
    },
    {
      path: '/',
      name: 'map',
      component: MainLayoutComponent
    },
    {
      path: '/config/:group/:name',
      name: 'config',
      component: () => import('@/components/layout/ConfigurationLayoutComponent.vue')
    }
  ]
})

export default router
