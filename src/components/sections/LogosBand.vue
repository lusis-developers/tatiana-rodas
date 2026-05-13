<script setup lang="ts">
interface Props {
  label?: string
  logos?: string[]
}
const props = withDefaults(defineProps<Props>(), {
  label: 'Conferencista y mentora en',
  logos: () => ['Ecuador', 'México', 'Colombia', 'Perú', 'El Salvador', 'Miami', 'Madrid', 'Argentina'],
})
</script>

<template>
  <div class="logos-band" aria-label="Geografías de impacto">
    <p class="logos-band__label">{{ props.label }}</p>
    <ul class="logos-band__list">
      <li v-for="l in props.logos" :key="l">{{ l }}</li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
@use '@/styles/mixins' as *;

.logos-band {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: $space-md;
  padding-block: $space-xl;
  border-block: 1px solid $color-mist;

  &__label {
    font-family: $font-body;
    font-size: $fs-xs;
    letter-spacing: $tracking-wide;
    text-transform: uppercase;
    color: $color-stone;
  }

  &__list {
    display: flex;
    flex-wrap: wrap;
    gap: $space-md $space-xl;
    justify-content: center;

    & li {
      font-family: $font-heading;
      font-size: $fs-xl;
      color: $color-charcoal;
      letter-spacing: $tracking-tight;
      opacity: 0.7;
      transition: opacity $dur-fast $ease-in-out;
      &:hover { opacity: 1; }
    }
  }
}
</style>
