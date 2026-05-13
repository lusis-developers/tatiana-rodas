<script setup lang="ts">
import heroSet from '@/assets/images/portraits/tatiana-cream-suit.jpg?w=480;768;1200;1600&format=avif;webp;jpg&as=picture'
import stageFistSet from '@/assets/images/portraits/tatiana-stage-fist.jpg?w=768;1200;1600;2000&format=avif;webp;jpg&as=picture'
import celebSet from '@/assets/images/portraits/tatiana-60k-celebration.jpg?w=768;1200;1600;2000&format=avif;webp;jpg&as=picture'
import pinkBgSet from '@/assets/images/portraits/tatiana-cream-pink-bg.jpg?w=480;768;1200&format=avif;webp;jpg&as=picture'
import walkSet from '@/assets/images/portraits/tatiana-corporate-walk.jpg?w=480;768;1200&format=avif;webp;jpg&as=picture'
import pointSet from '@/assets/images/portraits/tatiana-stage-pointing.jpg?w=768;1200;1600;2000&format=avif;webp;jpg&as=picture'
import seatedSet from '@/assets/images/portraits/tatiana-seated-tan.jpg?w=480;768;1200&format=avif;webp;jpg&as=picture'

import HeroSection from '@/components/sections/HeroSection.vue'
import LogosBand from '@/components/sections/LogosBand.vue'
import FeaturedIn from '@/components/sections/FeaturedIn.vue'
import PainPointSection from '@/components/sections/PainPointSection.vue'
import BeforeAfterBlock from '@/components/sections/BeforeAfterBlock.vue'
import PillarsGrid from '@/components/sections/PillarsGrid.vue'
import AboutPreview from '@/components/sections/AboutPreview.vue'
import StatStrip from '@/components/sections/StatStrip.vue'
import TestimonialsCarousel from '@/components/sections/TestimonialsCarousel.vue'
import MethodTimeline from '@/components/sections/MethodTimeline.vue'
import CaseStudyCard from '@/components/sections/CaseStudyCard.vue'
import CtaBanner from '@/components/sections/CtaBanner.vue'
import FaqAccordion from '@/components/sections/FaqAccordion.vue'
import LeadMagnet from '@/components/sections/LeadMagnet.vue'
import NewsletterBand from '@/components/sections/NewsletterBand.vue'
import QuoteBlock from '@/components/sections/QuoteBlock.vue'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import AppContainer from '@/components/ui/AppContainer.vue'
import AppImage from '@/components/ui/AppImage.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseTag from '@/components/ui/BaseTag.vue'
import ScrollReveal from '@/components/ui/ScrollReveal.vue'

import { faq } from '@/data/faq'
import { caseStudies } from '@/data/caseStudies'
import { useSeoMeta } from '@/composables/useSeoMeta'
import { homeMeta, personJsonLd } from '@/data/seo'

useSeoMeta({ ...homeMeta, jsonLd: personJsonLd })

const offItems = [
  'Te bloqueas en los momentos importantes.',
  'Hablas como tu rol, no como tú.',
  'El currículum impresiona, la historia no conecta.',
  'En reuniones dominas; ante audiencia, te quiebras.',
  'Lo tienes todo y queda algo sin decir.',
]
const onItems = [
  'Sistema nervioso regulado bajo presión.',
  'Voz reconocible — te recuerdan a ti, no al cargo.',
  'Tu historia personal aparece en tu comunicación profesional.',
  'Lideras escenarios, reuniones y casa como tú mismo.',
  'Dices lo que llevabas años callando.',
]

const stats = [
  { value: '15+', label: 'Años entrenando líderes' },
  { value: '800+', label: 'Líderes y empresarios' },
  { value: '8', label: 'Países en LATAM y España' },
  { value: '92%', label: 'Finalización del programa' },
]

const topFaq = faq.slice(0, 4)
const featuredCase = caseStudies[0]
</script>

