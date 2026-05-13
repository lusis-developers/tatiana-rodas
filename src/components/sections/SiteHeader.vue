<script setup lang="ts">
import { computed, onMounted, onBeforeUnmount, ref } from 'vue'
import { Menu, X } from 'lucide-vue-next'
import { useUiStore } from '@/stores/ui.store'
import { useNavigation } from '@/composables/useNavigation'
import AppContainer from '@/components/ui/AppContainer.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import AppIcon from '@/components/ui/AppIcon.vue'

const ui = useUiStore()
const { primaryNav, applyCta } = useNavigation()
const sentinel = ref<HTMLElement | null>(null)
const isSticky = ref(false)

let observer: IntersectionObserver | null = null

onMounted(() => {
  if (!sentinel.value || typeof IntersectionObserver === 'undefined') return
  observer = new IntersectionObserver(
    ([entry]) => { isSticky.value = !entry.isIntersecting },
    { threshold: 0 },
  )
  observer.observe(sentinel.value)
})
onBeforeUnmount(() => observer?.disconnect())

const headerClass = computed(() => ({
  'site-header--solid': isSticky.value,
  'site-header--open': ui.isMobileMenuOpen,
}))
</script>

<template>
  <div ref="sentinel" class="site-header__sentinel" aria-hidden="true" />
  <header class="site-header" :class="headerClass" role="banner">
    <a href="#main" class="u-skip-link">Saltar al contenido</a>
    <AppContainer size="wide">
      <div class="site-header__inner">
        <router-link to="/" class="site-header__brand" aria-label="Tatiana Rodas — inicio">
          <span class="site-header__brand-name">Tatiana Rodas</span>
        </router-link>

        <nav class="site-header__nav" aria-label="Navegación principal">
          <router-link
            v-for="link in primaryNav"
            :key="link.to"
            :to="link.to"
            class="site-header__link"
          >
            {{ link.label }}
          </router-link>
        </nav>

        <div class="site-header__actions">
          <BaseButton :to="applyCta.to" variant="primary" size="sm" class="site-header__cta">
            {{ applyCta.label }}
          </BaseButton>
          <button
            type="button"
            class="site-header__burger"
            aria-controls="mobile-drawer"
            :aria-expanded="ui.isMobileMenuOpen"
            :aria-label="ui.isMobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'"
            @click="ui.toggleMobileMenu()"
          >
            <AppIcon :icon="ui.isMobileMenuOpen ? X : Menu" :size="22" />
          </button>
        </div>
      </div>
    </AppContainer>

    <Transition name="drawer">
      <div
        v-if="ui.isMobileMenuOpen"
        id="mobile-drawer"
        class="site-header__drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Menú móvil"
      >
        <nav class="site-header__drawer-nav" aria-label="Navegación móvil">
          <router-link
            v-for="link in primaryNav"
            :key="link.to"
            :to="link.to"
            class="site-header__drawer-link"
            @click="ui.closeMobileMenu()"
          >
            {{ link.label }}
          </router-link>
          <BaseButton :to="applyCta.to" variant="primary" size="lg" full-width @click="ui.closeMobileMenu()">
            {{ applyCta.label }}
          </BaseButton>
        </nav>
      </div>
    </Transition>
  </header>
</template>

<style scoped lang="scss">
@use '@/styles/mixins' as *;

.site-header {
  position: sticky;
  top: 0;
  z-index: $z-sticky;
  background: transparent;
  transition: background-color $dur-base $ease-out-soft, box-shadow $dur-base $ease-out-soft, border-color $dur-base $ease-out-soft;
  border-bottom: 1px solid transparent;

  &__sentinel { position: absolute; top: 0; left: 0; height: 1px; width: 1px; }

  &--solid {
    background: rgba($color-cream, 0.92);
    backdrop-filter: blur(8px);
    border-bottom-color: $color-mist;
  }

  &__inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: $space-md;
    height: 72px;
  }

  &__brand {
    font-family: $font-heading;
    font-size: $fs-lg;
    color: $color-ink;
    letter-spacing: $tracking-tight;
  }

  &__nav {
    display: none;
    gap: $space-lg;
    @include respond-to(lg) { display: flex; }
  }

  &__link {
    font-size: $fs-sm;
    font-weight: 500;
    color: $color-charcoal;
    padding: $space-2xs 0;
    border-bottom: 1px solid transparent;
    transition: $transition-color, border-color $dur-fast $ease-in-out;

    &:hover { color: $color-terracotta; }
    &.router-link-active { color: $color-terracotta; border-bottom-color: $color-terracotta; }
  }

  &__actions {
    display: flex;
    align-items: center;
    gap: $space-sm;
  }

  &__cta {
    display: none;
    @include respond-to(md) { display: inline-flex; }
  }

  &__burger {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: $radius-md;
    color: $color-ink;

    @include respond-to(lg) { display: none; }
  }

  &__drawer {
    position: fixed;
    inset: 72px 0 0 0;
    background: $color-cream;
    z-index: $z-drawer;
    overflow-y: auto;
  }

  &__drawer-nav {
    display: flex;
    flex-direction: column;
    gap: $space-md;
    padding: $space-xl $space-lg;
  }

  &__drawer-link {
    font-family: $font-heading;
    font-size: $fs-3xl;
    color: $color-ink;
    padding-block: $space-2xs;
    border-bottom: 1px solid $color-mist;

    &.router-link-active { color: $color-terracotta; }
  }
}

.drawer-enter-active, .drawer-leave-active { transition: opacity $dur-base $ease-out-soft, transform $dur-base $ease-out-soft; }
.drawer-enter-from, .drawer-leave-to { opacity: 0; transform: translateY(-8px); }
</style>
