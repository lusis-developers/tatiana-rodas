<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { gsap } from '@/composables/useGsap'

interface Props {
  variant?: 'home' | 'method' | 'about' | 'apply' | 'minimal'
  align?: 'left' | 'center'
  hasMedia?: boolean
}
withDefaults(defineProps<Props>(), { variant: 'home', align: 'left', hasMedia: true })
defineSlots<{
  eyebrow?: () => unknown
  title?: () => unknown
  lead?: () => unknown
  actions?: () => unknown
  media?: () => unknown
}>()

const root = ref<HTMLElement | null>(null)
let tl: gsap.core.Timeline | null = null

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  const el = root.value
  if (!el) return

  const content = el.querySelector('.hero__content')
  const media = el.querySelector('.hero__media')
  const items = content ? content.children : []

  tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
  if (items.length) {
    tl.from(items, { opacity: 0, y: 32, duration: 0.9, stagger: 0.12 })
  }
  if (media) {
    tl.from(
      media,
      { opacity: 0, x: 50, scale: 0.96, duration: 1.2 },
      '-=0.7',
    )
  }
})

onBeforeUnmount(() => { tl?.kill() })
</script>

<template>
  <section
    ref="root"
    class="hero"
    :class="[`hero--${$props.variant}`, `hero--align-${$props.align}`, { 'hero--no-media': !$props.hasMedia }]"
  >
    <div class="hero__container">
      <div class="hero__content">
        <slot name="eyebrow" />
        <slot name="title" />
        <slot name="lead" />
        <slot name="actions" />
      </div>
      <div v-if="hasMedia" class="hero__media">
        <slot name="media" />
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
@use '@/styles/mixins' as *;

.hero {
  position: relative;
  padding-block: $space-2xl $space-3xl;
  background: $color-cream;

  @include respond-to(md) { padding-block: $space-3xl $space-4xl; }
  @include respond-to(lg) { padding-block: $space-4xl $space-5xl; }

  &__container {
    @include container;
    display: grid;
    gap: $space-xl;
    align-items: center;

    @include respond-to(lg) {
      grid-template-columns: 1.1fr 1fr;
      gap: $space-3xl;
    }
  }

  &--no-media &__container { grid-template-columns: 1fr; }
  &--align-center &__content { text-align: center; align-items: center; }

  &__content {
    display: flex;
    flex-direction: column;
    gap: $space-md;
    max-width: 60ch;

    & :deep(h1) {
      font-size: $fs-5xl;
      line-height: $lh-tight;
      letter-spacing: $tracking-tight;
      text-wrap: balance;
    }
    & :deep(.lead), & :deep(p) {
      font-size: $fs-lg;
      color: $color-charcoal;
      max-width: 50ch;
    }
    & :deep(.hero__actions) {
      display: flex;
      flex-wrap: wrap;
      gap: $space-sm;
      margin-top: $space-md;
    }
  }

  &__media {
    position: relative;
    will-change: transform, opacity;

    & :deep(picture), & :deep(img) {
      border-radius: $radius-lg;
      box-shadow: $shadow-lg;
    }
    &::before {
      content: '';
      position: absolute;
      inset: $space-md $space-md -$space-md -$space-md;
      background: $color-terracotta-soft;
      border-radius: $radius-lg;
      z-index: 0;
      opacity: 0.55;

      @include reduced-motion { display: none; }
    }
    & :deep(picture), & :deep(img) {
      position: relative;
      z-index: 1;
    }
  }

  &--method, &--about {
    background: linear-gradient(180deg, $color-cream 0%, $color-ivory 100%);
  }
  &--minimal {
    padding-block: $space-2xl $space-xl;
    @include respond-to(md) { padding-block: $space-3xl $space-2xl; }
  }
}
</style>
