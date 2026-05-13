import type { RouteRecordRaw } from 'vue-router'

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue'),
    meta: {
      title: 'Tatiana Rodas — Voz, presencia y autoridad para líderes',
      description:
        'Programa Del OFF al ON: coaching de voz y presencia ejecutiva para líderes que llegaron arriba y dejaron de hablar como ellos. 90 días.',
      layout: 'default',
    },
  },
  {
    path: '/metodo',
    name: 'method',
    component: () => import('@/views/MethodView.vue'),
    meta: {
      title: 'Método Del OFF al ON — 3 pilares, 90 días',
      description:
        'Fisiología, Lenguaje y Enfoque: el sistema para hablar con la autoridad que tu rol exige.',
      layout: 'default',
    },
  },
  {
    path: '/casos',
    name: 'cases',
    component: () => import('@/views/CasesView.vue'),
    meta: {
      title: 'Casos reales — Líderes que pasaron del silencio al impacto',
      description:
        'Historias verificadas de empresarios y ejecutivos en LATAM y Madrid que reactivaron su voz.',
      layout: 'default',
    },
  },
  {
    path: '/sobre',
    name: 'about',
    component: () => import('@/views/AboutView.vue'),
    meta: {
      title: 'Sobre Tatiana Rodas — Coach de voz y presencia ejecutiva',
      description:
        '15+ años entrenando líderes para que cada palabra construya autoridad.',
      layout: 'default',
    },
  },
  {
    path: '/contacto',
    name: 'contact',
    component: () => import('@/views/ContactView.vue'),
    meta: {
      title: 'Contacto — Habla con Tatiana',
      description: 'Escribe por WhatsApp o email. Respuesta en menos de 24 horas.',
      layout: 'default',
    },
  },
  {
    path: '/aplicar',
    name: 'apply',
    component: () => import('@/views/ApplyView.vue'),
    meta: {
      title: 'Aplica al programa — Sesión de diagnóstico',
      description:
        'Programa cerrado por aplicación. Reservado a líderes con inversión sobre 500 USD.',
      layout: 'bare',
    },
  },
  {
    path: '/:catchAll(.*)*',
    name: 'notFound',
    component: () => import('@/views/NotFoundView.vue'),
    meta: {
      title: 'Página no encontrada',
      description: 'La ruta solicitada no existe.',
      layout: 'default',
      noindex: true,
    },
  },
]
