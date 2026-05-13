<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import type { Picture } from '@/composables/useImageSet'
import AppImage from '@/components/ui/AppImage.vue'
import { gsap, ScrollTrigger } from '@/composables/useGsap'

interface Props {
  quote: string
  attribution?: string
  picture?: Picture
}
const props = defineProps<Props>()

const root = ref<HTMLElement | null>(null)
const bgEl = ref<HTMLElement | null>(null)
const triggers: ScrollTrigger[] = []

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  if (bgEl.value && props.picture) {
    const t = gsap.fromTo(
      bgEl.value,
      { yPercent: -10, scale: 1.08 },
      {
        yPercent: 10,
        scale: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: root.value,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.8,
        },
      },
    )
    if (t.scrollTrigger) triggers.push(t.scrollTrigger)
  }

  const tx = root.value?.querySelector<HTMLElement>('.quote-block__text')
  if (tx) {
    const t = gsap.from(tx, {
      opacity: 0,
      y: 32,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: { trigger: root.value, start: 'top 75%', once: true },
    })
    if (t.scrollTrigger) triggers.push(t.scrollTrigger)
  }
})

onBeforeUnmount(() => { triggers.forEach((t) => t.kill()) })
</script>

<template>
  <figure ref="root" class="quote-block">
    <div v-if="picture" ref="bgEl" class="quote-block__bg-wrap">
      <AppImage class="quote-block__bg" :picture="picture" alt="" aspect="auto" sizes="100vw" />
    </div>
    <div v-if="picture" class="quote-block__overlay" aria-hidden="true" />
    <blockquote class="quote-block__text">
      <p>“{{ quote }}”</p>
      <figcaption v-if="attribution">— {{ attribution }}</figcaption>
    </blockquote>
  </figure>
</template>

<style scoped lang="scss">
@use '@/styles/mixins' as *;

.quote-block {
  position: relative;
  isolation: isolate;
  overflow: hidden;
  border-radius: $radius-xl;
  background: $color-ink;
  color: $color-paper;
  padding: $space-2xl;
  text-align: center;

  @include respond-to(md) { padding: $space-4xl $space-2xl; }

  &__bg-wrap {
    position: absolute;
    inset: -8% 0;
    z-index: -2;
    will-change: transform;
  }
  &__bg { width: 100%; height: 100%; }
  &__bg :deep(img) { width: 100%; height: 100%; object-fit: cover; }

  &__overlay {
    position: absolute;
    inset: 0;
    background: rgba(27, 20, 16, 0.65);
    z-index: -1;
  }

  &__text {
    max-width: 30ch;
    margin-inline: auto;
    display: flex;
    flex-direction: column;
    gap: $space-md;
    will-change: transform, opacity;

    & p {
      font-family: $font-quote;
      font-style: italic;
      font-size: $fs-4xl;
      line-height: $lh-tight;
      color: $color-paper;
      text-wrap: balance;
    }
    & figcaption {
      font-family: $font-body;
      font-size: $fs-sm;
      letter-spacing: $tracking-wide;
      text-transform: uppercase;
      color: $color-gold-soft;
    }
  }
}
</style>
