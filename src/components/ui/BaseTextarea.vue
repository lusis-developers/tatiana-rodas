<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  modelValue: string
  id?: string
  placeholder?: string
  rows?: number
  maxlength?: number
  describedBy?: string
  invalid?: boolean
  disabled?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  rows: 5,
  invalid: false,
  disabled: false,
})
defineEmits<{ 'update:modelValue': [v: string]; blur: [e: FocusEvent] }>()

const remaining = computed(() =>
  props.maxlength ? props.maxlength - (props.modelValue?.length ?? 0) : null,
)
</script>

<template>
  <div class="textarea-wrap">
    <textarea
      class="textarea"
      :class="{ 'textarea--invalid': invalid }"
      :id="id"
      :rows="rows"
      :placeholder="placeholder"
      :maxlength="maxlength"
      :value="modelValue"
      :aria-describedby="describedBy"
      :aria-invalid="invalid || undefined"
      :disabled="disabled"
      @input="$emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
      @blur="$emit('blur', $event)"
    />
    <p v-if="maxlength" class="textarea__counter">{{ remaining }} restantes</p>
  </div>
</template>

<style scoped lang="scss">
.textarea-wrap {
  display: flex;
  flex-direction: column;
  gap: $space-3xs;
}
.textarea {
  width: 100%;
  padding: $space-xs $space-sm;
  background: $color-paper;
  border: 1px solid $color-mist;
  border-radius: $radius-md;
  font-size: $fs-base;
  color: $color-ink;
  font-family: inherit;
  resize: vertical;
  min-height: 8rem;
  transition: $transition-color, border-color $dur-fast $ease-in-out;

  &::placeholder { color: $color-stone-soft; }
  &:hover:not(:disabled) { border-color: $color-stone-soft; }
  &:focus-visible {
    border-color: $color-terracotta;
    outline: none;
    box-shadow: $shadow-focus;
  }
  &--invalid {
    border-color: $color-error;
    &:focus-visible { box-shadow: 0 0 0 3px rgba(184, 58, 46, 0.25); }
  }
  &:disabled { background: $color-cream-deep; cursor: not-allowed; }

  &__counter {
    align-self: flex-end;
    font-size: $fs-xs;
    color: $color-stone;
  }
}
</style>
