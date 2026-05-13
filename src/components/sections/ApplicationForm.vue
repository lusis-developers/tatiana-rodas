<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useLeadStore } from '@/stores/lead.store'
import { useLeadSubmission } from '@/composables/useLeadSubmission'
import { countries } from '@/data/countries'
import { required, email, minLength, maxLength, phoneDigits, trueValue, runRules } from '@/utils/validation'
import type { LeadFormDraft } from '@/types/lead'

import BaseField from '@/components/ui/BaseField.vue'
import BaseInput from '@/components/ui/BaseInput.vue'
import BaseSelect from '@/components/ui/BaseSelect.vue'
import BaseTextarea from '@/components/ui/BaseTextarea.vue'
import BaseCheckbox from '@/components/ui/BaseCheckbox.vue'
import BaseButton from '@/components/ui/BaseButton.vue'

const store = useLeadStore()
const { draft, qualifies, submissionState, lastError } = storeToRefs(store)
const { submit } = useLeadSubmission()
const router = useRouter()

const countryOptions = computed(() =>
  countries.map((c) => ({ value: c.dial, label: `${c.name} (${c.dial})` })),
)

const yearsOptions = [
  { value: '0-2', label: 'Menos de 3 años' },
  { value: '3-5', label: '3 – 5 años' },
  { value: '6-10', label: '6 – 10 años' },
  { value: '10-20', label: '10 – 20 años' },
  { value: '20+', label: 'Más de 20 años' },
]

const investmentOptions = [
  { value: '<500', label: 'Menos de 500 USD' },
  { value: '500-1500', label: '500 – 1.500 USD' },
  { value: '1500-3500', label: '1.500 – 3.500 USD' },
  { value: '3500-7000', label: '3.500 – 7.000 USD' },
  { value: '>7000', label: 'Más de 7.000 USD' },
]

const channelOptions = [
  { value: 'whatsapp', label: 'WhatsApp' },
  { value: 'email', label: 'Email' },
  { value: 'llamada', label: 'Llamada telefónica' },
]

type FieldKey = keyof LeadFormDraft
const errors = reactive<Record<FieldKey, string | null>>({
  firstName: null, lastName: null, email: null, countryCode: null, phone: null,
  role: null, company: null, yearsOfCareer: null, currentChallenge: null,
  investmentRange: null, preferredChannel: null, preferredTime: null,
  consent: null, companyWebsite: null,
})

const rules: Partial<Record<FieldKey, ((v: any) => string | null)[]>> = {
  firstName: [required, minLength(2)],
  lastName: [required, minLength(2)],
  email: [required, email],
  countryCode: [required],
  phone: [required, phoneDigits],
  role: [required, minLength(2)],
  yearsOfCareer: [required],
  currentChallenge: [required, minLength(40), maxLength(600)],
  investmentRange: [required],
  preferredChannel: [required],
  consent: [trueValue],
}

const validateField = (key: FieldKey) => {
  const list = rules[key]
  if (!list) return
  errors[key] = runRules(draft.value[key], list)
}

const validateAll = (): boolean => {
  let ok = true
  ;(Object.keys(rules) as FieldKey[]).forEach((k) => {
    validateField(k)
    if (errors[k]) ok = false
  })
  return ok
}

const announce = ref('')

const onSubmit = async () => {
  if (!validateAll()) {
    announce.value = 'Revisa los campos marcados antes de continuar.'
    return
  }
  announce.value = ''
  try {
    await submit({ source: 'apply-form' })
    // Redirección a estado de éxito.
    router.replace({ path: '/aplicar', query: { status: 'success', q: qualifies.value ? '1' : '0' } })
  } catch {
    announce.value = 'No pudimos enviar tu aplicación. Inténtalo de nuevo.'
  }
}
</script>

