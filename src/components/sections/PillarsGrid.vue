<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { pillars } from '@/data/pillars'
import PillarCard from './PillarCard.vue'
import { gsap, ScrollTrigger } from '@/composables/useGsap'

import walkSet from '@/assets/images/portraits/tatiana-corporate-walk.jpg?w=480;768;1200&format=avif;webp;jpg&as=picture'
import pointSet from '@/assets/images/portraits/tatiana-stage-pointing.jpg?w=480;768;1200&format=avif;webp;jpg&as=picture'
import pinkSet from '@/assets/images/portraits/tatiana-cream-pink-bg.jpg?w=480;768;1200&format=avif;webp;jpg&as=picture'

const pictures = {
  fisiologia: walkSet,
  lenguaje: pointSet,
  enfoque: pinkSet,
}

interface Props {
  variant?: 'compact' | 'expanded'
  withAnchor?: boolean
}
withDefaults(defineProps<Props>(), { variant: 'compact', withAnchor: false })

const root = ref<HTMLElement | null>(null)
const triggers: ScrollTrigger[] = []

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  requestAnimationFrame(() => {
    const cards = root.value?.querySelectorAll<HTMLElement>('.pillar')
    if (!cards || !cards.length) return

    const tl = gsap.from(cards, {
      opacity: 0,
      y: 32,
      duration: 0.8,
      ease: 'power3.out',
      stagger: 0.14,
      scrollTrigger: {
        trigger: root.value,
        start: 'top 90%',
        once: true,
        invalidateOnRefresh: true,
      },
    })
    if (tl.scrollTrigger) triggers.push(tl.scrollTrigger)
  })
})

onBeforeUnmount(() => { triggers.forEach((t) => t.kill()) })
</script>

<template>
  <div ref="root" class="pillars-grid" :class="`pillars-grid--${variant}`">
    <PillarCard
      v-for="p in pillars"
      :key="p.id"
      :pillar="p"
      :picture="pictures[p.id]"
      :variant="variant"
      :with-anchor="withAnchor"
    />
  </div>
</template>

<style scoped lang="scss">
@use '@/styles/mixins' as *;

.pillars-grid {
  display: grid;
  gap: $space-lg;
  grid-template-columns: 1fr;

  @include respond-to(md) {
    grid-template-columns: repeat(3, 1fr);
    gap: $space-lg;
  }

  &--expanded {
    @include respond-to(md) { grid-template-columns: 1fr; gap: $space-2xl; }
  }
}
</style>
