<script setup lang="ts">
import { computed } from 'vue'
import type { RouteLocationRaw } from 'vue-router'

interface Props {
  variant?: 'primary' | 'ghost' | 'gold' | 'link'
  size?: 'sm' | 'md' | 'lg'
  to?: RouteLocationRaw
  href?: string
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  loading?: boolean
  fullWidth?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  type: 'button',
  disabled: false,
  loading: false,
  fullWidth: false,
})
defineEmits<{ click: [e: MouseEvent] }>()

const isExternal = computed(() => !!props.href && /^(https?:|mailto:|tel:|wa\.me)/.test(props.href))
const tag = computed<'router-link' | 'a' | 'button'>(() => {
  if (props.to) return 'router-link'
  if (props.href) return 'a'
  return 'button'
})
</script>

<template>
  <component
    :is="tag"
    class="btn"
    :class="[`btn--${props.variant}`, `btn--${props.size}`, { 'btn--block': props.fullWidth, 'is-loading': props.loading, 'is-disabled': props.disabled }]"
    :to="props.to"
    :href="props.href"
    :type="tag === 'button' ? props.type : undefined"
    :disabled="tag === 'button' ? (props.disabled || props.loading) : undefined"
    :target="isExternal ? '_blank' : undefined"
    :rel="isExternal ? 'noopener noreferrer' : undefined"
    :aria-busy="props.loading || undefined"
    @click="$emit('click', $event)"
  >
    <span class="btn__label"><slot /></span>
    <span v-if="props.loading" class="btn__spinner" aria-hidden="true" />
  </component>
</template>

<style scoped lang="scss">
@use '@/styles/mixins' as *;

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: $space-2xs;
  font-family: $font-body;
  font-weight: 600;
  letter-spacing: 0.02em;
  border-radius: $radius-pill;
  cursor: pointer;
  text-decoration: none;
  transition: $transition-base;
  border: 1px solid transparent;
  white-space: nowrap;

  &:disabled, &.is-disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &--sm { padding: $space-2xs $space-md; font-size: $fs-sm; }
  &--md { padding: $space-xs $space-lg; font-size: $fs-base; }
  &--lg { padding: $space-sm $space-xl; font-size: $fs-lg; }

  &--block { width: 100%; }

  &--primary {
    background: $color-terracotta;
    color: $color-paper;
    &:hover:not(.is-disabled) { background: $color-terracotta-deep; transform: translateY(-1px); }
  }

  &--gold {
    background: $color-gold;
    color: $color-paper;
    &:hover:not(.is-disabled) { background: darken($color-gold, 8%); transform: translateY(-1px); }
  }

  &--ghost {
    background: transparent;
    color: $color-ink;
    border-color: $color-ink;
    &:hover:not(.is-disabled) { background: $color-ink; color: $color-paper; }
  }

  &--link {
    background: transparent;
    color: $color-terracotta;
    padding-inline: 0;
    border-radius: 0;
    border-bottom: 1px solid currentColor;
    &:hover:not(.is-disabled) { color: $color-terracotta-deep; }
  }

  &__spinner {
    width: 1em; height: 1em;
    border: 2px solid currentColor;
    border-top-color: transparent;
    border-radius: 50%;
    animation: spin .8s linear infinite;
  }

  @keyframes spin { to { transform: rotate(360deg); } }
}
</style>
