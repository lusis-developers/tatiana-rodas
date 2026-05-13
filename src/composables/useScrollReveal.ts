import { onBeforeUnmount, onMounted, type Ref } from 'vue'

interface Options {
  once?: boolean
  threshold?: number
  rootMargin?: string
}

/**
 * Adds class `is-revealed` to a target el (or to its [data-reveal] descendants)
 * when scrolled into view. Respects prefers-reduced-motion.
 */
export const useScrollReveal = (
  target: Ref<HTMLElement | null>,
  { once = true, threshold = 0.15, rootMargin = '0px 0px -10% 0px' }: Options = {},
) => {
  let observer: IntersectionObserver | null = null

  onMounted(() => {
    if (typeof window === 'undefined') return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const root = target.value
    if (!root) return

    const elements: HTMLElement[] = root.hasAttribute('data-reveal')
      ? [root]
      : Array.from(root.querySelectorAll<HTMLElement>('[data-reveal]'))

    if (prefersReduced) {
      elements.forEach((el) => el.classList.add('is-revealed'))
      return
    }

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed')
            if (once && observer) observer.unobserve(entry.target)
          } else if (!once) {
            entry.target.classList.remove('is-revealed')
          }
        })
      },
      { threshold, rootMargin },
    )

    elements.forEach((el) => observer!.observe(el))
  })

  onBeforeUnmount(() => {
    observer?.disconnect()
    observer = null
  })
}
