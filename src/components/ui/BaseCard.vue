<script setup lang="ts">
interface Props {
  variant?: 'outlined' | 'elevated' | 'flat'
  padded?: boolean
}
withDefaults(defineProps<Props>(), { variant: 'outlined', padded: true })
</script>

<template>
  <article class="card" :class="[`card--${$props.variant}`, { 'card--padded': padded }]">
    <div v-if="$slots.media" class="card__media"><slot name="media" /></div>
    <div class="card__body"><slot /></div>
    <div v-if="$slots.footer" class="card__footer"><slot name="footer" /></div>
  </article>
</template>

<style scoped lang="scss">
.card {
  background: $color-paper;
  border-radius: $radius-lg;
  overflow: hidden;
  transition: $transition-base;
  display: flex;
  flex-direction: column;

  &--outlined { border: 1px solid $color-mist; }
  &--elevated { box-shadow: $shadow-md; &:hover { box-shadow: $shadow-lg; transform: translateY(-2px); } }
  &--flat     { background: transparent; }

  &--padded {
    & .card__body  { padding: $space-lg; }
    & .card__footer { padding: 0 $space-lg $space-lg; }
  }

  &__media :deep(img),
  &__media :deep(picture) { display: block; width: 100%; }
}
</style>
