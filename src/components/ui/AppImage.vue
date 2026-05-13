<script setup lang="ts">
import type { Picture } from '@/composables/useImageSet'
import { computed } from 'vue'

interface Props {
  picture: Picture
  alt: string
  sizes?: string
  loading?: 'lazy' | 'eager'
  fetchpriority?: 'high' | 'low' | 'auto'
  aspect?: '1/1' | '3/4' | '4/5' | '16/9' | '21/9' | 'auto'
  rounded?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  sizes: '(min-width: 1024px) 50vw, 100vw',
  loading: 'lazy',
  fetchpriority: 'auto',
  aspect: 'auto',
  rounded: false,
})

const sources = computed(() => {
  const order = ['avif', 'webp', 'jpeg', 'jpg', 'png']
  return order
    .filter((f) => props.picture.sources[f])
    .map((f) => ({
      type: `image/${f === 'jpg' ? 'jpeg' : f}`,
      srcset: props.picture.sources[f],
    }))
})

const fallback = computed(() => props.picture.img)
</script>

<template>
  <picture class="img" :class="[`img--${props.aspect.replace('/', '-')}`, { 'img--rounded': props.rounded }]">
    <source v-for="s in sources" :key="s.type" :type="s.type" :srcset="s.srcset" :sizes="props.sizes" />
    <img
      :src="fallback.src"
      :width="fallback.w"
      :height="fallback.h"
      :alt="props.alt"
      :loading="props.loading"
      :fetchpriority="props.fetchpriority"
      decoding="async"
    />
  </picture>
</template>

<style scoped lang="scss">
.img {
  display: block;
  overflow: hidden;

  & > img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &--1-1   { aspect-ratio: 1 / 1; }
  &--3-4   { aspect-ratio: 3 / 4; }
  &--4-5   { aspect-ratio: 4 / 5; }
  &--16-9  { aspect-ratio: 16 / 9; }
  &--21-9  { aspect-ratio: 21 / 9; }
  &--auto  { aspect-ratio: auto; }

  &--rounded { border-radius: $radius-lg; }
}
</style>
