<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import BareLayout from '@/layouts/BareLayout.vue'

const route = useRoute()
const layout = computed(() => (route.meta.layout === 'bare' ? BareLayout : DefaultLayout))
</script>

<template>
  <component :is="layout">
    <router-view />
  </component>
</template>
