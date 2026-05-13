<script setup lang="ts">
import { ref } from 'vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import { postJson } from '@/utils/http'

const email = ref('')
const companyWebsite = ref('')
const status = ref<'idle' | 'submitting' | 'success' | 'error'>('idle')
const webhook = import.meta.env.VITE_LEADS_WEBHOOK_URL

const onSubmit = async () => {
  if (companyWebsite.value) { status.value = 'success'; return }
  if (!email.value.trim()) return
  if (!webhook) { status.value = 'error'; return }

  status.value = 'submitting'
  try {
    await postJson(webhook, {
      firstName: '',
      lastName: '',
      email: email.value.trim().toLowerCase(),
      phone: '',
      customField: {
        role: '', yearsOfCareer: '', currentChallenge: '',
        investmentRange: '', preferredChannel: 'email',
        qualifies: false, source: 'contact-form',
        pageUrl: window.location.href, referrer: document.referrer,
      },
      tags: ['newsletter'],
      consent: { granted: true, timestamp: new Date().toISOString() },
    })
    status.value = 'success'
    email.value = ''
  } catch {
    status.value = 'error'
  }
}
</script>

<template>
  <aside class="newsletter">
    <div class="newsletter__copy">
      <p class="newsletter__eyebrow">Newsletter</p>
      <h3>La voz que callabas, en tu inbox.</h3>
      <p>Cartas cortas sobre voz, presencia y liderazgo auténtico. Una por semana. Cancela cuando quieras.</p>
    </div>
    <form class="newsletter__form" novalidate @submit.prevent="onSubmit">
      <label for="nl-email" class="u-visually-hidden">Email</label>
      <input
        id="nl-email"
        type="email"
        v-model="email"
        autocomplete="email"
        placeholder="tu@email.com"
        required
        class="newsletter__input"
      />
      <input v-model="companyWebsite" type="text" tabindex="-1" autocomplete="off" aria-hidden="true" class="newsletter__hp" />
      <BaseButton type="submit" variant="gold" :loading="status === 'submitting'">
        Suscribirme
      </BaseButton>
    </form>
    <p v-if="status === 'success'" class="newsletter__msg newsletter__msg--ok" role="status">¡Listo! Revisa tu inbox.</p>
    <p v-if="status === 'error'" class="newsletter__msg newsletter__msg--err" role="alert">No pudimos suscribirte ahora.</p>
  </aside>
</template>

<style scoped lang="scss">
@use '@/styles/mixins' as *;

.newsletter {
  display: grid;
  gap: $space-lg;
  padding: $space-2xl;
  background: $color-ink;
  color: $color-paper;
  border-radius: $radius-lg;

  @include respond-to(md) { grid-template-columns: 1.4fr 1fr; align-items: center; gap: $space-2xl; padding: $space-3xl; }

  &__eyebrow {
    font-size: $fs-xs;
    letter-spacing: $tracking-wide;
    text-transform: uppercase;
    color: $color-gold-soft;
    margin-bottom: $space-2xs;
  }

  &__copy {
    & h3 {
      color: $color-paper;
      font-size: $fs-3xl;
      line-height: $lh-tight;
      margin-bottom: $space-xs;
    }
    & p { color: $color-mist; max-width: 40ch; }
  }

  &__form {
    display: flex;
    flex-direction: column;
    gap: $space-sm;
    @include respond-to(sm) { flex-direction: row; }
  }

  &__input {
    flex: 1;
    padding: $space-sm $space-md;
    background: $color-paper;
    border: 1px solid transparent;
    border-radius: $radius-pill;
    color: $color-ink;
    font-size: $fs-base;
    min-width: 0;
    &:focus-visible {
      outline: none;
      box-shadow: $shadow-focus;
      border-color: $color-terracotta;
    }
  }

  &__hp { position: absolute; left: -9999px; opacity: 0; }

  &__msg {
    grid-column: 1 / -1;
    font-size: $fs-sm;
    &--ok  { color: $color-gold-soft; }
    &--err { color: $color-terracotta-soft; }
  }
}
</style>
