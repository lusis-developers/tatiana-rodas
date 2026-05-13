import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useUiStore = defineStore('ui', () => {
  const isMobileMenuOpen = ref(false)
  const activeSectionId = ref<string | null>(null)

  const openMobileMenu = () => { isMobileMenuOpen.value = true }
  const closeMobileMenu = () => { isMobileMenuOpen.value = false }
  const toggleMobileMenu = () => { isMobileMenuOpen.value = !isMobileMenuOpen.value }

  // Lock body scroll when drawer open.
  watch(isMobileMenuOpen, (open) => {
    if (typeof document === 'undefined') return
    document.body.style.overflow = open ? 'hidden' : ''
  })

  const setActiveSection = (id: string | null) => { activeSectionId.value = id }

  return {
    isMobileMenuOpen,
    activeSectionId,
    openMobileMenu,
    closeMobileMenu,
    toggleMobileMenu,
    setActiveSection,
  }
})
