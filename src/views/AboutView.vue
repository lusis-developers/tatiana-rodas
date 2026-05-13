<script setup lang="ts">
import seatedSet from '@/assets/images/portraits/tatiana-seated-tan.jpg?w=480;768;1200;1600&format=avif;webp;jpg&as=picture'
import creamSet from '@/assets/images/portraits/tatiana-cream-suit.jpg?w=480;768;1200&format=avif;webp;jpg&as=picture'
import walkSet from '@/assets/images/portraits/tatiana-corporate-walk.jpg?w=480;768;1200&format=avif;webp;jpg&as=picture'
import stageSet from '@/assets/images/portraits/tatiana-stage-fist.jpg?w=480;768;1200&format=avif;webp;jpg&as=picture'

import HeroSection from '@/components/sections/HeroSection.vue'
import BioNarrative from '@/components/sections/BioNarrative.vue'
import CtaBanner from '@/components/sections/CtaBanner.vue'
import AppImage from '@/components/ui/AppImage.vue'
import AppContainer from '@/components/ui/AppContainer.vue'
import BaseTag from '@/components/ui/BaseTag.vue'
import ScrollReveal from '@/components/ui/ScrollReveal.vue'

import { useSeoMeta } from '@/composables/useSeoMeta'
import { aboutMeta, personJsonLd } from '@/data/seo'

useSeoMeta({ ...aboutMeta, jsonLd: personJsonLd })

const chunks = [
  {
    title: 'Por qué la voz',
    body:
      'Trabajé durante años con líderes que tenían todo — empresa, equipo, autoridad — y un silencio adentro que nadie nombraba. Descubrí que la voz no se entrena en la garganta. Se devuelve al cuerpo, al lenguaje y a la historia. Eso es lo que hago.',
    picture: creamSet,
    alt: 'Tatiana Rodas en traje crema',
  },
  {
    title: 'El método y los años',
    body:
      'Del OFF al ON nació de 15+ años acompañando empresarios y ejecutivos C-suite. No es oratoria. No es motivación. Es un sistema de 90 días con tres pilares — Fisiología, Lenguaje y Enfoque — que devuelve al líder su voz original, su cuerpo presente y la historia que llevaba sin saber cómo contar.',
    picture: walkSet,
    alt: 'Tatiana caminando entre audiencia',
  },
  {
    title: 'A quién acompaño',
    body:
      'Mis clientes están en Ecuador, México, Colombia, Perú, El Salvador, Miami, Madrid y Argentina. Tienen 15 a 30 años de carrera. Llegaron arriba. Y descubrieron que arriba se escucha menos de lo que prometen. Mi compromiso es devolverles el espacio para decir lo que llevan años callando — empezando por una conversación evitada.',
    picture: stageSet,
    alt: 'Tatiana en escenario, con el puño en alto',
  },
]
</script>

<template>
  <HeroSection variant="about">
    <template #eyebrow><BaseTag>Sobre Tatiana</BaseTag></template>
    <template #title><h1>Hola, soy Tatiana.</h1></template>
    <template #lead>
      <p class="lead">
        Coach de voz y presencia auténtica para líderes y empresarios senior.
        Creadora del método <em>Del OFF al ON</em>.
      </p>
    </template>
    <template #media>
      <AppImage :picture="seatedSet" alt="Tatiana Rodas, retrato sentada, ambiente cálido" aspect="4/5" loading="eager" rounded />
    </template>
  </HeroSection>

  <section class="section u-section">
    <AppContainer>
      <ScrollReveal><BioNarrative :chunks="chunks" /></ScrollReveal>
    </AppContainer>
  </section>

  <section class="section u-section section--cream-deep">
    <AppContainer size="narrow">
      <blockquote class="manifesto">
        El cliente compra emoción. Pero decide desde la claridad del resultado.
        El cambio no es cómo te sientes — es lo que haces distinto después.
      </blockquote>
    </AppContainer>
  </section>

  <CtaBanner
    heading="¿Aplicas o nos escribes primero?"
    lead="Si llegaste arriba y algo se quedó sin decir, el siguiente paso es aplicar."
    cta-label="Aplica al programa"
    cta-to="/aplicar"
  />
</template>

<style scoped lang="scss">
.section { &--cream-deep { background: $color-cream-deep; } }

.manifesto {
  font-family: $font-quote;
  font-style: italic;
  font-size: $fs-3xl;
  line-height: $lh-snug;
  color: $color-ink;
  text-align: center;
  text-wrap: balance;
  max-width: 30ch;
  margin: 0 auto;
}

h1 :deep(em) {
  font-style: italic;
  color: $color-terracotta;
}
</style>