<template>
  <form class="apply-form" novalidate @submit.prevent="onSubmit">
    <!-- Honeypot — debe permanecer vacío -->
    <div class="apply-form__honeypot" aria-hidden="true">
      <label for="company_website">No completar</label>
      <input
        id="company_website"
        type="text"
        tabindex="-1"
        autocomplete="off"
        :value="draft.companyWebsite"
        @input="draft.companyWebsite = ($event.target as HTMLInputElement).value"
      />
    </div>

    <div class="apply-form__grid">
      <BaseField label="Nombre" required>
        <template #default="{ fieldId, describedBy, invalid }">
          <BaseInput
            v-model="draft.firstName"
            :id="fieldId"
            :described-by="describedBy"
            :invalid="invalid"
            autocomplete="given-name"
            @blur="validateField('firstName')"
          />
        </template>
      </BaseField>

      <BaseField label="Apellido" required :error="errors.lastName">
        <template #default="{ fieldId, describedBy, invalid }">
          <BaseInput
            v-model="draft.lastName"
            :id="fieldId"
            :described-by="describedBy"
            :invalid="invalid"
            autocomplete="family-name"
            @blur="validateField('lastName')"
          />
        </template>
      </BaseField>

      <BaseField label="Email" required :error="errors.email">
        <template #default="{ fieldId, describedBy, invalid }">
          <BaseInput
            v-model="draft.email"
            :id="fieldId"
            :described-by="describedBy"
            :invalid="invalid"
            type="email"
            autocomplete="email"
            inputmode="email"
            @blur="validateField('email')"
          />
        </template>
      </BaseField>

      <BaseField label="País" required :error="errors.countryCode">
        <template #default="{ fieldId, describedBy, invalid }">
          <BaseSelect
            v-model="draft.countryCode"
            :id="fieldId"
            :described-by="describedBy"
            :invalid="invalid"
            :options="countryOptions"
            placeholder="Selecciona tu país"
            @blur="validateField('countryCode')"
          />
        </template>
      </BaseField>

      <BaseField label="WhatsApp" required hint="Solo dígitos — agregamos el prefijo de país automáticamente." :error="errors.phone">
        <template #default="{ fieldId, describedBy, invalid }">
          <BaseInput
            v-model="draft.phone"
            :id="fieldId"
            :described-by="describedBy"
            :invalid="invalid"
            type="tel"
            inputmode="tel"
            autocomplete="tel-national"
            @blur="validateField('phone')"
          />
        </template>
      </BaseField>

      <BaseField label="Cargo o rol" required :error="errors.role">
        <template #default="{ fieldId, describedBy, invalid }">
          <BaseInput
            v-model="draft.role"
            :id="fieldId"
            :described-by="describedBy"
            :invalid="invalid"
            autocomplete="organization-title"
            @blur="validateField('role')"
          />
        </template>
      </BaseField>

      <BaseField label="Empresa (opcional)">
        <template #default="{ fieldId }">
          <BaseInput v-model="draft.company" :id="fieldId" autocomplete="organization" />
        </template>
      </BaseField>

      <BaseField label="Años en tu rol actual" required :error="errors.yearsOfCareer">
        <template #default="{ fieldId, describedBy, invalid }">
          <BaseSelect
            v-model="draft.yearsOfCareer"
            :id="fieldId"
            :described-by="describedBy"
            :invalid="invalid"
            :options="yearsOptions"
            placeholder="Selecciona un rango"
            @blur="validateField('yearsOfCareer')"
          />
        </template>
      </BaseField>
    </div>

    <BaseField
      label="¿Cuál es tu mayor desafío actual al hablar en público o liderar comunicacionalmente?"
      required
      :error="errors.currentChallenge"
      hint="Sé concreto: cuándo se cierra el pecho, qué evitas decir, qué historia llevas años sin contar."
    >
      <template #default="{ fieldId, describedBy, invalid }">
        <BaseTextarea
          v-model="draft.currentChallenge"
          :id="fieldId"
          :described-by="describedBy"
          :invalid="invalid"
          :rows="5"
          :maxlength="600"
          @blur="validateField('currentChallenge')"
        />
      </template>
    </BaseField>

    <div class="apply-form__grid">
      <BaseField label="Rango de inversión contemplada" required :error="errors.investmentRange">
        <template #default="{ fieldId, describedBy, invalid }">
          <BaseSelect
            v-model="draft.investmentRange"
            :id="fieldId"
            :described-by="describedBy"
            :invalid="invalid"
            :options="investmentOptions"
            placeholder="Selecciona un rango"
            @blur="validateField('investmentRange')"
          />
        </template>
      </BaseField>

      <BaseField label="Canal de contacto preferido" required :error="errors.preferredChannel">
        <template #default="{ fieldId, describedBy, invalid }">
          <BaseSelect
            v-model="draft.preferredChannel"
            :id="fieldId"
            :described-by="describedBy"
            :invalid="invalid"
            :options="channelOptions"
            placeholder="Selecciona un canal"
            @blur="validateField('preferredChannel')"
          />
        </template>
      </BaseField>

      <BaseField label="Mejor horario (zona horaria local, opcional)">
        <template #default="{ fieldId }">
          <BaseInput v-model="draft.preferredTime" :id="fieldId" placeholder="Ej: 10:00 – 13:00 (GMT-5)" />
        </template>
      </BaseField>
    </div>

    <div class="apply-form__consent">
      <BaseCheckbox v-model="draft.consent" :invalid="!!errors.consent" @blur="validateField('consent')">
        Acepto recibir respuesta al contacto que indiqué y entiendo cómo se tratarán mis datos.
      </BaseCheckbox>
      <p v-if="errors.consent" class="apply-form__error" role="alert">{{ errors.consent }}</p>
    </div>

    <div v-if="draft.investmentRange === '<500'" class="apply-form__redirect" role="status">
      <p>
        Gracias por tu interés. El programa requiere una inversión sobre 500 USD.
        Puedes seguirnos en redes y aprovechar nuestros recursos gratuitos.
        Si quieres, enviaremos igualmente tu información para mantenerte en contacto.
      </p>
    </div>

    <div class="apply-form__actions">
      <BaseButton type="submit" variant="primary" size="lg" :loading="submissionState === 'submitting'" :disabled="submissionState === 'submitting'">
        Enviar aplicación
      </BaseButton>
      <p class="apply-form__note">Respuesta en menos de 48 horas.</p>
    </div>

    <p v-if="announce" class="apply-form__announce" aria-live="polite">{{ announce }}</p>
    <p v-if="submissionState === 'error' && lastError" class="apply-form__error" role="alert">{{ lastError }}</p>
  </form>
</template>

<style scoped lang="scss">
@use '@/styles/mixins' as *;

.apply-form {
  display: flex;
  flex-direction: column;
  gap: $space-lg;
  background: $color-paper;
  border: 1px solid $color-mist;
  border-radius: $radius-lg;
  padding: $space-xl;
  box-shadow: $shadow-sm;

  @include respond-to(md) { padding: $space-2xl; }

  &__honeypot { @include visually-hidden; }

  &__grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: $space-md;

    @include respond-to(md) { grid-template-columns: 1fr 1fr; gap: $space-lg; }
  }

  &__consent {
    padding-block: $space-sm;
    border-top: 1px solid $color-mist;
  }

  &__redirect {
    padding: $space-md;
    background: rgba($color-gold, 0.08);
    border-left: 3px solid $color-gold;
    border-radius: $radius-md;
    color: $color-charcoal;
    line-height: $lh-relaxed;
  }

  &__actions {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: $space-2xs;
    margin-top: $space-sm;
  }

  &__note {
    font-size: $fs-sm;
    color: $color-stone;
  }

  &__announce, &__error {
    color: $color-error;
    font-size: $fs-sm;
    font-weight: 500;
  }
}
</style>
