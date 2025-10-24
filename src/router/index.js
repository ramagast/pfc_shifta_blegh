import { createRouter, createWebHistory } from 'vue-router'
import Splash from '../views/Splash.vue'
import Home from '../views/Home.vue'
import Artists from '../views/Artists.vue'
import NewComment from '../views/NewComment.vue'
import Locations from '../views/Locations.vue'
import Profile from '../views/Profile.vue'

const routes = [
  { path: '/', name: 'Splash', component: Splash },
  { path: '/home', name: 'home', component: Home },
  { path: '/artists', name: 'artists', component: Artists },
  { path: '/new-comment', name: 'new-comment', component: NewComment },
  { path: '/locations', name: 'locations', component: Locations },
  { path: '/profile', name: 'profile', component: Profile }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() { return { top: 0 } },
})

export default router
