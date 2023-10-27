/*
 * @Date: 2023-10-25 15:19:42
 */
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/demo/HomeView.vue'
import HomeMap from '@/views/home/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/home',
      name: 'homeOne',
      component: HomeMap
    }
  ]
})

export default router
