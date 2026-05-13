<script setup lang="ts">
import type { Picture } from '@/composables/useImageSet'
import AppImage from '@/components/ui/AppImage.vue'

interface Chunk {
  title?: string
  body: string
  picture?: Picture
  alt?: string
}
interface Props { chunks: Chunk[] }
defineProps<Props>()
</script>

<template>
  <div class="bio">
    <div
      v-for="(chunk, i) in chunks"
      :key="i"
      class="bio__chunk"
      :class="{ 'bio__chunk--alt': i % 2 === 1 }"
    >
      <div class="bio__text">
        <h3 v-if="chunk.title" class="bio__title">{{ chunk.title }}</h3>
        <p class="bio__body">{{ chunk.body }}</p>
      </div>
      <AppImage
        v-if="chunk.picture"
        class="bio__media"
        :picture="chunk.picture"
        :alt="chunk.alt ?? ''"
        aspect="4/5"
        rounded
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/styles/mixins' as *;

.bio {
  display: flex;
  flex-direction: column;
  gap: $space-3xl;
}

.bio__chunk {
  display: grid;
  gap: $space-xl;
  align-items: center;

  @include respond-to(lg) {
    grid-template-columns: 1.2fr 1fr;
    gap: $space-3xl;

    &--alt {
      grid-template-columns: 1fr 1.2fr;
      & > .bio__media { order: 1; }
      & > .bio__text  { order: 2; }
    }
  }
}

.bio__title {
  font-family: $font-heading;
  font-size: $fs-3xl;
  color: $color-ink;
  margin-bottom: $space-md;
  line-height: $lh-tight;
}

.bio__body {
  font-size: $fs-lg;
  color: $color-charcoal;
  line-height: $lh-relaxed;
  max-width: 55ch;
}

.bio__media { box-shadow: $shadow-md; }
</style>
