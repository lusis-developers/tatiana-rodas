<script setup lang="ts">
const venues = [
  'Conferencias C-suite',
  'Programas in-company',
  'Mentorías ejecutivas 1:1',
  'Keynotes corporativas',
  'Mastermind empresarial',
  'Eventos de liderazgo',
]
</script>

<template>
  <div class="featured">
    <p class="featured__label">Donde ha entrenado, hablado y guiado</p>
    <ul class="featured__row">
      <li v-for="v in venues" :key="v">{{ v }}</li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
@use '@/styles/mixins' as *;

.featured {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: $space-md;
  padding-block: $space-xl;

  &__label {
    font-size: $fs-xs;
    letter-spacing: $tracking-wide;
    text-transform: uppercase;
    color: $color-stone;
  }

  &__row {
    display: flex;
    flex-wrap: wrap;
    gap: $space-md $space-xl;
    justify-content: center;
    max-width: 900px;

    & li {
      font-family: $font-heading;
      font-size: $fs-lg;
      color: $color-charcoal;
      opacity: 0.75;
      letter-spacing: $tracking-tight;
      transition: opacity $dur-fast $ease-in-out;
      &:hover { opacity: 1; color: $color-terracotta; }
    }
  }
}
</style>
