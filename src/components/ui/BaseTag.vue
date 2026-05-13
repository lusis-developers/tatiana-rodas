<script setup lang="ts">
interface Props {
  align?: 'left' | 'center'
}
withDefaults(defineProps<Props>(), { align: 'left' })
</script>

<template>
  <p class="tag" :class="`tag--${$props.align}`">
    <span class="tag__dot" aria-hidden="true" />
    <span class="tag__text"><slot /></span>
  </p>
</template>

<style scoped lang="scss">
.tag {
  display: inline-flex;
  align-items: center;
  gap: $space-2xs;
  font-family: $font-body;
  font-size: $fs-sm;
  font-weight: 600;
  letter-spacing: $tracking-wide;
  text-transform: uppercase;
  color: $color-gold;

  &--center { display: flex; justify-content: center; }

  &__dot {
    width: 6px; height: 6px; border-radius: 50%;
    background: currentColor;
    flex: 0 0 6px;
  }
}
</style>
