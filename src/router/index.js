import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', name: 'Splash', component: () => import('../views/Splash.vue') },
  { path: '/home', name: 'home', component: () => import('../views/Home.vue') },
  { path: '/artists', name: 'artists', component: () => import('../views/Artists.vue') },
  { path: '/new-comment', name: 'new-comment', component: () => import('../views/NewComment.vue') },
  { path: '/locations', name: 'locations', component: () => import('../views/Locations.vue') },
  { path: '/profile', name: 'profile', component: () => import('../views/Profile.vue') },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() { return { top: 0 } },
})

export default router
