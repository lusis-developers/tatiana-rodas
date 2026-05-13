<script setup lang="ts">
import { computed } from 'vue'
import type { RouteLocationRaw } from 'vue-router'

interface Props {
  to?: RouteLocationRaw
  href?: string
  external?: boolean
}
const props = defineProps<Props>()

const isExternal = computed(() => {
  if (props.external !== undefined) return props.external
  if (props.href) return /^(https?:|mailto:|tel:|wa\.me)/.test(props.href)
  return false
})
</script>

<template>
  <router-link v-if="props.to" :to="props.to"><slot /></router-link>
  <a
    v-else-if="props.href"
    :href="props.href"
    :target="isExternal ? '_blank' : undefined"
    :rel="isExternal ? 'noopener noreferrer' : undefined"
  >
    <slot />
  </a>
  <span v-else><slot /></span>
</template>
