// Stub para futuras integraciones (GA4, Meta Pixel, GoHighLevel events).
// Reemplazar el cuerpo cuando se incorporen tags reales — la API no cambia.

export type AnalyticsEvent =
  | 'lead_submit'
  | 'lead_qualified'
  | 'lead_disqualified'
  | 'cta_click'
  | 'whatsapp_click'

export const trackEvent = (
  event: AnalyticsEvent,
  payload: Record<string, unknown> = {},
): void => {
  if (import.meta.env.DEV) {
    // eslint-disable-next-line no-console
    console.info('[analytics]', event, payload)
  }
  // Hook real provider here later (window.dataLayer, fbq, etc.).
}
