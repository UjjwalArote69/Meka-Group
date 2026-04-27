import { useEffect, useState } from 'react'
import { sanityClient } from '../lib/sanity.js'

const FOOTER_DEFAULTS = {
  tagline: {
    en: 'Engineering resilience. Forging maritime infrastructure at a global scale.',
    hi: 'लचीलापन इंजीनियरिंग। वैश्विक स्तर पर समुद्री बुनियादी ढांचे का निर्माण।',
    ar: 'هندسة المرونة. بناء البنية التحتية البحرية على نطاق عالمي.',
  },
  directoryLabel: { en: 'Directory', hi: 'निर्देशिका', ar: 'الدليل' },
  headquartersLabel: { en: 'Headquarters', hi: 'मुख्यालय', ar: 'المقر الرئيسي' },
  addressLine1: {
    en: 'Shiv Sagar Estate, Worli,',
    hi: 'शिव सागर एस्टेट, वर्ली,',
    ar: 'شيف ساغار إستيت، ورلي،',
  },
  addressLine2: {
    en: 'Mumbai, MH 400018',
    hi: 'मुंबई, MH 400018',
    ar: 'مومباي، MH 400018',
  },
  email: 'info@mekagroup.in',
  phone: '+91 22 4089 0000',
  presenceLabel: { en: 'Presence', hi: 'उपस्थिति', ar: 'التواجد' },
  socialLinks: [
    { name: 'LinkedIn', url: '' },
    { name: 'Twitter', url: '' },
  ],
  copyright: {
    en: '© 2026 Meka Group. Precise Engineering.',
    hi: '© 2026 मेका ग्रुप। सटीक इंजीनियरिंग।',
    ar: '© 2026 مجموعة ميكا. هندسة دقيقة.',
  },
}

const FOOTER_QUERY = `*[_id == "footer"][0]{
  tagline,
  directoryLabel,
  headquartersLabel,
  addressLine1,
  addressLine2,
  email,
  phone,
  presenceLabel,
  socialLinks,
  copyright
}`

const hasContent = (v) => {
  if (v == null) return false
  if (typeof v === 'string') return v.length > 0
  if (Array.isArray(v)) return v.length > 0
  if (typeof v === 'object') return Object.values(v).some((x) => typeof x === 'string' && x.length > 0)
  return true
}

export function useFooter() {
  const [footer, setFooter] = useState(FOOTER_DEFAULTS)

  useEffect(() => {
    if (!import.meta.env.VITE_SANITY_PROJECT_ID) return
    let cancelled = false
    sanityClient
      .fetch(FOOTER_QUERY)
      .then((data) => {
        if (cancelled || !data) return
        const merged = {}
        for (const key of Object.keys(FOOTER_DEFAULTS)) {
          merged[key] = hasContent(data[key]) ? data[key] : FOOTER_DEFAULTS[key]
        }
        setFooter(merged)
      })
      .catch(() => {})
    return () => {
      cancelled = true
    }
  }, [])

  return footer
}
