export interface Country {
  code: string // ISO-2
  name: string
  dial: string // E.164 prefix con "+"
}

// Geografía activa de Tatiana + países cercanos de LATAM hispanohablante + España.
export const countries: Country[] = [
  { code: 'EC', name: 'Ecuador', dial: '+593' },
  { code: 'MX', name: 'México', dial: '+52' },
  { code: 'CO', name: 'Colombia', dial: '+57' },
  { code: 'PE', name: 'Perú', dial: '+51' },
  { code: 'SV', name: 'El Salvador', dial: '+503' },
  { code: 'US', name: 'Estados Unidos (Miami)', dial: '+1' },
  { code: 'ES', name: 'España', dial: '+34' },
  { code: 'AR', name: 'Argentina', dial: '+54' },
  { code: 'CL', name: 'Chile', dial: '+56' },
  { code: 'UY', name: 'Uruguay', dial: '+598' },
  { code: 'PY', name: 'Paraguay', dial: '+595' },
  { code: 'BO', name: 'Bolivia', dial: '+591' },
  { code: 'VE', name: 'Venezuela', dial: '+58' },
  { code: 'PA', name: 'Panamá', dial: '+507' },
  { code: 'CR', name: 'Costa Rica', dial: '+506' },
  { code: 'GT', name: 'Guatemala', dial: '+502' },
  { code: 'HN', name: 'Honduras', dial: '+504' },
  { code: 'NI', name: 'Nicaragua', dial: '+505' },
  { code: 'DO', name: 'República Dominicana', dial: '+1' },
  { code: 'CU', name: 'Cuba', dial: '+53' },
  { code: 'PR', name: 'Puerto Rico', dial: '+1' },
]

export const defaultCountry = countries[0] // Ecuador
