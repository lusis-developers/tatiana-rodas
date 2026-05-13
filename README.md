# Tatiana Rodas — Web

Sitio Vue 3 + TypeScript + Vite para Tatiana Rodas, coach de voz y presencia ejecutiva. Estética editorial cálida inspirada en jennakutcher.com (cream / terracota / oro). Multi-página, captura de leads cualificados con integración preparada para **GoHighLevel**.

## Stack

- **Vue 3.5** con Composition API (`<script setup lang="ts">`)
- **TypeScript** estricto
- **Vite 8**
- **Vue Router** + **Pinia**
- **SCSS** con tokens en `_variables.scss` (auto-inyectados) y mixins en `_mixins.scss`
- **@unhead/vue** — SEO meta + JSON-LD per-route
- **lucide-vue-next** — iconos (tree-shake por import nominal)
- **vite-imagetools** + **sharp** — pipeline avif/webp/jpg con `srcset`

## Scripts

```bash
pnpm install
pnpm dev      # http://localhost:5173
pnpm build    # vue-tsc + vite build (TS estricto)
pnpm preview  # serve dist en http://localhost:4173
```

## Variables de entorno

Copia `.env.example` a `.env.local` y completa:

```
VITE_SITE_URL=https://tatianarodas.com
VITE_LEADS_WEBHOOK_URL=        # GoHighLevel Inbound Webhook URL
VITE_WHATSAPP_NUMBER=593987654321
VITE_CONTACT_EMAIL=hola@tatianarodas.com
```

Para pruebas locales del formulario apunta `VITE_LEADS_WEBHOOK_URL` a `https://webhook.site/<uuid>`.

## Rutas

| Path | Vista | Layout |
|---|---|---|
| `/` | HomeView | default |
| `/metodo` | MethodView | default |
| `/casos` | CasesView | default |
| `/sobre` | AboutView | default |
| `/contacto` | ContactView | default |
| `/aplicar` | ApplyView | bare |
| `/*` | NotFoundView | default |

## Imágenes — pipeline

Originales del cliente en `src/assets/images/portraits/`. Import con query string:

```ts
import set from '@/assets/images/portraits/tatiana-cream-suit.jpg?w=480;768;1200;1600&format=avif;webp;jpg&as=picture'
<AppImage :picture="set" alt="…" />
```

OG image en `public/og-default.jpg` (1200×630, reemplazar el placeholder actual).

## Formulario de cualificación

`/aplicar` recoge 13 campos. El composable `useLeadSubmission` arma payload forma-GHL y hace POST JSON a `VITE_LEADS_WEBHOOK_URL`. Si `investmentRange === '<500'` envía con `tags:['disqualified']` y muestra bloque de redirección. Honeypot `companyWebsite` activo. UTMs capturados de `route.query`.

Migración a GHL nativo: cambiar el env var o reemplazar internals del composable.

## SEO / A11y / Performance

- `useSeoMeta()` por view (title + OG + Twitter + canonical + JSON-LD)
- JSON-LD `Person` en `/` y `/sobre`, `Service` en `/metodo`
- `public/sitemap.xml`, `public/robots.txt`
- Skip link, `:focus-visible`, `aria-invalid`, `aria-describedby`, `aria-live` en form
- `prefers-reduced-motion` honrado
- Route-level code splitting, imágenes lazy + srcset, fonts con `swap`

## Deploy

Cualquier hosting estático (Netlify, Vercel, Cloudflare Pages). Configurar rewrites para SPA: todas las rutas no-asset → `/index.html`.

---

Hecho por [Bakano.ec](https://bakano.ec).
