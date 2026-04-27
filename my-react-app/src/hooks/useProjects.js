import { useEffect, useState } from 'react'
import { sanityClient } from '../lib/sanity.js'

const PROJECTS_DEFAULTS = {
  introLabel: { en: 'Our Portfolio', hi: 'हमारा पोर्टफोलियो', ar: 'محفظتنا' },
  titleWord1: { en: 'Engineering', hi: 'इंजीनियरिंग', ar: 'هندسة' },
  titleConnector: { en: 'the', hi: 'द', ar: 'ال' },
  titleWord2: { en: 'Future.', hi: 'भविष्य।', ar: 'مستقبل.' },
  noLabel: { en: 'No.', hi: 'क्र.', ar: 'رقم' },
  projects: [
    {
      id: '01',
      title: 'Madras\nPort',
      subtitle: { en: 'MARINE CONSTRUCTION', hi: 'समुद्री निर्माण', ar: 'البناء البحري' },
    },
    {
      id: '02',
      title: 'Hyundai\nHeavy\nIndustries',
      subtitle: { en: 'DREDGING & RECLAMATION', hi: 'ड्रेजिंग और पुनर्ग्रहण', ar: 'التجريف والاستصلاح' },
    },
    {
      id: '03',
      title: 'Mitsui &\nCompany',
      subtitle: { en: 'PORT DEVELOPMENT', hi: 'बंदरगाह विकास', ar: 'تطوير الموانئ' },
    },
  ],
}

const PROJECTS_QUERY = `*[_id == "projects"][0]{
  introLabel,
  titleWord1,
  titleConnector,
  titleWord2,
  noLabel,
  projects
}`

const hasContent = (v) => {
  if (v == null) return false
  if (typeof v === 'string') return v.length > 0
  if (Array.isArray(v)) return v.length > 0
  if (typeof v === 'object') return Object.values(v).some((x) => typeof x === 'string' && x.length > 0)
  return true
}

export function useProjects() {
  const [projects, setProjects] = useState(PROJECTS_DEFAULTS)

  useEffect(() => {
    if (!import.meta.env.VITE_SANITY_PROJECT_ID) return
    let cancelled = false
    sanityClient
      .fetch(PROJECTS_QUERY)
      .then((data) => {
        if (cancelled || !data) return
        const merged = {}
        for (const key of Object.keys(PROJECTS_DEFAULTS)) {
          merged[key] = hasContent(data[key]) ? data[key] : PROJECTS_DEFAULTS[key]
        }
        setProjects(merged)
      })
      .catch(() => {})
    return () => {
      cancelled = true
    }
  }, [])

  return projects
}
