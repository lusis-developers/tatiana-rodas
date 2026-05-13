<script setup lang="ts">
import { ref } from 'vue'
import type { FaqItem } from '@/types/content'

interface Props {
  items: FaqItem[]
  multiple?: boolean
}
const props = withDefaults(defineProps<Props>(), { multiple: false })

const openIds = ref<Set<string>>(new Set())

const isOpen = (id: string) => openIds.value.has(id)

const toggle = (id: string) => {
  if (openIds.value.has(id)) {
    openIds.value.delete(id)
  } else {
    if (!props.multiple) openIds.value.clear()
    openIds.value.add(id)
  }
  // trigger reactivity (Set mutation)
  openIds.value = new Set(openIds.value)
}
</script>

<template>
  <ul class="faq">
    <li v-for="item in items" :key="item.id" class="faq__item" :class="{ 'faq__item--open': isOpen(item.id) }">
      <h3 class="faq__heading">
        <button
          type="button"
          class="faq__summary"
          :aria-expanded="isOpen(item.id)"
          :aria-controls="`faq-panel-${item.id}`"
          :id="`faq-trigger-${item.id}`"
          @click="toggle(item.id)"
        >
          <span class="faq__question">{{ item.question }}</span>
          <span class="faq__icon" aria-hidden="true" />
        </button>
      </h3>
      <div
        class="faq__panel"
        :id="`faq-panel-${item.id}`"
        role="region"
        :aria-labelledby="`faq-trigger-${item.id}`"
        :aria-hidden="!isOpen(item.id)"
      >
        <div class="faq__panel-inner">
          <p>{{ item.answer }}</p>
        </div>
      </div>
    </li>
  </ul>
</template>

<style scoped lang="scss">
@use '@/styles/mixins' as *;

.faq {
  display: flex;
  flex-direction: column;
  gap: $space-sm;

  &__item {
    background: $color-paper;
    border: 1px solid $color-mist;
    border-radius: $radius-md;
    overflow: hidden;
    transition:
      box-shadow $dur-base $ease-out-soft,
      border-color $dur-base $ease-out-soft,
      background-color $dur-base $ease-out-soft;

    &--open {
      box-shadow: $shadow-md;
      border-color: $color-terracotta-soft;
      background: $color-ivory;
    }
  }

  &__heading { margin: 0; }

  &__summary {
    width: 100%;
    cursor: pointer;
    padding: $space-md $space-lg;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: $space-md;
    font-family: $font-heading;
    font-size: $fs-xl;
    color: $color-ink;
    line-height: $lh-snug;
    text-align: left;
    background: transparent;
    border: 0;
    transition: color $dur-fast $ease-in-out;

    &:hover { color: $color-terracotta; }
    &:focus-visible {
      outline: none;
      box-shadow: $shadow-focus;
      border-radius: $radius-sm;
    }
  }

  &__question { flex: 1; }

  &__icon {
    position: relative;
    width: 18px;
    height: 18px;
    flex: 0 0 18px;

    &::before, &::after {
      content: '';
      position: absolute;
      background: currentColor;
      transition: transform $dur-base $ease-out-soft;
    }
    &::before { top: 8px; left: 0; right: 0; height: 2px; }
    &::after  { left: 8px; top: 0; bottom: 0; width: 2px; }
  }

  &__item--open &__icon::after { transform: scaleY(0); }
  &__item--open &__summary { color: $color-terracotta; }

  // Grid-row trick for height: 0 → auto animation.
  &__panel {
    display: grid;
    grid-template-rows: 0fr;
    transition: grid-template-rows $dur-base $ease-out-soft;

    @include reduced-motion { transition: none; }
  }

  &__item--open &__panel { grid-template-rows: 1fr; }

  &__panel-inner {
    overflow: hidden;
    min-height: 0;
  }

  &__panel-inner > p {
    padding: 0 $space-lg $space-md;
    color: $color-charcoal;
    line-height: $lh-relaxed;
    max-width: 65ch;
    opacity: 0;
    transform: translateY(-4px);
    transition:
      opacity $dur-slow $ease-out-soft,
      transform $dur-slow $ease-out-soft;
    transition-delay: 50ms;

    @include reduced-motion { opacity: 1; transform: none; transition: none; }
  }

  &__item--open &__panel-inner > p {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
