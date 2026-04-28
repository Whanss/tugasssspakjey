// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
      meta: { title: 'Beranda — SiPerpus' },
    },
    {
      path: '/katalog',
      name: 'katalog',
      component: () => import('../views/KatalogView.vue'),
      meta: { title: 'Katalog — SiPerpus' },
    },
    {
      path: '/katalog/:id',
      name: 'detail-buku',
      component: () => import('../views/DetailBukuView.vue'),
      meta: { title: 'Detail Buku — SiPerpus' },
    },
    {
      path: '/aboutview',
      name: 'aboutview',
      component: () => import('../views/AboutView.vue'),
      meta: { title: 'Tentang Kami — SiPerpus' },
    },
  ],
})

export default router
