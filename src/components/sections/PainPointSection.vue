<script setup lang="ts">
import SectionHeading from '@/components/ui/SectionHeading.vue'
</script>

<template>
  <div class="pain">
    <SectionHeading
      eyebrow="El silencio del éxito"
      title="Llegaste arriba. Y descubriste que arriba se escucha menos de lo que prometen."
      lead="No es falta de oratoria. Es algo más profundo, más antiguo, más íntimo: 20 años hablando desde el cargo y dejaste de hablar como tú."
      align="center"
    />

    <ul class="pain__list">
      <li>
        <p class="pain__title">Hablas desde el rol, no desde la persona.</p>
        <p>Tu identidad escondida detrás del título: CEO, fundador, padre, jefe, esposo. Tu voz, en silencio desde hace décadas.</p>
      </li>
      <li>
        <p class="pain__title">Tu cuerpo en modo avión.</p>
        <p>20 años decidiendo desde una silla. El cuerpo aprendió a quedarse quieto y colapsa cuando toca pararse a presentar.</p>
      </li>
      <li>
        <p class="pain__title">El currículum impresiona; la historia no conecta.</p>
        <p>Puedes presentar resultados. No puedes contar tu trayecto. 20 años de vida convertidos en lista de logros.</p>
      </li>
      <li>
        <p class="pain__title">Llegaste arriba pero en casa dejaron de escucharte.</p>
        <p>Diriges empresas y nadie te escucha en casa. No por falta de amor — hablas como el rol y la familia ya no conoce al hombre detrás.</p>
      </li>
      <li>
        <p class="pain__title">Lo tienes todo y queda algo sin decir.</p>
        <p>Las historias más importantes (los fracasos, las pérdidas, los quiebres) nunca las has contado. Exactamente las que el mundo necesita escuchar.</p>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
@use '@/styles/mixins' as *;

.pain {
  display: flex;
  flex-direction: column;
  gap: $space-2xl;

  &__list {
    display: grid;
    grid-template-columns: 1fr;
    gap: $space-md;

    @include respond-to(md) { grid-template-columns: repeat(2, 1fr); gap: $space-lg; }
    @include respond-to(lg) { grid-template-columns: repeat(3, 1fr); }

    & > li {
      background: $color-ivory;
      border: 1px solid $color-mist;
      border-radius: $radius-md;
      padding: $space-lg;
      display: flex;
      flex-direction: column;
      gap: $space-sm;
    }
  }

  &__title {
    font-family: $font-heading;
    font-size: $fs-xl;
    color: $color-ink;
    line-height: $lh-snug;
  }
}
</style>