<template>
  <!-- 1 · HERO -->
  <HeroSection variant="home">
    <template #eyebrow>
      <BaseTag>Coaching de voz y presencia ejecutiva</BaseTag>
    </template>
    <template #title>
      <h1>Del <em>OFF</em> al <em>ON</em>.</h1>
    </template>
    <template #lead>
      <p class="lead">
        Devuelvo la voz a líderes que llegaron arriba y dejaron de hablar como ellos.
        En 90 días recuperas <strong>cuerpo presente, voz reconocible e historia que conecta</strong>.
      </p>
    </template>
    <template #actions>
      <div class="hero-actions">
        <BaseButton to="/aplicar" variant="primary" size="lg">Aplica al programa</BaseButton>
        <BaseButton to="/metodo" variant="ghost" size="lg">Conoce el método</BaseButton>
      </div>
    </template>
    <template #media>
      <AppImage :picture="heroSet" alt="Tatiana Rodas, coach de voz y presencia, en traje crema" aspect="4/5" loading="eager" fetchpriority="high" rounded />
    </template>
  </HeroSection>

  <!-- 2 · GEOGRAPHIES BAND -->
  <section class="section section--soft">
    <AppContainer><LogosBand /></AppContainer>
  </section>

  <!-- 3 · ABOUT PREVIEW (Hola, soy Tatiana) -->
  <section id="sobre" class="section u-section">
    <AppContainer>
      <ScrollReveal><AboutPreview :picture="seatedSet" /></ScrollReveal>
    </AppContainer>
  </section>

  <!-- 4 · PAIN POINT — El silencio del éxito -->
  <section id="silencio" class="section u-section section--cream-deep">
    <AppContainer>
      <ScrollReveal><PainPointSection /></ScrollReveal>
    </AppContainer>
  </section>

  <!-- 5 · OFF vs ON before/after -->
  <section class="section u-section">
    <AppContainer>
      <ScrollReveal>
        <SectionHeading
          eyebrow="OFF vs ON"
          title="Lo que cambia en 90 días"
          lead="No prometo motivación temporal. Prometo resultados observables — los notas tú, y los notan los que te rodean."
          align="center"
        />
        <div class="section__body"><BeforeAfterBlock :off-items="offItems" :on-items="onItems" /></div>
      </ScrollReveal>
    </AppContainer>
  </section>

  <!-- 6 · INTERLUDE QUOTE on stage image -->
  <section class="section u-section">
    <AppContainer>
      <ScrollReveal>
        <QuoteBlock
          quote="Llegaste arriba en modo avión: éxito por fuera, silencio por dentro."
          attribution="Tatiana Rodas"
          :picture="celebSet"
        />
      </ScrollReveal>
    </AppContainer>
  </section>

  <!-- 7 · 3 PILLARS -->
  <section id="metodo" class="section u-section section--ivory">
    <AppContainer>
      <ScrollReveal>
        <SectionHeading
          eyebrow="Los 3 pilares"
          title="Fisiología · Lenguaje · Enfoque."
          lead="Tu transformación se construye sobre tres capas. No técnica de tarima. Cuerpo, voz original e historia."
          align="center"
        />
        <div class="section__body"><PillarsGrid variant="compact" /></div>
        <div class="section__cta">
          <BaseButton to="/metodo" variant="ghost">Ver el método completo</BaseButton>
        </div>
      </ScrollReveal>
    </AppContainer>
  </section>

  <!-- 8 · METHOD TIMELINE 90 DAYS -->
  <section class="section u-section">
    <AppContainer size="narrow">
      <ScrollReveal>
        <SectionHeading
          eyebrow="90 días"
          title="Tres fases. Resultados observables en cada una."
          lead="Despertar, construir, activar. Cada 30 días un cambio concreto en cómo te paras, hablas y lideras."
          align="center"
        />
        <div class="section__body"><MethodTimeline variant="compact" /></div>
      </ScrollReveal>
    </AppContainer>
  </section>

  <!-- 9 · STATS -->
  <section id="resultados" class="section u-section section--cream-deep">
    <AppContainer>
      <ScrollReveal><StatStrip :items="stats" /></ScrollReveal>
    </AppContainer>
  </section>

  <!-- 10 · TESTIMONIALS CAROUSEL -->
  <section id="casos" class="section u-section">
    <AppContainer>
      <ScrollReveal>
        <SectionHeading
          eyebrow="Líderes que cambiaron"
          title="Voces que volvieron a hablar."
          lead="Empresarios y ejecutivos en LATAM y Madrid. Cada uno con su silencio. Cada uno con un antes y un después."
          align="center"
        />
        <div class="section__body"><TestimonialsCarousel /></div>
      </ScrollReveal>
    </AppContainer>
  </section>

  <!-- 11 · FEATURED CASE STUDY (preview) -->
  <section class="section u-section section--ivory">
    <AppContainer>
      <ScrollReveal>
        <SectionHeading
          eyebrow="Caso destacado"
          title="Cuando el cambio se vuelve observable."
          align="center"
        />
        <div class="section__body case-feature">
          <CaseStudyCard :case-study="featuredCase" />
          <div class="case-feature__cta">
            <BaseButton to="/casos" variant="ghost">Ver más casos</BaseButton>
          </div>
        </div>
      </ScrollReveal>
    </AppContainer>
  </section>

  <!-- 12 · FEATURED IN BAND -->
  <section class="section section--soft">
    <AppContainer><FeaturedIn /></AppContainer>
  </section>

  <!-- 13 · LEAD MAGNET — 5 señales del silencio del éxito -->
  <section id="recursos" class="section u-section">
    <AppContainer><ScrollReveal><LeadMagnet /></ScrollReveal></AppContainer>
  </section>

  <!-- 14 · CTA BANNER stage -->
  <CtaBanner
    heading="¿Listo para tomar el escenario que ya es tuyo?"
    lead="Programa cerrado, 1:1. Por aplicación, para líderes que ya cargan la autoridad pero no la encarnan al hablar."
    cta-label="Aplica al programa"
    cta-to="/aplicar"
    :background="stageFistSet"
    :overlay="0.65"
  />

  <!-- 15 · SECOND TESTIMONIAL VISUAL (split intro) -->
  <section class="section u-section">
    <AppContainer>
      <ScrollReveal>
        <div class="split">
          <AppImage :picture="walkSet" alt="Tatiana caminando entre audiencia corporativa" aspect="4/5" rounded />
          <div class="split__copy">
            <BaseTag>Para quién es</BaseTag>
            <h2>Para líderes que ya cargan la autoridad — pero no la encarnan al hablar.</h2>
            <p class="lead">
              No es para coaches juniors buscando nicho. No es para aprender oratoria.
              Es para empresarios, ejecutivos C-suite y fundadores con 15 a 30 años de carrera
              que sospechan que algo no se está diciendo.
            </p>
            <ul class="split__list">
              <li>Has dirigido empresas durante años.</li>
              <li>Tienes equipo, marca, autoridad ganada.</li>
              <li>Llegaste arriba — y descubriste que arriba se escucha menos de lo prometido.</li>
            </ul>
          </div>
        </div>
      </ScrollReveal>
    </AppContainer>
  </section>

  <!-- 16 · METHOD VISUAL preview with portrait -->
  <section class="section u-section section--ivory">
    <AppContainer>
      <ScrollReveal>
        <div class="split split--reverse">
          <div class="split__copy">
            <BaseTag>El método en una frase</BaseTag>
            <h2>No te enseño a hablar. Te devuelvo el espacio para que digas lo que llevas años callando.</h2>
            <p class="lead">
              Empezando por una conversación que llevas años evitando — con tu equipo, con tu pareja,
              con tu cliente, con tu padre. Esa es la primera prueba de que el método funciona.
            </p>
            <div class="split__actions">
              <BaseButton to="/metodo" variant="primary">Ver el método</BaseButton>
              <BaseButton to="/aplicar" variant="link">Aplicar →</BaseButton>
            </div>
          </div>
          <AppImage :picture="pinkBgSet" alt="Tatiana retrato en fondo rosado suave" aspect="4/5" rounded />
        </div>
      </ScrollReveal>
    </AppContainer>
  </section>

  <!-- 17 · QUOTE INTERLUDE 2 -->
  <section class="section u-section">
    <AppContainer size="narrow">
      <ScrollReveal>
        <QuoteBlock
          quote="El cliente compra emoción. Pero decide desde la claridad del resultado."
          attribution="Tatiana Rodas — manifiesto"
          :picture="pointSet"
        />
      </ScrollReveal>
    </AppContainer>
  </section>

  <!-- 18 · FAQ -->
  <section id="faq" class="section u-section">
    <AppContainer size="narrow">
      <ScrollReveal>
        <SectionHeading
          eyebrow="Preguntas frecuentes"
          title="Lo que querías saber antes de aplicar."
          align="center"
        />
        <div class="section__body"><FaqAccordion :items="topFaq" /></div>
        <div class="section__cta">
          <BaseButton to="/metodo" variant="link">Ver todas las preguntas →</BaseButton>
        </div>
      </ScrollReveal>
    </AppContainer>
  </section>

  <!-- 19 · NEWSLETTER -->
  <section id="newsletter" class="section u-section">
    <AppContainer><ScrollReveal><NewsletterBand /></ScrollReveal></AppContainer>
  </section>
