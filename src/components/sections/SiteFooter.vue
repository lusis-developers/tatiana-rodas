<script setup lang="ts">
import { useNavigation } from '@/composables/useNavigation'
import { whatsappLink } from '@/utils/format'
import AppContainer from '@/components/ui/AppContainer.vue'
import AppLink from '@/components/ui/AppLink.vue'

const { footerNav } = useNavigation()
const waNumber = import.meta.env.VITE_WHATSAPP_NUMBER
const email = import.meta.env.VITE_CONTACT_EMAIL
const year = new Date().getFullYear()
</script>

<template>
  <footer class="site-footer" role="contentinfo">
    <AppContainer>
      <div class="site-footer__grid">
        <div class="site-footer__brand">
          <p class="site-footer__name">Tatiana Rodas</p>
          <p class="site-footer__claim">
            Devuelvo la voz a líderes que llegaron arriba y dejaron de hablar como ellos.
          </p>
        </div>

        <nav class="site-footer__nav" aria-label="Enlaces del sitio">
          <p class="site-footer__heading">Navegación</p>
          <ul>
            <li v-for="link in footerNav" :key="link.to">
              <router-link :to="link.to">{{ link.label }}</router-link>
            </li>
          </ul>
        </nav>

        <div class="site-footer__contact">
          <p class="site-footer__heading">Contacto</p>
          <ul>
            <li v-if="waNumber"><AppLink :href="whatsappLink(waNumber)">WhatsApp</AppLink></li>
            <li v-if="email"><AppLink :href="`mailto:${email}`">{{ email }}</AppLink></li>
          </ul>
        </div>
      </div>

      <div class="site-footer__legal">
        <p>© {{ year }} Tatiana Rodas. Todos los derechos reservados.</p>
        <p class="site-footer__credit">Hecho por <a href="https://bakano.ec" target="_blank" rel="noopener noreferrer">Bakano.ec</a></p>
      </div>
    </AppContainer>
  </footer>
</template>

<style scoped lang="scss">
@use '@/styles/mixins' as *;

.site-footer {
  background: $color-ink;
  color: $color-mist;
  padding-block: $space-3xl $space-xl;
  margin-top: $space-4xl;

  &__grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: $space-xl;

    @include respond-to(md) {
      grid-template-columns: 2fr 1fr 1fr;
      gap: $space-2xl;
    }
  }

  &__name {
    font-family: $font-heading;
    font-size: $fs-2xl;
    color: $color-paper;
    margin-bottom: $space-sm;
  }

  &__claim {
    max-width: 38ch;
    color: $color-stone-soft;
    font-size: $fs-sm;
    line-height: $lh-relaxed;
  }

  &__heading {
    font-family: $font-body;
    font-size: $fs-xs;
    font-weight: 600;
    letter-spacing: $tracking-wide;
    text-transform: uppercase;
    color: $color-gold-soft;
    margin-bottom: $space-md;
  }

  &__nav ul, &__contact ul {
    display: flex;
    flex-direction: column;
    gap: $space-2xs;

    & a {
      color: $color-mist;
      font-size: $fs-sm;
      transition: $transition-color;
      &:hover { color: $color-paper; }
    }
  }

  &__legal {
    margin-top: $space-3xl;
    padding-top: $space-lg;
    border-top: 1px solid rgba($color-mist, 0.12);
    display: flex;
    flex-direction: column;
    gap: $space-2xs;
    font-size: $fs-xs;
    color: $color-stone-soft;

    @include respond-to(md) {
      flex-direction: row;
      justify-content: space-between;
    }
  }

  &__credit a { color: $color-gold-soft; &:hover { color: $color-paper; } }
}
</style>
