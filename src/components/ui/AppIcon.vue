<script setup lang="ts">
import type { Component } from 'vue'

interface Props {
  icon: Component
  size?: number
  strokeWidth?: number
  label?: string
}
const props = withDefaults(defineProps<Props>(), {
  size: 20,
  strokeWidth: 1.5,
})
</script>

<template>
  <span class="icon" :aria-hidden="props.label ? undefined : 'true'" :aria-label="props.label">
    <component :is="props.icon" :size="props.size" :stroke-width="props.strokeWidth" />
  </span>
</template>

<style scoped lang="scss">
.icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  line-height: 0;
  color: inherit;
}
</style>
