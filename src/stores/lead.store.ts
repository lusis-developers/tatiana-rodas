import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'
import type { LeadFormDraft, SubmissionState } from '@/types/lead'

const STORAGE_KEY = 'tr-lead-draft'

const emptyDraft = (): LeadFormDraft => ({
  firstName: '',
  lastName: '',
  email: '',
  countryCode: '+593',
  phone: '',
  role: '',
  company: '',
  yearsOfCareer: '',
  currentChallenge: '',
  investmentRange: '',
  preferredChannel: '',
  preferredTime: '',
  consent: false,
  companyWebsite: '',
})

const loadDraft = (): LeadFormDraft => {
  if (typeof window === 'undefined') return emptyDraft()
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY)
    if (!raw) return emptyDraft()
    return { ...emptyDraft(), ...JSON.parse(raw) }
  } catch {
    return emptyDraft()
  }
}

export const useLeadStore = defineStore('lead', () => {
  const draft = ref<LeadFormDraft>(loadDraft())
  const submissionState = ref<SubmissionState>('idle')
  const lastError = ref<string | null>(null)

  const qualifies = computed(() => draft.value.investmentRange !== '<500' && draft.value.investmentRange !== '')

  const updateField = <K extends keyof LeadFormDraft>(key: K, value: LeadFormDraft[K]) => {
    draft.value[key] = value
  }

  const reset = () => {
    draft.value = emptyDraft()
    if (typeof window !== 'undefined') window.sessionStorage.removeItem(STORAGE_KEY)
  }

  // Persist draft to sessionStorage on every change.
  watch(
    draft,
    (val) => {
      if (typeof window === 'undefined') return
      try {
        window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(val))
      } catch {
        // storage full / disabled — ignore silently
      }
    },
    { deep: true },
  )

  return {
    draft,
    submissionState,
    lastError,
    qualifies,
    updateField,
    reset,
  }
})
