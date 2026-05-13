import { onBeforeUnmount, onMounted, type Ref } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

let registered = false
const ensureRegistered = () => {
  if (registered || typeof window === 'undefined') return
  gsap.registerPlugin(ScrollTrigger)
  // Refresh once everything has loaded so positions are correct
  // after fonts, images and lazy content settle.
  if (document.readyState === 'complete') {
    requestAnimationFrame(() => ScrollTrigger.refresh())
  } else {
    window.addEventListener('load', () => ScrollTrigger.refresh(), { once: true })
  }
  registered = true
}

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

export { gsap, ScrollTrigger }

// =============================================================================
// Reveal variants
// =============================================================================

export type RevealVariant =
  | 'fade-up'
  | 'fade-in'
  | 'fade-down'
  | 'slide-left'
  | 'slide-right'
  | 'scale-in'
  | 'zoom-bg'
  | 'stagger-up'

interface RevealOptions {
  variant?: RevealVariant
  delay?: number
  duration?: number
  stagger?: number
  start?: string
  end?: string
  scrub?: boolean | number
  once?: boolean
  childSelector?: string
}

/**
 * Reveal target (or its children when stagger) on scroll into view.
 * Wraps gsap.from/to with ScrollTrigger and respects prefers-reduced-motion.
 *
 * Failure mode is safe: if GSAP fails or never fires, the element keeps its
 * natural opacity 1 (no CSS preset). GSAP's `from` only takes over briefly
 * to animate IN — initial inline state is reverted to start, then tweened.
 */
export const useGsapReveal = (
  target: Ref<HTMLElement | null>,
  options: RevealOptions = {},
) => {
  const {
    variant = 'fade-up',
    delay = 0,
    duration = 0.9,
    stagger = 0.12,
    start = 'top 85%',
    end,
    scrub = false,
    once = true,
    childSelector = '[data-stagger]',
  } = options

  let st: ScrollTrigger | null = null
  let tween: gsap.core.Tween | gsap.core.Timeline | null = null

  onMounted(() => {
    ensureRegistered()
    const el = target.value
    if (!el) return
    if (prefersReducedMotion()) return

    const baseConfig: gsap.TweenVars = {
      duration,
      delay,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start,
        end,
        scrub,
        once,
        invalidateOnRefresh: true,
      },
    }

    switch (variant) {
      case 'fade-up':
        tween = gsap.from(el, { ...baseConfig, opacity: 0, y: 40 })
        break
      case 'fade-down':
        tween = gsap.from(el, { ...baseConfig, opacity: 0, y: -40 })
        break
      case 'fade-in':
        tween = gsap.from(el, { ...baseConfig, opacity: 0 })
        break
      case 'slide-left':
        tween = gsap.from(el, { ...baseConfig, opacity: 0, x: -60 })
        break
      case 'slide-right':
        tween = gsap.from(el, { ...baseConfig, opacity: 0, x: 60 })
        break
      case 'scale-in':
        tween = gsap.from(el, { ...baseConfig, opacity: 0, scale: 0.92, transformOrigin: 'center center' })
        break
      case 'zoom-bg':
        tween = gsap.fromTo(
          el,
          { scale: 1.12 },
          {
            scale: 1,
            duration: 1.4,
            ease: 'power2.out',
            scrollTrigger: { trigger: el, start, end, scrub, once },
          },
        )
        break
      case 'stagger-up': {
        const children = el.querySelectorAll<HTMLElement>(childSelector)
        const targets = children.length ? children : Array.from(el.children) as HTMLElement[]
        tween = gsap.from(targets, {
          opacity: 0,
          y: 32,
          duration,
          ease: 'power3.out',
          stagger,
          scrollTrigger: { trigger: el, start, end, scrub, once, invalidateOnRefresh: true },
        })
        break
      }
    }

    if (tween && 'scrollTrigger' in tween) {
      st = (tween as gsap.core.Tween).scrollTrigger ?? null
    }
  })

  onBeforeUnmount(() => {
    st?.kill()
    tween?.kill()
  })
}

// =============================================================================
// Parallax helper
// =============================================================================

export const useParallax = (
  target: Ref<HTMLElement | null>,
  { distance = 80, scrub = 0.6 }: { distance?: number; scrub?: number | boolean } = {},
) => {
  let st: ScrollTrigger | null = null
  let tween: gsap.core.Tween | null = null

  onMounted(() => {
    ensureRegistered()
    const el = target.value
    if (!el) return
    if (prefersReducedMotion()) return

    tween = gsap.fromTo(
      el,
      { yPercent: -distance / 10 },
      {
        yPercent: distance / 10,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top bottom',
          end: 'bottom top',
          scrub,
        },
      },
    )
    st = tween.scrollTrigger ?? null
  })

  onBeforeUnmount(() => {
    st?.kill()
    tween?.kill()
  })
}

// =============================================================================
// Number counter
// =============================================================================

export const useCounter = (
  target: Ref<HTMLElement | null>,
  to: number,
  { duration = 1.6, suffix = '', prefix = '' }: { duration?: number; suffix?: string; prefix?: string } = {},
) => {
  let st: ScrollTrigger | null = null

  onMounted(() => {
    ensureRegistered()
    const el = target.value
    if (!el) return
    if (prefersReducedMotion()) {
      el.textContent = `${prefix}${to}${suffix}`
      return
    }

    const obj = { val: 0 }
    const tween = gsap.to(obj, {
      val: to,
      duration,
      ease: 'power2.out',
      onUpdate: () => {
        el.textContent = `${prefix}${Math.round(obj.val)}${suffix}`
      },
      scrollTrigger: {
        trigger: el,
        start: 'top 90%',
        once: true,
      },
    })
    st = tween.scrollTrigger ?? null
  })

  onBeforeUnmount(() => { st?.kill() })
}
