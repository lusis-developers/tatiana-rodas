import { useHead } from '@unhead/vue'
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import type { PageMeta } from '@/types/seo'
import { defaultImage, locale, siteName } from '@/data/seo'

const siteUrl = (import.meta.env.VITE_SITE_URL || '').replace(/\/$/, '')

/**
 * Sets per-route title, description, OG/Twitter meta, canonical, and optional JSON-LD.
 * Falls back to route.meta values when called without an argument.
 */
export const useSeoMeta = (meta?: Partial<PageMeta>) => {
  const route = useRoute()

  useHead(computed(() => {
    const title = (meta?.title ?? (route.meta.title as string)) || siteName
    const description = (meta?.description ?? (route.meta.description as string)) || ''
    const image = meta?.image ?? (route.meta.image as string) ?? defaultImage
    const noindex = meta?.noindex ?? (route.meta.noindex as boolean) ?? false
    const url = `${siteUrl}${route.path}`

    const metaTags = [
      { name: 'description', content: description },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:image', content: image },
      { property: 'og:url', content: url },
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: siteName },
      { property: 'og:locale', content: locale },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: image },
    ]

    if (noindex) metaTags.push({ name: 'robots', content: 'noindex,follow' })

    const link = [{ rel: 'canonical' as const, href: url }]

    const script = meta?.jsonLd
      ? (Array.isArray(meta.jsonLd) ? meta.jsonLd : [meta.jsonLd]).map((data: Record<string, unknown>) => ({
          type: 'application/ld+json' as const,
          innerHTML: JSON.stringify(data),
        }))
      : ([] as Array<{ type: 'application/ld+json'; innerHTML: string }>)

    return { title, meta: metaTags, link, script }
  }))
}
