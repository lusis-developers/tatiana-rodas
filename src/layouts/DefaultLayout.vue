<script setup lang="ts">
import SiteHeader from '@/components/sections/SiteHeader.vue'
import SiteFooter from '@/components/sections/SiteFooter.vue'
</script>

<template>
  <div class="layout">
    <SiteHeader />
    <main id="main" class="layout__main">
      <slot />
    </main>
    <SiteFooter />
  </div>
</template>

<style scoped lang="scss">
.layout {
  min-height: 100svh;
  display: flex;
  flex-direction: column;

  &__main { flex: 1; }
}
</style>
