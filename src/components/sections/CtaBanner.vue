<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import type { Picture } from '@/composables/useImageSet'
import type { RouteLocationRaw } from 'vue-router'
import AppImage from '@/components/ui/AppImage.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import AppContainer from '@/components/ui/AppContainer.vue'
import { gsap, ScrollTrigger } from '@/composables/useGsap'

interface Props {
  heading: string
  lead?: string
  ctaLabel: string
  ctaTo?: RouteLocationRaw
  ctaHref?: string
  background?: Picture
  overlay?: number
}
const props = withDefaults(defineProps<Props>(), { overlay: 0.6 })

const root = ref<HTMLElement | null>(null)
const bgEl = ref<HTMLElement | null>(null)
const contentEl = ref<HTMLElement | null>(null)
const triggers: ScrollTrigger[] = []

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  if (bgEl.value && props.background) {
    const t = gsap.fromTo(
      bgEl.value,
      { yPercent: -12, scale: 1.08 },
      {
        yPercent: 12,
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

  if (contentEl.value) {
    const children = contentEl.value.querySelectorAll<HTMLElement>('[data-reveal-child]')
    const t = gsap.from(children, {
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: 'power3.out',
      stagger: 0.12,
      scrollTrigger: { trigger: root.value, start: 'top 75%', once: true },
    })
    if (t.scrollTrigger) triggers.push(t.scrollTrigger)
  }
})

onBeforeUnmount(() => { triggers.forEach((t) => t.kill()) })
</script>

<template>
  <section ref="root" class="cta-banner" :class="{ 'cta-banner--image': !!background }">
    <div v-if="background" ref="bgEl" class="cta-banner__bg-wrap">
      <AppImage
        class="cta-banner__bg"
        :picture="background"
        alt=""
        aspect="auto"
        sizes="100vw"
      />
    </div>
    <div v-if="background" class="cta-banner__overlay" :style="{ '--overlay': overlay }" aria-hidden="true" />

    <AppContainer class="cta-banner__inner">
      <div ref="contentEl" class="cta-banner__content">
        <h2 class="cta-banner__heading" data-reveal-child>{{ heading }}</h2>
        <p v-if="lead" class="cta-banner__lead" data-reveal-child>{{ lead }}</p>
        <div class="cta-banner__actions" data-reveal-child>
          <BaseButton :to="ctaTo" :href="ctaHref" variant="primary" size="lg">
            {{ ctaLabel }}
          </BaseButton>
        </div>
      </div>
    </AppContainer>
  </section>
</template>

<style scoped lang="scss">
@use '@/styles/mixins' as *;

.cta-banner {
  position: relative;
  overflow: hidden;
  background: $color-terracotta;
  color: $color-paper;
  padding-block: $space-3xl;
  isolation: isolate;

  @include respond-to(md) { padding-block: $space-4xl; }

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
    background: rgba(27, 20, 16, var(--overlay));
    z-index: -1;
  }

  &__inner { text-align: center; }

  &__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: $space-md;
  }

  &__heading {
    color: inherit;
    font-size: $fs-4xl;
    line-height: $lh-tight;
    text-wrap: balance;
    max-width: 24ch;
  }

  &__lead {
    max-width: 50ch;
    color: rgba($color-paper, 0.85);
    font-size: $fs-lg;
  }

  &__actions { margin-top: $space-sm; }
}
</style>
