<script setup lang="ts">
import AppContainer from '@/components/ui/AppContainer.vue'
import { ArrowLeft } from 'lucide-vue-next'
</script>

<template>
  <div class="bare">
    <header class="bare__header" role="banner">
      <AppContainer>
        <div class="bare__bar">
          <router-link to="/" class="bare__brand" aria-label="Tatiana Rodas — inicio">Tatiana Rodas</router-link>
          <router-link to="/" class="bare__back">
            <ArrowLeft :size="16" /> Volver
          </router-link>
        </div>
      </AppContainer>
    </header>

    <main id="main" class="bare__main">
      <slot />
    </main>

    <footer class="bare__footer" role="contentinfo">
      <AppContainer>
        <p>© {{ new Date().getFullYear() }} Tatiana Rodas · <router-link to="/contacto">Contacto</router-link></p>
      </AppContainer>
    </footer>
  </div>
</template>

<style scoped lang="scss">
.bare {
  min-height: 100svh;
  display: flex;
  flex-direction: column;
  background: $color-cream;

  &__header {
    border-bottom: 1px solid $color-mist;
    background: rgba($color-cream, 0.95);
    backdrop-filter: blur(6px);
    position: sticky;
    top: 0;
    z-index: $z-sticky;
  }

  &__bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 64px;
  }

  &__brand {
    font-family: $font-heading;
    font-size: $fs-lg;
    color: $color-ink;
  }

  &__back {
    display: inline-flex;
    align-items: center;
    gap: $space-2xs;
    font-size: $fs-sm;
    color: $color-charcoal;
    &:hover { color: $color-terracotta; }
  }

  &__main { flex: 1; padding-block: $space-2xl; }

  &__footer {
    padding-block: $space-md;
    border-top: 1px solid $color-mist;
    font-size: $fs-xs;
    color: $color-stone;
    text-align: center;
    & a { color: $color-terracotta; }
  }
}
</style>
