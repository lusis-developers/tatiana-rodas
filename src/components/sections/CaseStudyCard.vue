<script setup lang="ts">
import type { CaseStudy } from '@/types/content'

interface Props {
  caseStudy: CaseStudy
  reverse?: boolean
}
withDefaults(defineProps<Props>(), { reverse: false })
</script>

<template>
  <article class="case" :class="{ 'case--reverse': reverse }">
    <header class="case__head">
      <p class="case__location">{{ caseStudy.location }}</p>
      <h3 class="case__name">{{ caseStudy.name }}</h3>
      <p class="case__role">{{ caseStudy.role }}</p>
    </header>

    <div class="case__body">
      <blockquote class="case__quote">{{ caseStudy.quote }}</blockquote>

      <div class="case__split">
        <div class="case__col">
          <p class="case__col-title">Antes</p>
          <ul>
            <li v-for="b in caseStudy.before" :key="b">{{ b }}</li>
          </ul>
        </div>
        <div class="case__col case__col--on">
          <p class="case__col-title case__col-title--on">Después</p>
          <ul>
            <li v-for="a in caseStudy.after" :key="a">{{ a }}</li>
          </ul>
        </div>
      </div>

      <dl class="case__metrics">
        <div v-for="m in caseStudy.metrics" :key="m.label" class="case__metric">
          <dt class="case__metric-label">{{ m.label }}</dt>
          <dd class="case__metric-value">{{ m.value }}</dd>
        </div>
      </dl>
    </div>
  </article>
</template>

<style scoped lang="scss">
@use '@/styles/mixins' as *;

.case {
  display: grid;
  gap: $space-xl;
  padding-block: $space-2xl;
  border-bottom: 1px solid $color-mist;

  @include respond-to(md) {
    grid-template-columns: 1fr 2fr;
    gap: $space-3xl;
  }

  &--reverse {
    @include respond-to(md) {
      & > .case__head { order: 2; }
      & > .case__body { order: 1; }
    }
  }

  &__location {
    font-size: $fs-xs;
    letter-spacing: $tracking-wide;
    text-transform: uppercase;
    color: $color-gold;
    margin-bottom: $space-2xs;
  }

  &__name {
    font-family: $font-heading;
    font-size: $fs-3xl;
    color: $color-ink;
    line-height: $lh-tight;
  }

  &__role {
    color: $color-stone;
    margin-top: $space-2xs;
  }

  &__quote {
    font-family: $font-quote;
    font-style: italic;
    font-size: $fs-2xl;
    line-height: $lh-snug;
    color: $color-terracotta-deep;
    padding-left: $space-md;
    border-left: 2px solid $color-terracotta;
  }

  &__split {
    margin-top: $space-lg;
    display: grid;
    gap: $space-lg;

    @include respond-to(sm) { grid-template-columns: 1fr 1fr; }
  }

  &__col-title {
    font-family: $font-body;
    font-size: $fs-xs;
    font-weight: 600;
    letter-spacing: $tracking-wide;
    text-transform: uppercase;
    color: $color-stone;
    margin-bottom: $space-2xs;

    &--on { color: $color-terracotta; }
  }

  &__col ul {
    display: flex;
    flex-direction: column;
    gap: $space-2xs;
    color: $color-charcoal;
    line-height: $lh-relaxed;

    & li {
      position: relative;
      padding-left: $space-md;
      &::before { content: '·'; position: absolute; left: 0; }
    }
  }

  &__col--on ul li::before { content: '✓'; color: $color-terracotta; }

  &__metrics {
    margin-top: $space-lg;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: $space-md;
    padding: $space-md;
    background: $color-cream-deep;
    border-radius: $radius-md;
  }

  &__metric-label {
    font-size: $fs-xs;
    letter-spacing: $tracking-wide;
    text-transform: uppercase;
    color: $color-stone;
    margin-bottom: $space-2xs;
  }

  &__metric-value {
    font-family: $font-heading;
    font-size: $fs-2xl;
    color: $color-terracotta;
  }
}
</style>
