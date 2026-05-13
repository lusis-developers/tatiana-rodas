<script setup lang="ts">
interface Props {
  size?: 'default' | 'narrow' | 'tight' | 'wide'
  as?: string
}
const props = withDefaults(defineProps<Props>(), { size: 'default', as: 'div' })
</script>

<template>
  <component :is="props.as" class="container" :class="`container--${props.size}`">
    <slot />
  </component>
</template>

<style scoped lang="scss">
@use '@/styles/mixins' as *;

.container {
  width: 100%;
  margin-inline: auto;
  padding-inline: $space-md;

  @include respond-to(md) { padding-inline: $space-lg; }
  @include respond-to(lg) { padding-inline: $space-xl; }

  &--default { max-width: $container-max; }
  &--narrow  { max-width: $container-narrow; }
  &--tight   { max-width: $container-tight; }
  &--wide    { max-width: 100%; }
}
</style>
