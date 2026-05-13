export interface PageMeta {
  title: string
  description: string
  image?: string
  noindex?: boolean
  jsonLd?: Record<string, unknown> | Record<string, unknown>[]
}

declare module 'vue-router' {
  interface RouteMeta {
    title: string
    description: string
    layout?: 'default' | 'bare'
    image?: string
    noindex?: boolean
  }
}

export {}
