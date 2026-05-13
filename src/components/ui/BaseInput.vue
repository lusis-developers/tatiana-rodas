<script setup lang="ts">
interface Props {
  modelValue: string
  id?: string
  type?: string
  placeholder?: string
  autocomplete?: string
  inputmode?: 'text' | 'tel' | 'email' | 'numeric' | 'decimal' | 'url' | 'search'
  describedBy?: string
  invalid?: boolean
  disabled?: boolean
  maxlength?: number
}
withDefaults(defineProps<Props>(), { type: 'text', invalid: false, disabled: false })
defineEmits<{ 'update:modelValue': [v: string]; blur: [e: FocusEvent] }>()
</script>

<template>
  <input
    class="input"
    :class="{ 'input--invalid': invalid }"
    :id="id"
    :type="type"
    :value="modelValue"
    :placeholder="placeholder"
    :autocomplete="autocomplete"
    :inputmode="inputmode"
    :aria-describedby="describedBy"
    :aria-invalid="invalid || undefined"
    :disabled="disabled"
    :maxlength="maxlength"
    @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    @blur="$emit('blur', $event)"
  />
</template>

<style scoped lang="scss">
.input {
  width: 100%;
  padding: $space-xs $space-sm;
  background: $color-paper;
  border: 1px solid $color-mist;
  border-radius: $radius-md;
  font-size: $fs-base;
  color: $color-ink;
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

  &:disabled {
    background: $color-cream-deep;
    cursor: not-allowed;
  }
}
</style>
