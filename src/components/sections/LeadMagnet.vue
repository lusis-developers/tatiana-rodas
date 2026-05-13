<script setup lang="ts">
import { ref } from 'vue'
import { Download } from 'lucide-vue-next'
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseField from '@/components/ui/BaseField.vue'
import BaseInput from '@/components/ui/BaseInput.vue'
import BaseTag from '@/components/ui/BaseTag.vue'
import { postJson } from '@/utils/http'
import { email as emailRule, required, runRules } from '@/utils/validation'

const form = ref({ firstName: '', email: '', companyWebsite: '' })
const errors = ref<{ firstName: string | null; email: string | null }>({ firstName: null, email: null })
const status = ref<'idle' | 'submitting' | 'success' | 'error'>('idle')

const webhook = import.meta.env.VITE_LEADS_WEBHOOK_URL

const validate = () => {
  errors.value.firstName = runRules(form.value.firstName, [required])
  errors.value.email = runRules(form.value.email, [required, emailRule])
  return !errors.value.firstName && !errors.value.email
}

const onSubmit = async () => {
  if (!validate()) return
  if (form.value.companyWebsite) { status.value = 'success'; return }
  if (!webhook) { status.value = 'error'; return }

  status.value = 'submitting'
  try {
    await postJson(webhook, {
      firstName: form.value.firstName.trim(),
      lastName: '',
      email: form.value.email.trim().toLowerCase(),
      phone: '',
      customField: {
        role: '',
        yearsOfCareer: '',
        currentChallenge: '',
        investmentRange: '',
        preferredChannel: 'email',
        qualifies: false,
        source: 'contact-form',
        pageUrl: window.location.href,
        referrer: document.referrer,
      },
      tags: ['lead-magnet', 'silencio-del-exito-pdf'],
      consent: { granted: true, timestamp: new Date().toISOString() },
    })
    status.value = 'success'
  } catch {
    status.value = 'error'
  }
}
</script>

<template>
  <section class="magnet">
    <div class="magnet__copy">
      <BaseTag>Recurso gratuito</BaseTag>
      <h2>5 señales del silencio del éxito</h2>
      <p class="lead">
        El PDF gratuito que ayuda a líderes senior a identificar si llegaron arriba y dejaron de hablar como ellos.
        5 señales concretas que vives y no sabías que tenían nombre.
      </p>
      <ul class="magnet__list">
        <li>Cuándo hablas desde el rol y cuándo desde la persona.</li>
        <li>Por qué tu cuerpo se bloquea en los momentos importantes.</li>
        <li>La diferencia entre presentar resultados y contar tu historia.</li>
        <li>Qué señales detecta tu familia que tú no ves.</li>
        <li>El primer paso concreto antes de hablar en público de nuevo.</li>
      </ul>
    </div>

    <form class="magnet__form" novalidate @submit.prevent="onSubmit">
      <h3>Descarga el PDF</h3>

      <div class="magnet__honeypot" aria-hidden="true">
        <label for="lm-cw">No completar</label>
        <input id="lm-cw" type="text" tabindex="-1" autocomplete="off" v-model="form.companyWebsite" />
      </div>

      <BaseField label="Nombre" required :error="errors.firstName">
        <template #default="{ fieldId, describedBy, invalid }">
          <BaseInput v-model="form.firstName" :id="fieldId" :described-by="describedBy" :invalid="invalid" autocomplete="given-name" />
        </template>
      </BaseField>

      <BaseField label="Email" required :error="errors.email">
        <template #default="{ fieldId, describedBy, invalid }">
          <BaseInput v-model="form.email" :id="fieldId" :described-by="describedBy" :invalid="invalid" type="email" autocomplete="email" />
        </template>
      </BaseField>

      <BaseButton type="submit" variant="primary" size="lg" full-width :loading="status === 'submitting'">
        <Download :size="18" /> Recibir el PDF
      </BaseButton>

      <p v-if="status === 'success'" class="magnet__success" role="status">
        Listo. Revisa tu email — también la carpeta de spam.
      </p>
      <p v-if="status === 'error'" class="magnet__error" role="alert">
        No pudimos enviar. Escríbenos por WhatsApp.
      </p>
      <p class="magnet__legal">Sin spam. Cancela cuando quieras.</p>
    </form>
  </section>
</template>

<style scoped lang="scss">
@use '@/styles/mixins' as *;

.magnet {
  display: grid;
  gap: $space-2xl;
  padding: $space-2xl;
  background: linear-gradient(135deg, $color-cream-deep 0%, $color-ivory 100%);
  border-radius: $radius-xl;
  border: 1px solid $color-terracotta-soft;

  @include respond-to(lg) {
    grid-template-columns: 1.2fr 1fr;
    gap: $space-3xl;
    padding: $space-3xl;
  }

  &__copy {
    display: flex;
    flex-direction: column;
    gap: $space-md;

    & h2 { font-size: $fs-4xl; line-height: $lh-tight; }
  }

  &__list {
    display: flex;
    flex-direction: column;
    gap: $space-2xs;
    margin-top: $space-sm;

    & li {
      position: relative;
      padding-left: $space-md;
      color: $color-charcoal;
      line-height: $lh-relaxed;
      &::before { content: '→'; position: absolute; left: 0; color: $color-terracotta; }
    }
  }

  &__form {
    display: flex;
    flex-direction: column;
    gap: $space-md;
    padding: $space-xl;
    background: $color-paper;
    border-radius: $radius-lg;
    box-shadow: $shadow-md;

    & h3 { font-size: $fs-2xl; }
  }

  &__honeypot { @include visually-hidden; }
  &__success { color: $color-success; font-size: $fs-sm; font-weight: 500; }
  &__error   { color: $color-error;   font-size: $fs-sm; font-weight: 500; }
  &__legal   { color: $color-stone; font-size: $fs-xs; }
}
</style>
