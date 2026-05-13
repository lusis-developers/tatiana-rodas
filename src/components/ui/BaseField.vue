<script setup lang="ts">
import { computed, useId } from 'vue'

interface Props {
  label: string
  hint?: string
  error?: string | null
  required?: boolean
  for?: string
}
const props = defineProps<Props>()

const auto = useId()
const fieldId = computed(() => props.for ?? `field-${auto}`)
const hintId = computed(() => `${fieldId.value}-hint`)
const errorId = computed(() => `${fieldId.value}-error`)
const describedBy = computed(() => {
  const ids = []
  if (props.hint) ids.push(hintId.value)
  if (props.error) ids.push(errorId.value)
  return ids.length ? ids.join(' ') : undefined
})

defineSlots<{
  default?: (props: { fieldId: string; describedBy: string | undefined; invalid: boolean }) => unknown
}>()

defineExpose({ fieldId, describedBy })
</script>

<template>
  <div class="field" :class="{ 'field--error': error }">
    <label class="field__label" :for="fieldId">
      {{ label }}
      <span v-if="required" class="field__required" aria-hidden="true">*</span>
    </label>
    <slot :fieldId="fieldId" :describedBy="describedBy" :invalid="!!error" />
    <p v-if="hint && !error" class="field__hint" :id="hintId">{{ hint }}</p>
    <p v-if="error" class="field__error" :id="errorId" role="alert">{{ error }}</p>
  </div>
</template>

<style scoped lang="scss">
.field {
  display: flex;
  flex-direction: column;
  gap: $space-2xs;

  &__label {
    font-size: $fs-sm;
    font-weight: 600;
    color: $color-ink;
  }

  &__required {
    color: $color-terracotta;
    margin-left: 0.1em;
  }

  &__hint {
    font-size: $fs-sm;
    color: $color-stone;
  }

  &__error {
    font-size: $fs-sm;
    color: $color-error;
    font-weight: 500;
  }
}
</style>
