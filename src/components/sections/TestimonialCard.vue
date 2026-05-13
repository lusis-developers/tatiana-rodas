<script setup lang="ts">
import type { Testimonial } from '@/types/content'
import { Quote } from 'lucide-vue-next'

interface Props {
  testimonial: Testimonial
  variant?: 'card' | 'inline'
}
withDefaults(defineProps<Props>(), { variant: 'card' })
</script>

<template>
  <figure class="testimonial" :class="`testimonial--${variant}`">
    <Quote class="testimonial__mark" :size="32" aria-hidden="true" />
    <blockquote class="testimonial__quote">{{ testimonial.quote }}</blockquote>
    <figcaption class="testimonial__caption">
      <p class="testimonial__name">{{ testimonial.name }}</p>
      <p class="testimonial__meta">{{ testimonial.role }} · {{ testimonial.location }}</p>
      <p v-if="testimonial.highlight" class="testimonial__highlight">{{ testimonial.highlight }}</p>
    </figcaption>
  </figure>
</template>

<style scoped lang="scss">
.testimonial {
  background: $color-paper;
  border: 1px solid $color-mist;
  border-left: 3px solid $color-terracotta;
  border-radius: $radius-lg;
  padding: $space-lg;
  display: flex;
  flex-direction: column;
  gap: $space-md;
  height: 100%;

  &__mark { color: $color-gold-soft; }

  &__quote {
    font-family: $font-quote;
    font-style: italic;
    font-size: $fs-xl;
    line-height: $lh-snug;
    color: $color-ink;
  }

  &__name {
    font-weight: 600;
    color: $color-ink;
  }

  &__meta {
    font-size: $fs-sm;
    color: $color-stone;
    margin-top: $space-3xs;
  }

  &__highlight {
    margin-top: $space-2xs;
    font-size: $fs-sm;
    color: $color-terracotta-deep;
    font-weight: 500;
  }
}
</style>