</template>

<style scoped lang="scss">
@use '@/styles/mixins' as *;

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: $space-sm;
  margin-top: $space-md;
}

.section {
  &--ivory       { background: $color-ivory; }
  &--cream-deep  { background: $color-cream-deep; }
  &--soft        { background: $color-cream; padding-block: $space-md; }

  &__body { margin-top: $space-2xl; }
  &__cta  { margin-top: $space-xl; display: flex; justify-content: center; }
}

h1 :deep(em),
h2 :deep(em) {
  font-style: italic;
  color: $color-terracotta;
  font-family: $font-quote;
  font-weight: 400;
}

.split {
  display: grid;
  gap: $space-2xl;
  align-items: center;

  @include respond-to(lg) {
    grid-template-columns: 1fr 1.2fr;
    gap: $space-3xl;

    &--reverse {
      grid-template-columns: 1.2fr 1fr;
      & > .split__copy { order: 1; }
    }
  }

  &__copy {
    display: flex;
    flex-direction: column;
    gap: $space-md;
    & h2 { font-size: $fs-3xl; line-height: $lh-tight; text-wrap: balance; }
  }

  &__list {
    display: flex;
    flex-direction: column;
    gap: $space-2xs;
    margin-top: $space-sm;
    & li {
      position: relative;
      padding-left: $space-md;
      color: $color-charcoal;
      &::before { content: '·'; position: absolute; left: 0; color: $color-terracotta; }
    }
  }

  &__actions {
    margin-top: $space-md;
    display: flex;
    gap: $space-md;
    flex-wrap: wrap;
    align-items: center;
  }
}

.case-feature {
  &__cta {
    margin-top: $space-xl;
    display: flex;
    justify-content: center;
  }
}
</style>
