<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import pointSet from '@/assets/images/portraits/tatiana-stage-pointing.jpg?w=480;768;1200;1600&format=avif;webp;jpg&as=picture'

import AppContainer from '@/components/ui/AppContainer.vue'
import AppImage from '@/components/ui/AppImage.vue'
import BaseTag from '@/components/ui/BaseTag.vue'
import ApplicationForm from '@/components/sections/ApplicationForm.vue'
import FaqAccordion from '@/components/sections/FaqAccordion.vue'
import { ShieldCheck, Lock, Clock } from 'lucide-vue-next'

import { useSeoMeta } from '@/composables/useSeoMeta'
import { applyMeta } from '@/data/seo'

useSeoMeta(applyMeta)

const route = useRoute()
const isSuccess = computed(() => route.query.status === 'success')
const qualified = computed(() => route.query.q === '1')

const miniFaq = [
  {
    id: 'privacidad',
    question: '¿Cómo se trata mi información?',
    answer:
      'Solo se usa para evaluar tu aplicación y contactarte. No se comparte con terceros, no se vende, no se publica. Puedes pedir su eliminación en cualquier momento.',
  },
  {
    id: 'que-pasa-despues',
    question: '¿Qué pasa después de aplicar?',
    answer:
      'En menos de 48 horas recibirás respuesta. Si calificas para una sesión de diagnóstico, agendaremos una llamada de 30 minutos sin costo para evaluar mutuamente si el programa es adecuado.',
  },
]
</script>

<template>
  <AppContainer>
    <header class="apply-hero">
      <div class="apply-hero__copy">
        <BaseTag>Aplicación · Programa Del OFF al ON</BaseTag>
        <h1>Aplica al programa.</h1>
        <p class="lead">
          Programa cerrado, 1:1. Reservado a líderes y empresarios con capacidad de inversión sobre 500 USD.
          Respondemos en menos de 48 horas con los siguientes pasos.
        </p>
      </div>
      <div class="apply-hero__media">
        <AppImage :picture="pointSet" alt="Tatiana señalando audiencia en conferencia" aspect="4/5" loading="eager" rounded />
      </div>
    </header>

    <div class="trust">
      <div class="trust__item"><ShieldCheck :size="22" /> Proceso 1:1 con seguimiento directo.</div>
      <div class="trust__item"><Lock :size="22" /> Información tratada con confidencialidad.</div>
      <div class="trust__item"><Clock :size="22" /> Respuesta en menos de 48 horas.</div>
    </div>

    <section v-if="isSuccess" class="success" role="status">
      <h2>Aplicación recibida.</h2>
      <p v-if="qualified">
        Gracias. Calificas para una sesión de diagnóstico — revisaremos tu respuesta y te contactaremos
        en menos de 48 horas por el canal que indicaste.
      </p>
      <p v-else>
        Gracias por aplicar. Aunque el programa requiere una inversión sobre 500 USD,
        guardaremos tu información para mantenerte en contacto con futuras opciones.
      </p>
    </section>

    <section v-else class="form-wrap">
      <ApplicationForm />
    </section>

    <section class="mini-faq">
      <h3>Antes de aplicar</h3>
      <FaqAccordion :items="miniFaq" />
    </section>
  </AppContainer>
</template>

<style scoped lang="scss">
@use '@/styles/mixins' as *;

.apply-hero {
  display: grid;
  gap: $space-2xl;
  padding-block: $space-xl $space-2xl;

  @include respond-to(lg) {
    grid-template-columns: 1.2fr 1fr;
    gap: $space-3xl;
    align-items: center;
  }

  &__copy {
    display: flex;
    flex-direction: column;
    gap: $space-md;

    & h1 {
      font-size: $fs-5xl;
      line-height: $lh-tight;
    }
  }
}

.trust {
  display: grid;
  grid-template-columns: 1fr;
  gap: $space-sm;
  padding: $space-md;
  background: $color-ivory;
  border-radius: $radius-md;
  border: 1px solid $color-mist;
  margin-bottom: $space-2xl;

  @include respond-to(md) { grid-template-columns: repeat(3, 1fr); }

  &__item {
    display: inline-flex;
    align-items: center;
    gap: $space-2xs;
    color: $color-charcoal;
    font-size: $fs-sm;

    & > svg { color: $color-terracotta; flex: 0 0 22px; }
  }
}

.form-wrap { margin-bottom: $space-3xl; }

.success {
  padding: $space-2xl;
  background: rgba($color-success, 0.08);
  border: 1px solid $color-success;
  border-radius: $radius-lg;
  margin-bottom: $space-3xl;

  & h2 { font-size: $fs-3xl; margin-bottom: $space-sm; }
  & p { max-width: 60ch; color: $color-charcoal; }
}

.mini-faq {
  margin-bottom: $space-2xl;
  & h3 { font-size: $fs-2xl; margin-bottom: $space-md; }
}
</style>
