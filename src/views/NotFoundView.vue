<script setup lang="ts">
import HeroSection from '@/components/sections/HeroSection.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseTag from '@/components/ui/BaseTag.vue'
import { useSeoMeta } from '@/composables/useSeoMeta'

useSeoMeta({
  title: 'Página no encontrada — Tatiana Rodas',
  description: 'La ruta solicitada no existe.',
  noindex: true,
})
</script>

<template>
  <HeroSection variant="minimal" align="center" :has-media="false">
    <template #eyebrow><BaseTag align="center">404</BaseTag></template>
    <template #title><h1>Esta página dejó de hablar.</h1></template>
    <template #lead>
      <p class="lead">No encontramos lo que buscabas. Volvamos al inicio.</p>
    </template>
    <template #actions>
      <div class="actions">
        <BaseButton to="/" variant="primary" size="lg">Ir al inicio</BaseButton>
        <BaseButton to="/aplicar" variant="ghost" size="lg">Aplica al programa</BaseButton>
      </div>
    </template>
  </HeroSection>
</template>

<style scoped lang="scss">
.actions {
  display: flex;
  gap: $space-sm;
  justify-content: center;
  flex-wrap: wrap;
}
</style>
