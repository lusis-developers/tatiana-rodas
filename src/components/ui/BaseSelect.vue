<script setup lang="ts">
interface Option {
  value: string
  label: string
}
interface Props {
  modelValue: string
  options: Option[]
  id?: string
  placeholder?: string
  describedBy?: string
  invalid?: boolean
  disabled?: boolean
}
withDefaults(defineProps<Props>(), { invalid: false, disabled: false })
defineEmits<{ 'update:modelValue': [v: string]; blur: [e: FocusEvent] }>()
</script>

<template>
  <div class="select" :class="{ 'select--invalid': invalid }">
    <select
      :id="id"
      :value="modelValue"
      :aria-describedby="describedBy"
      :aria-invalid="invalid || undefined"
      :disabled="disabled"
      @change="$emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
      @blur="$emit('blur', $event)"
    >
      <option v-if="placeholder" value="" disabled>{{ placeholder }}</option>
      <option v-for="opt in options" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
    </select>
  </div>
</template>

<style scoped lang="scss">
.select {
  position: relative;

  & > select {
    width: 100%;
    padding: $space-xs $space-xl $space-xs $space-sm;
    background: $color-paper;
    border: 1px solid $color-mist;
    border-radius: $radius-md;
    font-size: $fs-base;
    color: $color-ink;
    appearance: none;
    cursor: pointer;
    transition: $transition-color, border-color $dur-fast $ease-in-out;

    &:hover:not(:disabled) { border-color: $color-stone-soft; }
    &:focus-visible {
      border-color: $color-terracotta;
      outline: none;
      box-shadow: $shadow-focus;
    }
    &:disabled {
      background: $color-cream-deep;
      cursor: not-allowed;
    }
  }

  &::after {
    content: '';
    position: absolute;
    right: $space-sm;
    top: 50%;
    width: 8px;
    height: 8px;
    border-right: 2px solid $color-charcoal;
    border-bottom: 2px solid $color-charcoal;
    transform: translateY(-75%) rotate(45deg);
    pointer-events: none;
  }

  &--invalid > select {
    border-color: $color-error;
    &:focus-visible { box-shadow: 0 0 0 3px rgba(184, 58, 46, 0.25); }
  }
}
</style>
