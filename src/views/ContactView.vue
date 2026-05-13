<script setup lang="ts">
import seatedSet from '@/assets/images/portraits/tatiana-seated-tan.jpg?w=480;768;1200&format=avif;webp;jpg&as=picture'
import { ref } from 'vue'

import HeroSection from '@/components/sections/HeroSection.vue'
import FaqAccordion from '@/components/sections/FaqAccordion.vue'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import AppContainer from '@/components/ui/AppContainer.vue'
import AppImage from '@/components/ui/AppImage.vue'
import BaseTag from '@/components/ui/BaseTag.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseField from '@/components/ui/BaseField.vue'
import BaseInput from '@/components/ui/BaseInput.vue'
import BaseTextarea from '@/components/ui/BaseTextarea.vue'
import { MessageCircle, Mail } from 'lucide-vue-next'

import { whatsappLink } from '@/utils/format'
import { postJson } from '@/utils/http'
import { useSeoMeta } from '@/composables/useSeoMeta'
import { contactMeta } from '@/data/seo'

useSeoMeta(contactMeta)

const waNumber = import.meta.env.VITE_WHATSAPP_NUMBER
const emailAddr = import.meta.env.VITE_CONTACT_EMAIL
const webhook = import.meta.env.VITE_LEADS_WEBHOOK_URL

const form = ref({ name: '', email: '', message: '', companyWebsite: '' })
const status = ref<'idle' | 'submitting' | 'success' | 'error'>('idle')

const onSubmit = async () => {
  if (form.value.companyWebsite) { status.value = 'success'; return }
  if (!webhook) { status.value = 'error'; return }

  status.value = 'submitting'
  try {
    await postJson(webhook, {
      firstName: form.value.name.split(' ')[0] ?? form.value.name,
      lastName: form.value.name.split(' ').slice(1).join(' '),
      email: form.value.email.trim().toLowerCase(),
      phone: '',
      customField: {
        role: '',
        yearsOfCareer: '',
        currentChallenge: form.value.message,
        investmentRange: '',
        preferredChannel: 'email',
        qualifies: false,
        source: 'contact-form',
        pageUrl: window.location.href,
        referrer: document.referrer,
      },
      tags: ['contact-form'],
      consent: { granted: true, timestamp: new Date().toISOString() },
    })
    status.value = 'success'
    form.value = { name: '', email: '', message: '', companyWebsite: '' }
  } catch {
    status.value = 'error'
  }
}

const miniFaq = [
  {
    id: 'aplicar-vs-contactar',
    question: '¿Debo aplicar al programa o escribir aquí?',
    answer:
      'Si tu intención es entrar al programa Del OFF al ON, aplica directamente: el proceso es por aplicación. Para cualquier otra pregunta, escríbenos por WhatsApp o este formulario.',
  },
  {
    id: 'tiempo-respuesta',
    question: '¿Cuánto tarda la respuesta?',
    answer: 'Respondemos en menos de 24 horas hábiles.',
  },
]
</script>

<template>
  <HeroSection variant="minimal" :has-media="false">
    <template #eyebrow><BaseTag>Contacto</BaseTag></template>
    <template #title><h1>Hablemos.</h1></template>
    <template #lead>
      <p class="lead">WhatsApp para conversaciones rápidas. Email para temas largos. Respuesta en menos de 24 horas.</p>
    </template>
  </HeroSection>

  <section class="section u-section">
    <AppContainer>
      <div class="grid">
        <div class="grid__col">
          <ul class="channels">
            <li v-if="waNumber">
              <a :href="whatsappLink(waNumber, 'Hola Tatiana, escribo desde la web.')" target="_blank" rel="noopener noreferrer">
                <MessageCircle :size="22" />
                <span>
                  <strong>WhatsApp</strong>
                  <em>+{{ waNumber }}</em>
                </span>
              </a>
            </li>
            <li v-if="emailAddr">
              <a :href="`mailto:${emailAddr}`">
                <Mail :size="22" />
                <span>
                  <strong>Email</strong>
                  <em>{{ emailAddr }}</em>
                </span>
              </a>
            </li>
          </ul>

          <form class="form" novalidate @submit.prevent="onSubmit">
            <h3>O escríbenos aquí</h3>
            <div class="form__honeypot" aria-hidden="true">
              <label for="cw">No completar</label>
              <input id="cw" type="text" tabindex="-1" autocomplete="off" v-model="form.companyWebsite" />
            </div>

            <BaseField label="Nombre" required>
              <template #default="{ fieldId }">
                <BaseInput v-model="form.name" :id="fieldId" autocomplete="name" />
              </template>
            </BaseField>
            <BaseField label="Email" required>
              <template #default="{ fieldId }">
                <BaseInput v-model="form.email" :id="fieldId" type="email" autocomplete="email" />
              </template>
            </BaseField>
            <BaseField label="Mensaje" required>
              <template #default="{ fieldId }">
                <BaseTextarea v-model="form.message" :id="fieldId" :rows="5" :maxlength="800" />
              </template>
            </BaseField>

            <BaseButton type="submit" variant="primary" size="lg" :loading="status === 'submitting'">
              Enviar mensaje
            </BaseButton>

            <p v-if="status === 'success'" class="form__success" role="status">Recibido. Te respondemos pronto.</p>
            <p v-if="status === 'error'" class="form__error" role="alert">No pudimos enviar. Prueba por WhatsApp.</p>
          </form>
        </div>

        <aside class="grid__media">
          <AppImage :picture="seatedSet" alt="Tatiana Rodas, retrato cálido" aspect="4/5" rounded />
        </aside>
      </div>
    </AppContainer>
  </section>

  <section class="section u-section section--ivory">
    <AppContainer size="narrow">
      <SectionHeading eyebrow="Preguntas frecuentes" title="Antes de escribir." align="center" />
      <div class="section__body"><FaqAccordion :items="miniFaq" /></div>
    </AppContainer>
  </section>
</template>

<style scoped lang="scss">
@use '@/styles/mixins' as *;

.section {
  &--ivory { background: $color-ivory; }
  &__body  { margin-top: $space-xl; }
}

.grid {
  display: grid;
  gap: $space-2xl;
  @include respond-to(lg) { grid-template-columns: 1.3fr 1fr; gap: $space-3xl; align-items: start; }
}

.channels {
  display: flex;
  flex-direction: column;
  gap: $space-sm;
  margin-bottom: $space-2xl;

  & a {
    display: flex;
    align-items: center;
    gap: $space-sm;
    padding: $space-md $space-lg;
    background: $color-ivory;
    border: 1px solid $color-mist;
    border-radius: $radius-md;
    color: $color-ink;
    transition: $transition-base;

    &:hover { border-color: $color-terracotta; transform: translateX(2px); }

    & span { display: flex; flex-direction: column; }
    & strong { font-family: $font-heading; font-size: $fs-lg; }
    & em { font-style: normal; color: $color-stone; font-size: $fs-sm; }
  }
}

.form {
  display: flex;
  flex-direction: column;
  gap: $space-md;
  padding: $space-lg;
  background: $color-paper;
  border: 1px solid $color-mist;
  border-radius: $radius-lg;

  & h3 { font-size: $fs-xl; }
  &__honeypot { @include visually-hidden; }
  &__success { color: $color-success; font-size: $fs-sm; }
  &__error { color: $color-error; font-size: $fs-sm; }
}
</style>
