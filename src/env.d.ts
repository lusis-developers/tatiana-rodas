/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SITE_URL: string
  readonly VITE_LEADS_WEBHOOK_URL: string
  readonly VITE_WHATSAPP_NUMBER: string
  readonly VITE_CONTACT_EMAIL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<object, object, unknown>
  export default component
}

// vite-imagetools — match any image with `as=picture` query.
// Note: sources values are srcset STRINGS, not arrays.
declare module '*&as=picture' {
  type Picture = {
    sources: Record<string, string>
    img: { src: string; w: number; h: number }
  }
  const value: Picture
  export default value
}
declare module '*?as=picture' {
  type Picture = {
    sources: Record<string, string>
    img: { src: string; w: number; h: number }
  }
  const value: Picture
  export default value
}
