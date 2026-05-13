<script setup lang="ts">
import { useId } from 'vue'

interface Props {
  modelValue: boolean
  id?: string
  describedBy?: string
  invalid?: boolean
  disabled?: boolean
}
const props = withDefaults(defineProps<Props>(), { invalid: false, disabled: false })
defineEmits<{ 'update:modelValue': [v: boolean]; blur: [e: FocusEvent] }>()

const auto = useId()
const inputId = props.id ?? `cb-${auto}`
</script>

<template>
  <label class="checkbox" :class="{ 'checkbox--invalid': invalid, 'checkbox--disabled': disabled }">
    <input
      type="checkbox"
      :id="inputId"
      :checked="modelValue"
      :aria-describedby="describedBy"
      :aria-invalid="invalid || undefined"
      :disabled="disabled"
      @change="$emit('update:modelValue', ($event.target as HTMLInputElement).checked)"
      @blur="$emit('blur', $event)"
    />
    <span class="checkbox__box" aria-hidden="true" />
    <span class="checkbox__label"><slot /></span>
  </label>
</template>

<style scoped lang="scss">
.checkbox {
  display: inline-flex;
  align-items: flex-start;
  gap: $space-2xs;
  cursor: pointer;
  font-size: $fs-sm;
  color: $color-charcoal;
  line-height: $lh-snug;

  & > input {
    position: absolute;
    opacity: 0;
    width: 1px;
    height: 1px;
  }

  &__box {
    flex: 0 0 1.125rem;
    width: 1.125rem;
    height: 1.125rem;
    margin-top: 0.15rem;
    border: 1px solid $color-stone-soft;
    border-radius: $radius-sm;
    background: $color-paper;
    transition: $transition-base;
    position: relative;

    &::after {
      content: '';
      position: absolute;
      inset: 2px;
      border-radius: 1px;
      background: $color-terracotta;
      transform: scale(0);
      transition: transform $dur-fast $ease-out-soft;
    }
  }

  & > input:checked + .checkbox__box::after { transform: scale(1); }
  & > input:focus-visible + .checkbox__box {
    box-shadow: $shadow-focus;
    border-color: $color-terracotta;
  }

  &--invalid > .checkbox__box { border-color: $color-error; }
  &--disabled { cursor: not-allowed; opacity: 0.6; }
}
</style>
