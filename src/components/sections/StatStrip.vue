<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { gsap, ScrollTrigger } from '@/composables/useGsap'
import type { StatItem } from '@/types/content'

interface Props {
  items: StatItem[]
  variant?: 'default' | 'on-image'
}
withDefaults(defineProps<Props>(), { variant: 'default' })

const root = ref<HTMLElement | null>(null)
const triggers: ScrollTrigger[] = []

onMounted(() => {
  const el = root.value
  if (!el) return
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  const valueEls = Array.from(el.querySelectorAll<HTMLElement>('[data-stat-value]'))

  valueEls.forEach((target) => {
    const raw = target.getAttribute('data-stat-value') || '0'
    const match = raw.match(/^([^\d]*)(\d+(?:\.\d+)?)(.*)$/)
    if (!match) return
    const [, prefix = '', numStr, suffix = ''] = match
    const num = parseFloat(numStr)
    const obj = { val: 0 }
    target.textContent = `${prefix}0${suffix}`

    const tween = gsap.to(obj, {
      val: num,
      duration: 1.6,
      ease: 'power2.out',
      onUpdate: () => {
        const display = Number.isInteger(num) ? Math.round(obj.val) : obj.val.toFixed(1)
        target.textContent = `${prefix}${display}${suffix}`
      },
      scrollTrigger: { trigger: target, start: 'top 90%', once: true },
    })
    if (tween.scrollTrigger) triggers.push(tween.scrollTrigger)
  })

  // Stagger reveal of items
  const items = el.querySelectorAll<HTMLElement>('.stats__item')
  const tl = gsap.from(items, {
    opacity: 0,
    y: 24,
    duration: 0.7,
    stagger: 0.1,
    ease: 'power3.out',
    scrollTrigger: { trigger: el, start: 'top 85%', once: true },
  })
  if (tl.scrollTrigger) triggers.push(tl.scrollTrigger)
})

onBeforeUnmount(() => { triggers.forEach((t) => t.kill()) })
</script>

<template>
  <div ref="root" class="stats" :class="`stats--${variant}`">
    <div v-for="it in items" :key="it.label" class="stats__item">
      <p class="stats__value" :data-stat-value="it.value">{{ it.value }}</p>
      <p class="stats__label">{{ it.label }}</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/styles/mixins' as *;

.stats {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: $space-lg;
  padding: $space-xl;
  background: $color-ivory;
  border-radius: $radius-lg;
  border: 1px solid $color-mist;

  @include respond-to(md) {
    grid-template-columns: repeat(4, 1fr);
    gap: $space-xl;
  }

  &--on-image {
    background: rgba($color-ink, 0.55);
    border-color: rgba($color-paper, 0.1);
    color: $color-paper;
  }

  &__item { text-align: center; }

  &__value {
    font-family: $font-heading;
    font-size: $fs-4xl;
    color: $color-terracotta;
    line-height: $lh-tight;
  }
  &--on-image &__value { color: $color-paper; }

  &__label {
    margin-top: $space-2xs;
    font-size: $fs-sm;
    color: $color-stone;
    text-wrap: balance;
  }
  &--on-image &__label { color: $color-mist; }
}
</style>
