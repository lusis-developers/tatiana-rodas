<script setup lang="ts">
import { X, Check } from 'lucide-vue-next'

interface Props {
  offItems: string[]
  onItems: string[]
  title?: string
}
defineProps<Props>()
</script>

<template>
  <div class="ba">
    <h3 v-if="title" class="ba__title">{{ title }}</h3>
    <div class="ba__grid">
      <div class="ba__col ba__col--off">
        <p class="ba__head">OFF — Hoy</p>
        <ul>
          <li v-for="(item, i) in offItems" :key="i"><X :size="16" /> <span>{{ item }}</span></li>
        </ul>
      </div>
      <div class="ba__col ba__col--on">
        <p class="ba__head">ON — En 90 días</p>
        <ul>
          <li v-for="(item, i) in onItems" :key="i"><Check :size="16" /> <span>{{ item }}</span></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/styles/mixins' as *;

.ba {
  &__title {
    text-align: center;
    margin-bottom: $space-xl;
  }

  &__grid {
    display: grid;
    gap: $space-md;
    grid-template-columns: 1fr;
    @include respond-to(md) { grid-template-columns: 1fr 1fr; gap: $space-lg; }
  }

  &__col {
    border-radius: $radius-lg;
    padding: $space-lg;
    background: $color-ivory;
    border: 1px solid $color-mist;

    & ul { display: flex; flex-direction: column; gap: $space-sm; }
    & li {
      display: flex;
      gap: $space-2xs;
      align-items: flex-start;
      color: $color-charcoal;
      line-height: $lh-snug;
      & > svg { flex: 0 0 16px; margin-top: 0.2em; }
    }
  }

  &__head {
    font-family: $font-body;
    font-size: $fs-xs;
    letter-spacing: $tracking-wide;
    text-transform: uppercase;
    font-weight: 600;
    margin-bottom: $space-md;
  }

  &__col--off { & .ba__head { color: $color-stone; } & svg { color: $color-stone; } }
  &__col--on  {
    background: linear-gradient(180deg, $color-cream-deep 0%, $color-ivory 100%);
    border-color: $color-terracotta-soft;
    & .ba__head { color: $color-terracotta; }
    & svg { color: $color-terracotta; }
  }
}
</style>
