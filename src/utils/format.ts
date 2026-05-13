// Compose an E.164 phone string from a dial code and local digits.
export const composeE164 = (dialCode: string, localPhone: string): string => {
  const digits = (localPhone || '').replace(/\D/g, '')
  const prefix = dialCode.startsWith('+') ? dialCode : `+${dialCode}`
  return `${prefix}${digits}`
}

// Build a wa.me deeplink. Accepts "+593987654321" or "593987654321".
export const whatsappLink = (phone: string, message?: string): string => {
  const digits = (phone || '').replace(/\D/g, '')
  const base = `https://wa.me/${digits}`
  return message ? `${base}?text=${encodeURIComponent(message)}` : base
}

export const slugify = (str: string): string =>
  str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

export const formatInvestmentRange = (range: string): string => {
  const map: Record<string, string> = {
    '<500': 'Menos de 500 USD',
    '500-1500': '500 – 1.500 USD',
    '1500-3500': '1.500 – 3.500 USD',
    '3500-7000': '3.500 – 7.000 USD',
    '>7000': 'Más de 7.000 USD',
  }
  return map[range] ?? range
}
