<script setup lang="ts">
import { ref } from 'vue'
import { useGsapReveal, type RevealVariant } from '@/composables/useGsap'

interface Props {
  variant?: RevealVariant
  delay?: number
  duration?: number
  stagger?: number
  start?: string
  scrub?: boolean | number
  once?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  variant: 'fade-up',
  delay: 0,
  duration: 0.9,
  stagger: 0.12,
  start: 'top 82%',
  scrub: false,
  once: true,
})

const root = ref<HTMLElement | null>(null)
useGsapReveal(root, {
  variant: props.variant,
  delay: props.delay,
  duration: props.duration,
  stagger: props.stagger,
  start: props.start,
  scrub: props.scrub,
  once: props.once,
})
</script>

<template>
  <div ref="root" data-reveal><slot /></div>
</template>
