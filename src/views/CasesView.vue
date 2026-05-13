<script setup lang="ts">
import celebSet from '@/assets/images/portraits/tatiana-60k-celebration.jpg?w=768;1200;1600;2000&format=avif;webp;jpg&as=picture'

import HeroSection from '@/components/sections/HeroSection.vue'
import StatStrip from '@/components/sections/StatStrip.vue'
import CaseStudyCard from '@/components/sections/CaseStudyCard.vue'
import CtaBanner from '@/components/sections/CtaBanner.vue'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import AppContainer from '@/components/ui/AppContainer.vue'
import BaseTag from '@/components/ui/BaseTag.vue'
import ScrollReveal from '@/components/ui/ScrollReveal.vue'

import { caseStudies } from '@/data/caseStudies'
import { useSeoMeta } from '@/composables/useSeoMeta'
import { casesMeta } from '@/data/seo'

useSeoMeta(casesMeta)

const stats = [
  { value: '15+', label: 'Años entrenando líderes' },
  { value: '800+', label: 'Líderes y empresarios' },
  { value: '8', label: 'Países activos' },
  { value: '92%', label: 'Finalización del programa' },
]
</script>

<template>
  <HeroSection variant="minimal" :has-media="false">
    <template #eyebrow><BaseTag>Casos reales</BaseTag></template>
    <template #title><h1>Voces que cambiaron. Resultados que se ven y se escuchan.</h1></template>
    <template #lead>
      <p class="lead">Historias verificadas de empresarios y ejecutivos que dejaron de hablar como su cargo y volvieron a hablar como ellos.</p>
    </template>
  </HeroSection>

  <section class="section u-section">
    <AppContainer>
      <ScrollReveal><StatStrip :items="stats" /></ScrollReveal>
    </AppContainer>
  </section>

  <section class="section u-section">
    <AppContainer>
      <SectionHeading
        eyebrow="3 casos detallados"
        title="Cuando el cambio se vuelve observable."
        align="center"
      />
      <div class="cases">
        <CaseStudyCard
          v-for="(c, i) in caseStudies"
          :key="c.id"
          :case-study="c"
          :reverse="i % 2 === 1"
        />
      </div>
    </AppContainer>
  </section>

  <CtaBanner
    heading="Tu caso puede ser el próximo."
    cta-label="Aplica al programa"
    cta-to="/aplicar"
    :background="celebSet"
    :overlay="0.6"
  />
</template>

<style scoped lang="scss">
.cases {
  margin-top: $space-2xl;
  display: flex;
  flex-direction: column;
}
.section { &__body { margin-top: $space-2xl; } }
</style>
