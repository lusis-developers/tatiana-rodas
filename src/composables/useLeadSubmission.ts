import { useRoute } from 'vue-router'
import { useLeadStore } from '@/stores/lead.store'
import { composeE164 } from '@/utils/format'
import { postJson } from '@/utils/http'
import { trackEvent } from '@/utils/analytics'
import type { LeadCustomField, LeadPayload, LeadSource } from '@/types/lead'

const WEBHOOK_URL = import.meta.env.VITE_LEADS_WEBHOOK_URL

interface SubmitOptions {
  source?: LeadSource
}

const readUtm = (query: Record<string, any>): Partial<LeadCustomField> => ({
  utmSource: query.utm_source,
  utmMedium: query.utm_medium,
  utmCampaign: query.utm_campaign,
  utmTerm: query.utm_term,
  utmContent: query.utm_content,
})

export const useLeadSubmission = () => {
  const route = useRoute()
  const store = useLeadStore()

  const submit = async ({ source = 'apply-form' }: SubmitOptions = {}) => {
    // Honeypot — silently succeed without sending.
    if (store.draft.companyWebsite) {
      store.submissionState = 'success'
      return { honeypot: true }
    }

    if (!WEBHOOK_URL) {
      store.submissionState = 'error'
      store.lastError = 'Webhook no configurado. Define VITE_LEADS_WEBHOOK_URL.'
      throw new Error(store.lastError)
    }

    store.submissionState = 'submitting'
    store.lastError = null

    const d = store.draft
    const qualifies = store.qualifies
    const tags = ['del-off-al-on', qualifies ? 'qualified' : 'disqualified']

    const payload: LeadPayload = {
      firstName: d.firstName.trim(),
      lastName: d.lastName.trim(),
      email: d.email.trim().toLowerCase(),
      phone: composeE164(d.countryCode, d.phone),
      customField: {
        role: d.role.trim(),
        company: d.company.trim() || undefined,
        yearsOfCareer: String(d.yearsOfCareer),
        currentChallenge: d.currentChallenge.trim(),
        investmentRange: String(d.investmentRange),
        preferredChannel: String(d.preferredChannel),
        preferredTime: d.preferredTime.trim() || undefined,
        qualifies,
        source,
        pageUrl: typeof window !== 'undefined' ? window.location.href : '',
        referrer: typeof document !== 'undefined' ? document.referrer : '',
        ...readUtm(route.query as Record<string, any>),
      },
      tags,
      consent: {
        granted: d.consent === true,
        timestamp: new Date().toISOString(),
      },
    }

    try {
      const res = await postJson(WEBHOOK_URL, payload)
      store.submissionState = 'success'
      trackEvent('lead_submit', { qualifies, source })
      trackEvent(qualifies ? 'lead_qualified' : 'lead_disqualified', { source })
      return res
    } catch (err) {
      store.submissionState = 'error'
      store.lastError = err instanceof Error ? err.message : 'Error desconocido.'
      throw err
    }
  }

  return { submit }
}
