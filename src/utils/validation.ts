// Simple pure validators — return error message or null.

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export const required = (value: unknown): string | null => {
  if (value === null || value === undefined) return 'Campo obligatorio.'
  if (typeof value === 'string' && value.trim() === '') return 'Campo obligatorio.'
  if (typeof value === 'boolean' && !value) return 'Campo obligatorio.'
  return null
}

export const email = (value: string): string | null => {
  if (!value) return null
  return EMAIL_RE.test(value.trim()) ? null : 'Email inválido.'
}

export const minLength = (n: number) => (value: string): string | null => {
  if (!value) return null
  return value.trim().length >= n ? null : `Mínimo ${n} caracteres.`
}

export const maxLength = (n: number) => (value: string): string | null => {
  if (!value) return null
  return value.length <= n ? null : `Máximo ${n} caracteres.`
}

export const phoneDigits = (value: string): string | null => {
  if (!value) return null
  const digits = value.replace(/\D/g, '')
  return digits.length >= 7 ? null : 'Teléfono inválido.'
}

export const trueValue = (value: boolean): string | null =>
  value === true ? null : 'Debes aceptar para continuar.'

export type ValidatorFn = (value: any) => string | null

export const runRules = (value: unknown, rules: ValidatorFn[]): string | null => {
  for (const rule of rules) {
    const err = rule(value)
    if (err) return err
  }
  return null
}
