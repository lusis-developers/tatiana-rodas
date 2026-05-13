import { onBeforeUnmount, onMounted, readonly, ref } from 'vue'

interface Breakpoints {
  sm: number
  md: number
  lg: number
  xl: number
  '2xl': number
}

const defaults: Breakpoints = {
  sm: 480,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
}

export const useBreakpoint = (bps: Partial<Breakpoints> = {}) => {
  const map = { ...defaults, ...bps }
  const isSm = ref(false)
  const isMd = ref(false)
  const isLg = ref(false)
  const isXl = ref(false)
  const is2xl = ref(false)

  const queries: Array<[string, ReturnType<typeof ref<boolean>>]> = []

  const build = (min: number) => `(min-width: ${min}px)`

  onMounted(() => {
    const targets: Array<[string, ReturnType<typeof ref<boolean>>]> = [
      [build(map.sm), isSm],
      [build(map.md), isMd],
      [build(map.lg), isLg],
      [build(map.xl), isXl],
      [build(map['2xl']), is2xl],
    ]
    targets.forEach(([q, r]) => {
      const mql = window.matchMedia(q)
      r.value = mql.matches
      const listener = (e: MediaQueryListEvent) => { r.value = e.matches }
      mql.addEventListener('change', listener)
      queries.push([q, r])
      ;(r as any).__listener = listener
      ;(r as any).__mql = mql
    })
  })

  onBeforeUnmount(() => {
    ;[isSm, isMd, isLg, isXl, is2xl].forEach((r) => {
      const mql = (r as any).__mql as MediaQueryList | undefined
      const listener = (r as any).__listener as ((e: MediaQueryListEvent) => void) | undefined
      if (mql && listener) mql.removeEventListener('change', listener)
    })
  })

  return {
    isSm: readonly(isSm),
    isMd: readonly(isMd),
    isLg: readonly(isLg),
    isXl: readonly(isXl),
    is2xl: readonly(is2xl),
  }
}
