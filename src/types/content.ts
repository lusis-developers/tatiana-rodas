import type { Component } from 'vue'

export interface Pillar {
  id: 'fisiologia' | 'lenguaje' | 'enfoque'
  number: string
  title: string
  tagline: string
  description: string
  bullets: string[]
  iconName: string
}

export interface Testimonial {
  id: string
  name: string
  role: string
  location: string
  quote: string
  highlight?: string
}

export interface CaseStudyMetric {
  label: string
  value: string
}

export interface CaseStudy {
  id: string
  name: string
  role: string
  location: string
  before: string[]
  after: string[]
  quote: string
  metrics: CaseStudyMetric[]
}

export interface FaqItem {
  id: string
  question: string
  answer: string
}

export interface NavLink {
  label: string
  to: string
  end?: boolean
}

export interface StatItem {
  value: string
  label: string
}

export interface TimelinePhase {
  number: string
  name: string
  duration: string
  outcome: string
  deliverables: string[]
}

export interface BeforeAfterEntry {
  off: string
  on: string
}

export type LucideIconComponent = Component
