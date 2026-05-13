<script setup lang="ts">
import heroSet from '@/assets/images/portraits/tatiana-cream-pink-bg.jpg?w=480;768;1200;1600&format=avif;webp;jpg&as=picture'
import walkSet from '@/assets/images/portraits/tatiana-corporate-walk.jpg?w=480;768;1200&format=avif;webp;jpg&as=picture'
import pointSet from '@/assets/images/portraits/tatiana-stage-pointing.jpg?w=768;1200;1600;2000&format=avif;webp;jpg&as=picture'

import HeroSection from '@/components/sections/HeroSection.vue'
import PillarsGrid from '@/components/sections/PillarsGrid.vue'
import MethodTimeline from '@/components/sections/MethodTimeline.vue'
import BeforeAfterBlock from '@/components/sections/BeforeAfterBlock.vue'
import CtaBanner from '@/components/sections/CtaBanner.vue'
import FaqAccordion from '@/components/sections/FaqAccordion.vue'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import AppContainer from '@/components/ui/AppContainer.vue'
import AppImage from '@/components/ui/AppImage.vue'
import BaseTag from '@/components/ui/BaseTag.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import ScrollReveal from '@/components/ui/ScrollReveal.vue'

import { faq } from '@/data/faq'
import { useSeoMeta } from '@/composables/useSeoMeta'
import { methodMeta, serviceJsonLd } from '@/data/seo'

useSeoMeta({ ...methodMeta, jsonLd: serviceJsonLd })

const offItems = [
  'Bloqueo físico antes de hablar.',
  'Voz cerrada y aguda bajo presión.',
  'Comunicación llena de jerga corporativa.',
  'Historia personal escondida tras el cargo.',
]
const onItems = [
  'Cuerpo presente y centrado en cualquier escenario.',
  'Voz grave, propia, reconocible.',
  'Lenguaje claro, directo, humano.',
  'Tu historia aparece sin disculpas en tu liderazgo.',
]
</script>

<template>
  <HeroSection variant="method">
    <template #eyebrow><BaseTag>Método Del OFF al ON · 90 días</BaseTag></template>
    <template #title>
      <h1>Tres pilares para volver a hablar como tú.</h1>
    </template>
    <template #lead>
      <p class="lead">
        Fisiología, Lenguaje y Enfoque. Un sistema de 90 días para que cuando hables —
        en una tarima, en una reunión o en tu propia casa — te escuchen a ti, no al cargo.
      </p>
    </template>
    <template #actions>
      <div class="hero__actions">
        <BaseButton to="/aplicar" variant="primary" size="lg">Aplica al programa</BaseButton>
      </div>
    </template>
    <template #media>
      <AppImage :picture="heroSet" alt="Tatiana Rodas en sesión, retrato profesional" aspect="4/5" loading="eager" rounded />
    </template>
  </HeroSection>

  <nav class="subnav" aria-label="Secciones del método">
    <AppContainer>
      <ul>
        <li><a href="#diagnostico">Diagnóstico</a></li>
        <li><a href="#fisiologia">Fisiología</a></li>
        <li><a href="#lenguaje">Lenguaje</a></li>
        <li><a href="#enfoque">Enfoque</a></li>
        <li><a href="#resultados">Resultados</a></li>
      </ul>
    </AppContainer>
  </nav>

  <section id="diagnostico" class="section u-section">
    <AppContainer>
      <div class="split">
        <ScrollReveal>
          <SectionHeading
            eyebrow="Punto de partida"
            title="Diagnóstico — Tres capas que diagnosticamos antes de empezar."
            lead="No trabajamos sobre síntomas. Trabajamos sobre el origen: el cuerpo dormido, la voz heredada y la historia sin contar."
          />
          <ul class="split__list">
            <li><strong>Cuerpo</strong> — postura, respiración, regulación nerviosa.</li>
            <li><strong>Voz</strong> — patrones heredados, tono real bajo el rol.</li>
            <li><strong>Historia</strong> — estructura narrativa de 20+ años de carrera.</li>
          </ul>
        </ScrollReveal>
        <div class="split__media">
          <AppImage :picture="walkSet" alt="Tatiana caminando entre audiencia corporativa" aspect="4/5" rounded />
        </div>
      </div>
    </AppContainer>
  </section>

  <section class="section u-section section--ivory">
    <AppContainer>
      <ScrollReveal>
        <SectionHeading
          eyebrow="Los tres pilares"
          title="Fisiología, Lenguaje y Enfoque."
          align="center"
        />
        <div class="section__body">
          <PillarsGrid variant="expanded" with-anchor />
        </div>
      </ScrollReveal>
    </AppContainer>
  </section>

  <section id="resultados" class="section u-section">
    <AppContainer size="narrow">
      <ScrollReveal>
        <SectionHeading
          eyebrow="Resultados"
          title="Lo que cambia en 90 días — observable, no emocional."
          align="center"
        />
        <div class="section__body">
          <MethodTimeline variant="full" />
        </div>
      </ScrollReveal>
    </AppContainer>
  </section>

  <section class="section u-section section--ivory">
    <AppContainer>
      <ScrollReveal>
        <SectionHeading
          eyebrow="OFF vs ON"
          title="Comparativa concreta."
          align="center"
        />
        <div class="section__body">
          <BeforeAfterBlock :off-items="offItems" :on-items="onItems" />
        </div>
      </ScrollReveal>
    </AppContainer>
  </section>

  <CtaBanner
    heading="Tu próxima intervención puede ser distinta."
    cta-label="Aplica al programa"
    cta-to="/aplicar"
    :background="pointSet"
    :overlay="0.6"
  />

  <section class="section u-section">
    <AppContainer size="narrow">
      <ScrollReveal>
        <SectionHeading
          eyebrow="Preguntas frecuentes"
          title="Antes de aplicar."
          align="center"
        />
        <div class="section__body">
          <FaqAccordion :items="faq" />
        </div>
      </ScrollReveal>
    </AppContainer>
  </section>
</template>

<style scoped lang="scss">
@use '@/styles/mixins' as *;

.hero__actions { display: flex; gap: $space-sm; margin-top: $space-md; }

.subnav {
  position: sticky;
  top: 72px;
  z-index: $z-elev-1;
  background: rgba($color-cream, 0.92);
  backdrop-filter: blur(6px);
  border-bottom: 1px solid $color-mist;

  ul {
    display: flex;
    gap: $space-md;
    overflow-x: auto;
    padding-block: $space-sm;

    & a {
      font-size: $fs-sm;
      color: $color-charcoal;
      white-space: nowrap;
      padding-block: $space-2xs;
      border-bottom: 1px solid transparent;
      transition: $transition-color, border-color $dur-fast $ease-in-out;
      &:hover { color: $color-terracotta; }
    }
  }
}

.split {
  display: grid;
  gap: $space-2xl;

  @include respond-to(lg) { grid-template-columns: 1.2fr 1fr; align-items: center; }

  &__list {
    margin-top: $space-md;
    display: flex;
    flex-direction: column;
    gap: $space-sm;
    & li {
      padding-left: $space-md;
      position: relative;
      color: $color-charcoal;
      line-height: $lh-relaxed;
      &::before { content: '·'; position: absolute; left: 0; color: $color-gold; }
    }
  }
}

.section {
  &--ivory      { background: $color-ivory; }
  &__body       { margin-top: $space-2xl; }
}
</style>
