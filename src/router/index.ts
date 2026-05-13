import { createRouter, createWebHistory } from 'vue-router'
import { routes } from './routes'

export const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, _from, saved) {
    if (to.hash) {
      return { el: to.hash, top: 80 }
    }
    if (saved) return saved
    return { top: 0 }
  },
})

// Title fallback in case Unhead hasn't run for first paint.
router.beforeEach((to) => {
  if (typeof document !== 'undefined' && to.meta.title) {
    document.title = to.meta.title
  }
})
