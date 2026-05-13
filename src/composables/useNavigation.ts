import { watch } from 'vue'
import { useRoute } from 'vue-router'
import { useUiStore } from '@/stores/ui.store'
import { primaryNav, footerNav, applyCta } from '@/data/navigation'

export const useNavigation = () => {
  const route = useRoute()
  const ui = useUiStore()

  // Close mobile drawer on every route change.
  watch(
    () => route.fullPath,
    () => ui.closeMobileMenu(),
  )

  return {
    primaryNav,
    footerNav,
    applyCta,
  }
}
