<script setup lang="ts">
import { ref } from 'vue'
import type { Picture } from '@/composables/useImageSet'
import AppImage from './AppImage.vue'
import { useParallax } from '@/composables/useGsap'

interface Props {
  picture: Picture
  alt: string
  aspect?: '1/1' | '3/4' | '4/5' | '16/9' | '21/9' | 'auto'
  rounded?: boolean
  loading?: 'lazy' | 'eager'
  distance?: number
  scrub?: number | boolean
}
const props = withDefaults(defineProps<Props>(), {
  aspect: '4/5',
  rounded: false,
  loading: 'lazy',
  distance: 80,
  scrub: 0.6,
})

const inner = ref<HTMLElement | null>(null)
useParallax(inner, { distance: props.distance, scrub: props.scrub })
</script>

<template>
  <div class="parallax">
    <div ref="inner" class="parallax__inner">
      <AppImage
        :picture="picture"
        :alt="alt"
        :aspect="aspect"
        :rounded="rounded"
        :loading="loading"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.parallax {
  position: relative;
  overflow: hidden;
  border-radius: $radius-lg;

  &__inner {
    will-change: transform;
  }
}
</style>
