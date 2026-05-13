import type { PageMeta } from '@/types/seo'

const siteUrl = import.meta.env.VITE_SITE_URL || 'https://tatianarodas.com'

export const siteName = 'Tatiana Rodas'
export const defaultImage = `${siteUrl}/og-default.jpg`
export const locale = 'es_LA'

export const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Tatiana Rodas',
  jobTitle: 'Coach de voz y presencia ejecutiva',
  url: siteUrl,
  image: defaultImage,
  description:
    'Coach de voz y presencia auténtica para líderes y empresarios senior. Creadora del método Del OFF al ON.',
  knowsAbout: [
    'Voz ejecutiva',
    'Presencia y autoridad',
    'Comunicación de liderazgo',
    'Storytelling ejecutivo',
    'Coaching para C-suite',
  ],
  areaServed: [
    'Ecuador', 'México', 'Colombia', 'Perú', 'El Salvador',
    'Estados Unidos', 'España', 'Argentina',
  ],
}

export const serviceJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Del OFF al ON',
  serviceType: 'Coaching ejecutivo de voz, presencia y narrativa',
  provider: { '@type': 'Person', name: 'Tatiana Rodas', url: siteUrl },
  description:
    'Programa de 90 días para líderes que llegaron arriba y dejaron de hablar como ellos. Tres pilares: Fisiología, Lenguaje y Enfoque.',
  areaServed: 'Latinoamérica · España',
  audience: {
    '@type': 'Audience',
    audienceType: 'Empresarios, ejecutivos C-suite y fundadores con 15-30 años de carrera',
  },
}

export const homeMeta: PageMeta = {
  title: 'Tatiana Rodas — Voz, presencia y autoridad para líderes',
  description:
    'Programa Del OFF al ON: coaching de voz y presencia ejecutiva para líderes que llegaron arriba y dejaron de hablar como ellos. 90 días.',
}

export const methodMeta: PageMeta = {
  title: 'Método Del OFF al ON — 3 pilares, 90 días',
  description:
    'Fisiología, Lenguaje y Enfoque: el sistema para hablar con la autoridad que tu rol exige.',
}

export const casesMeta: PageMeta = {
  title: 'Casos reales — Líderes que pasaron del silencio al impacto',
  description:
    'Historias verificadas de empresarios y ejecutivos en LATAM y Madrid que reactivaron su voz y su presencia.',
}

export const aboutMeta: PageMeta = {
  title: 'Sobre Tatiana Rodas — Coach de voz y presencia ejecutiva',
  description:
    '15+ años entrenando líderes para que cada palabra construya autoridad. Coach de C-suite y conferencistas.',
}

export const contactMeta: PageMeta = {
  title: 'Contacto — Habla con Tatiana',
  description:
    'Escribe por WhatsApp o email. Respuesta en menos de 24 horas.',
}

export const applyMeta: PageMeta = {
  title: 'Aplica al programa — Sesión de diagnóstico',
  description:
    'Programa cerrado por aplicación. Reservado a líderes con inversión sobre 500 USD.',
  noindex: false,
}
