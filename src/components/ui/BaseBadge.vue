<script setup lang="ts">
interface Props {
  variant?: 'terracotta' | 'gold' | 'stone' | 'cream'
}
withDefaults(defineProps<Props>(), { variant: 'terracotta' })
</script>

<template>
  <span class="badge" :class="`badge--${$props.variant}`"><slot /></span>
</template>

<style scoped lang="scss">
.badge {
  display: inline-flex;
  align-items: center;
  padding: $space-3xs $space-sm;
  border-radius: $radius-pill;
  font-size: $fs-xs;
  font-weight: 600;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  line-height: 1;

  &--terracotta { background: rgba($color-terracotta, 0.12); color: $color-terracotta-deep; }
  &--gold       { background: rgba($color-gold, 0.15); color: darken($color-gold, 12%); }
  &--stone      { background: $color-mist; color: $color-charcoal; }
  &--cream      { background: $color-cream-deep; color: $color-ink; }
}
</style>
