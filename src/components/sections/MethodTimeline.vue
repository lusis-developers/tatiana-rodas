<script setup lang="ts">
import type { TimelinePhase } from '@/types/content'

interface Props {
  variant?: 'compact' | 'full'
}
withDefaults(defineProps<Props>(), { variant: 'compact' })

const phases: TimelinePhase[] = [
  {
    number: '01',
    name: 'Despertar',
    duration: 'Días 1 – 30',
    outcome: 'Distingues cuándo hablas como tu rol y cuándo como tú. Notas cuándo se cierra el pecho y por qué.',
    deliverables: [
      'Diagnóstico de cuerpo, voz y narrativa.',
      'Identificación del momento exacto en que tu voz se cierra.',
      'Una conversación importante que llevabas años evitando.',
    ],
  },
  {
    number: '02',
    name: 'Construir',
    duration: 'Días 31 – 60',
    outcome: 'Tu sistema nervioso se regula. La historia que callabas empieza a aparecer en cómo lideras.',
    deliverables: [
      'Regulación del sistema nervioso bajo presión.',
      'Reactivación de la voz original previa al rol.',
      'Decisiones tomadas desde realismo, no desde euforia.',
    ],
  },
  {
    number: '03',
    name: 'Activar',
    duration: 'Días 61 – 90',
    outcome: 'Lideras reuniones, presentaciones y conferencias como tú mismo. Otros lo notan sin que tengas que explicarlo.',
    deliverables: [
      'Tu historia personal aparece en tu comunicación profesional.',
      'Te recuerdan a ti, no solo a lo que vendiste.',
      'Tu pareja, tu equipo y tu audiencia te miran distinto.',
    ],
  },
]
</script>

<template>
  <ol class="timeline" :class="`timeline--${variant}`">
    <li v-for="(phase, i) in phases" :key="phase.number" class="timeline__item" :style="{ '--i': i }">
      <div class="timeline__bullet" aria-hidden="true">
        <span>{{ phase.number }}</span>
      </div>
      <div class="timeline__body">
        <p class="timeline__duration">{{ phase.duration }}</p>
        <h3 class="timeline__name">{{ phase.name }}</h3>
        <p class="timeline__outcome">{{ phase.outcome }}</p>
        <ul v-if="variant === 'full'" class="timeline__deliverables">
          <li v-for="d in phase.deliverables" :key="d">{{ d }}</li>
        </ul>
      </div>
    </li>
  </ol>
</template>

<style scoped lang="scss">
@use '@/styles/mixins' as *;

.timeline {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: $space-xl;
  list-style: none;
  padding-left: $space-xl;

  &::before {
    content: '';
    position: absolute;
    top: 0; bottom: 0;
    left: 22px;
    width: 1px;
    background: $color-terracotta-soft;
  }

  &__item {
    position: relative;
    display: grid;
    grid-template-columns: 44px 1fr;
    gap: $space-md;
    margin-left: -$space-xl;
  }

  &__bullet {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background: $color-terracotta;
    color: $color-paper;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: $font-heading;
    font-size: $fs-base;
    z-index: 1;
  }

  &__duration {
    font-family: $font-body;
    font-size: $fs-xs;
    letter-spacing: $tracking-wide;
    text-transform: uppercase;
    color: $color-gold;
    margin-bottom: $space-2xs;
  }

  &__name {
    font-family: $font-heading;
    font-size: $fs-3xl;
    color: $color-ink;
    line-height: $lh-tight;
  }

  &__outcome {
    color: $color-charcoal;
    margin-top: $space-2xs;
    line-height: $lh-relaxed;
  }

  &__deliverables {
    margin-top: $space-md;
    display: flex;
    flex-direction: column;
    gap: $space-2xs;

    & li {
      position: relative;
      padding-left: $space-md;
      color: $color-charcoal;
      &::before {
        content: '→';
        position: absolute;
        left: 0;
        color: $color-gold;
      }
    }
  }
}
</style>
