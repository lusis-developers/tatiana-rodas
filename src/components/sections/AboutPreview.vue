<script setup lang="ts">
import type { Picture } from '@/composables/useImageSet'
import AppImage from '@/components/ui/AppImage.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseTag from '@/components/ui/BaseTag.vue'

interface Props {
  picture: Picture
}
defineProps<Props>()
</script>

<template>
  <div class="about-preview">
    <div class="about-preview__media">
      <AppImage :picture="picture" alt="Tatiana Rodas, retrato profesional" aspect="4/5" rounded />
      <div class="about-preview__signature" aria-hidden="true">— Tatiana</div>
    </div>
    <div class="about-preview__copy">
      <BaseTag>Hola, soy Tatiana</BaseTag>
      <h2>Devuelvo la voz a líderes que llegaron arriba y dejaron de hablar como ellos.</h2>
      <p class="lead">
        Trabajo con empresarios y ejecutivos C-suite con 15 a 30 años de carrera. Tienen
        autoridad — pero no la <em>encarnan</em> al hablar. En 90 días recuperan tres cosas
        concretas: cuerpo presente, voz reconocible e historia que conecta.
      </p>
      <ul class="about-preview__bullets">
        <li><strong>Cuerpo presente</strong> — dejas de bloquearte en los momentos importantes.</li>
        <li><strong>Voz reconocible</strong> — la gente recuerda lo que dijiste, no solo lo que vendiste.</li>
        <li><strong>Historia que conecta</strong> — 20 años de carrera dejan de ser una lista vacía.</li>
      </ul>
      <div class="about-preview__actions">
        <BaseButton to="/sobre" variant="ghost">Conoce más sobre Tatiana</BaseButton>
        <BaseButton to="/metodo" variant="link">Ver el método →</BaseButton>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/styles/mixins' as *;

.about-preview {
  display: grid;
  gap: $space-2xl;
  align-items: center;

  @include respond-to(lg) {
    grid-template-columns: 1fr 1.2fr;
    gap: $space-3xl;
  }

  &__media {
    position: relative;
    max-width: 460px;
  }

  &__signature {
    position: absolute;
    bottom: -$space-md;
    right: -$space-sm;
    font-family: $font-quote;
    font-style: italic;
    font-size: $fs-2xl;
    color: $color-terracotta;
    background: $color-cream;
    padding: $space-2xs $space-md;
    border-radius: $radius-pill;
    box-shadow: $shadow-sm;
  }

  &__copy {
    display: flex;
    flex-direction: column;
    gap: $space-md;

    & h2 {
      font-size: $fs-4xl;
      line-height: $lh-tight;
      text-wrap: balance;
    }
    & em { font-style: italic; color: $color-terracotta; }
  }

  &__bullets {
    display: flex;
    flex-direction: column;
    gap: $space-sm;
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
        top: 0.7em;
        width: 8px;
        height: 1px;
        background: $color-terracotta;
      }
    }
  }

  &__actions {
    display: flex;
    flex-wrap: wrap;
    gap: $space-sm $space-md;
    margin-top: $space-md;
    align-items: center;
  }
}
</style>
