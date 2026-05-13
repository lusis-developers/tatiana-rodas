import type { NavLink } from '@/types/content'

export const primaryNav: NavLink[] = [
  { label: 'Inicio', to: '/', end: true },
  { label: 'Método', to: '/metodo' },
  { label: 'Casos', to: '/casos' },
  { label: 'Sobre', to: '/sobre' },
  { label: 'Contacto', to: '/contacto' },
]

export const footerNav: NavLink[] = [
  { label: 'Inicio', to: '/' },
  { label: 'Método Del OFF al ON', to: '/metodo' },
  { label: 'Casos reales', to: '/casos' },
  { label: 'Sobre Tatiana', to: '/sobre' },
  { label: 'Contacto', to: '/contacto' },
  { label: 'Aplica al programa', to: '/aplicar' },
]

export const applyCta = {
  label: 'Aplica al programa',
  to: '/aplicar',
}
