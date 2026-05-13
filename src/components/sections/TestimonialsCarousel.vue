<script setup lang="ts">
import { ref } from 'vue'
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'
import { testimonials } from '@/data/testimonials'
import TestimonialCard from './TestimonialCard.vue'

const track = ref<HTMLElement | null>(null)

const scroll = (dir: 'prev' | 'next') => {
  const el = track.value
  if (!el) return
  const card = el.querySelector<HTMLElement>('.carousel__item')
  const step = card ? card.offsetWidth + 16 : 320
  el.scrollBy({ left: dir === 'next' ? step : -step, behavior: 'smooth' })
}
</script>

<template>
  <div class="carousel">
    <div ref="track" class="carousel__track" tabindex="0" aria-label="Testimonios — desplaza horizontal">
      <div v-for="t in testimonials" :key="t.id" class="carousel__item">
        <TestimonialCard :testimonial="t" />
      </div>
    </div>
    <div class="carousel__controls" aria-label="Controles del carrusel">
      <button type="button" class="carousel__btn" aria-label="Anterior" @click="scroll('prev')">
        <ChevronLeft :size="20" />
      </button>
      <button type="button" class="carousel__btn" aria-label="Siguiente" @click="scroll('next')">
        <ChevronRight :size="20" />
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/styles/mixins' as *;

.carousel {
  position: relative;

  &__track {
    display: flex;
    gap: $space-md;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    scroll-padding-inline: $space-md;
    padding-block: $space-xs $space-sm;

    &::-webkit-scrollbar { height: 6px; }
    &::-webkit-scrollbar-thumb { background: $color-mist; border-radius: $radius-pill; }
  }

  &__item {
    flex: 0 0 88%;
    scroll-snap-align: start;

    @include respond-to(md) { flex-basis: 48%; }
    @include respond-to(lg) { flex-basis: 32%; }
  }

  &__controls {
    display: flex;
    gap: $space-2xs;
    justify-content: flex-end;
    margin-top: $space-md;
  }

  &__btn {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background: $color-paper;
    border: 1px solid $color-mist;
    color: $color-ink;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    transition: $transition-base;
    &:hover { background: $color-ink; color: $color-paper; }
  }
}
</style>
