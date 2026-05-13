export type InvestmentRange = '<500' | '500-1500' | '1500-3500' | '3500-7000' | '>7000'
export type YearsOfCareer = '0-2' | '3-5' | '6-10' | '10-20' | '20+'
export type PreferredChannel = 'whatsapp' | 'email' | 'llamada'
export type LeadSource = 'apply-form' | 'contact-form'

export interface LeadFormDraft {
  firstName: string
  lastName: string
  email: string
  countryCode: string
  phone: string
  role: string
  company: string
  yearsOfCareer: YearsOfCareer | ''
  currentChallenge: string
  investmentRange: InvestmentRange | ''
  preferredChannel: PreferredChannel | ''
  preferredTime: string
  consent: boolean
  // Honeypot — must remain empty for real submissions
  companyWebsite: string
}

export interface LeadCustomField {
  role: string
  company?: string
  yearsOfCareer: string
  currentChallenge: string
  investmentRange: string
  preferredChannel: string
  preferredTime?: string
  qualifies: boolean
  source: LeadSource
  pageUrl: string
  referrer: string
  utmSource?: string
  utmMedium?: string
  utmCampaign?: string
  utmTerm?: string
  utmContent?: string
}

// Payload shape mirroring a GoHighLevel-friendly contact contract.
// To migrate from generic webhook → native GHL inbound webhook, only
// VITE_LEADS_WEBHOOK_URL changes (or the composable internals).
export interface LeadPayload {
  firstName: string
  lastName: string
  email: string
  phone: string // E.164: "+593987654321"
  customField: LeadCustomField
  tags: string[]
  consent: {
    granted: boolean
    timestamp: string
  }
}

export type SubmissionState = 'idle' | 'submitting' | 'success' | 'error'

export interface ContactFormDraft {
  name: string
  email: string
  message: string
  companyWebsite: string // honeypot
}
