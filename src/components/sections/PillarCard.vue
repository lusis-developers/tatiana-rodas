<script setup lang="ts">
import type { Pillar } from '@/types/content'
import type { Picture } from '@/composables/useImageSet'
import { Activity, MessageCircle, Target } from 'lucide-vue-next'
import AppIcon from '@/components/ui/AppIcon.vue'
import AppImage from '@/components/ui/AppImage.vue'

interface Props {
  pillar: Pillar
  picture?: Picture
  variant?: 'compact' | 'expanded'
  withAnchor?: boolean
}
const props = withDefaults(defineProps<Props>(), { variant: 'compact', withAnchor: false })

const iconMap = { Activity, MessageCircle, Target } as const
const Icon = iconMap[props.pillar.iconName as keyof typeof iconMap] ?? Activity
</script>

<template>
  <article class="pillar" :class="`pillar--${variant}`" :id="withAnchor ? pillar.id : undefined">
    <figure v-if="picture" class="pillar__media">
      <AppImage
        :picture="picture"
        :alt="`Tatiana Rodas — pilar ${pillar.title}`"
        :aspect="variant === 'expanded' ? '16/9' : '4/5'"
      />
      <span class="pillar__number-badge" aria-hidden="true">{{ pillar.number }}</span>
      <span class="pillar__icon-badge" aria-hidden="true">
        <AppIcon :icon="Icon" :size="22" />
      </span>
    </figure>

    <div class="pillar__body">
      <h3 class="pillar__title">{{ pillar.title }}</h3>
      <p class="pillar__tagline">{{ pillar.tagline }}</p>
      <p v-if="variant === 'expanded'" class="pillar__description">{{ pillar.description }}</p>
      <ul v-if="variant === 'expanded'" class="pillar__bullets">
        <li v-for="b in pillar.bullets" :key="b">{{ b }}</li>
      </ul>
    </div>
  </article>
</template>

<style scoped lang="scss">
@use '@/styles/mixins' as *;

.pillar {
  background: $color-paper;
  border-radius: $radius-lg;
  border: 1px solid $color-mist;
  overflow: hidden;
  transition: transform $dur-base $ease-out-soft, box-shadow $dur-base $ease-out-soft, border-color $dur-base $ease-out-soft;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-4px);
    box-shadow: $shadow-lg;
    border-color: $color-terracotta-soft;
  }

  &__media {
    position: relative;
    overflow: hidden;

    & :deep(img) {
      transition: transform $dur-slower $ease-out-soft;
      filter: saturate(0.9);
    }
  }

  &:hover &__media :deep(img) {
    transform: scale(1.05);
    filter: saturate(1);
  }

  &__number-badge {
    position: absolute;
    top: $space-md;
    left: $space-md;
    background: $color-paper;
    color: $color-terracotta;
    font-family: $font-heading;
    font-size: $fs-lg;
    line-height: 1;
    padding: $space-2xs $space-sm;
    border-radius: $radius-pill;
    box-shadow: $shadow-sm;
    letter-spacing: $tracking-tight;
  }

  &__icon-badge {
    position: absolute;
    bottom: -22px;
    right: $space-md;
    width: 56px;
    height: 56px;
    background: $color-terracotta;
    color: $color-paper;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: $shadow-md;
    border: 3px solid $color-paper;
  }

  &__body {
    padding: $space-xl $space-lg $space-lg;
    display: flex;
    flex-direction: column;
    gap: $space-sm;
    flex: 1;
  }

  &__title {
    font-family: $font-heading;
    font-size: $fs-3xl;
    color: $color-ink;
    line-height: $lh-tight;
  }

  &__tagline {
    font-family: $font-quote;
    font-style: italic;
    font-size: $fs-lg;
    color: $color-terracotta-deep;
    line-height: $lh-snug;
  }

  // EXPANDED variant — full method view
  &--expanded {
    scroll-margin-top: 100px;

    @include respond-to(md) {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 0;

      & > .pillar__media {
        height: 100%;
        & :deep(picture), & :deep(img) { height: 100%; }
      }

      & > .pillar__body { padding: $space-2xl; gap: $space-md; }
    }

    & .pillar__icon-badge {
      bottom: auto;
      top: $space-md;
      right: $space-md;
    }
  }

  &--expanded &__description {
    color: $color-charcoal;
    line-height: $lh-relaxed;
    margin-top: $space-2xs;
  }

  &--expanded &__bullets {
    display: flex;
    flex-direction: column;
    gap: $space-2xs;
    margin-top: $space-sm;

    & li {
      position: relative;
      padding-left: $space-md;
      color: $color-charcoal;
      line-height: $lh-relaxed;
      &::before {
        content: '';
        position: absolute;
        left: 0;
        top: 0.6em;
        width: 8px;
        height: 1px;
        background: $color-gold;
      }
    }
  }
}
</style>
