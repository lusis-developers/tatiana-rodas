<script setup lang="ts">
import BaseTag from './BaseTag.vue'

interface Props {
  eyebrow?: string
  title: string
  lead?: string
  align?: 'left' | 'center'
  as?: 'h2' | 'h3'
}
const props = withDefaults(defineProps<Props>(), { align: 'left', as: 'h2' })
</script>

<template>
  <header class="section-heading" :class="`section-heading--${props.align}`">
    <BaseTag v-if="props.eyebrow" :align="props.align">{{ props.eyebrow }}</BaseTag>
    <component :is="props.as" class="section-heading__title">{{ props.title }}</component>
    <p v-if="props.lead" class="section-heading__lead lead">{{ props.lead }}</p>
  </header>
</template>

<style scoped lang="scss">
.section-heading {
  display: flex;
  flex-direction: column;
  gap: $space-sm;

  &--left   { text-align: left; align-items: flex-start; }
  &--center { text-align: center; align-items: center; }

  &__title {
    max-width: 28ch;
    text-wrap: balance;
  }
  &--center &__title { margin-inline: auto; }

  &__lead {
    max-width: 55ch;
    text-wrap: pretty;
  }
  &--center &__lead { margin-inline: auto; }
}
</style>
