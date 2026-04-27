import { useEffect, useState } from 'react'
import { sanityClient } from '../lib/sanity.js'

const CONTACT_PAGE_DEFAULTS = {
  // ── HERO ──
  heroEyebrow: { en: 'Global Partnerships', hi: 'वैश्विक साझेदारी', ar: 'شراكات عالمية' },
  heroTitleWord1: { en: 'Connect', hi: 'जुड़ें', ar: 'تواصل' },
  heroTitleWord2: { en: 'Intelligence', hi: 'इंटेलिजेंस', ar: 'ذكي' },

  // ── SIDEBAR ──
  hqLabel: { en: 'Headquarters', hi: 'मुख्यालय', ar: 'المقر الرئيسي' },
  addressLines: [
    { en: '2nd, Madhuli, Dr Annie Besant Rd,', hi: '2nd, मधुली, डॉ. एनी बेसेंट रोड,', ar: '2nd, مادهولي، شارع د. آني بيزانت،' },
    { en: 'Shiv Sagar Estate, Worli,',         hi: 'शिव सागर एस्टेट, वर्ली,',           ar: 'شيف ساغار إستيت، ورلي،' },
    { en: 'Mumbai 400018',                     hi: 'मुंबई 400018',                     ar: 'مومباي 400018' },
  ],
  directChannelsLabel: { en: 'Direct Channels', hi: 'सीधे चैनल', ar: 'قنوات مباشرة' },
  email: 'info@mekagroup.in',
  phone: '+91 22 4089 0000',
  regionalHubsLabel: { en: 'Regional Hubs', hi: 'क्षेत्रीय केंद्र', ar: 'المراكز الإقليمية' },
  regionalHubs: [
    {
      city: 'Chennai, India',
      role: { en: 'Operations', hi: 'संचालन', ar: 'العمليات' },
    },
    {
      city: 'Doha, Qatar',
      role: { en: 'ME Hub', hi: 'ME केंद्र', ar: 'مركز الشرق الأوسط' },
    },
    {
      city: 'Singapore',
      role: { en: 'APAC Hub', hi: 'APAC केंद्र', ar: 'مركز آسيا والمحيط الهادئ' },
    },
  ],

  // ── FORM HEADER ──
  formTitle: { en: 'The Project Brief', hi: 'परियोजना विवरण', ar: 'ملخص المشروع' },
}

const CONTACT_PAGE_QUERY = `*[_id == "contactPage"][0]{
  heroEyebrow,
  heroTitleWord1,
  heroTitleWord2,
  hqLabel,
  addressLines,
  directChannelsLabel,
  email,
  phone,
  regionalHubsLabel,
  regionalHubs,
  formTitle
}`

const hasContent = (v) => {
  if (v == null) return false
  if (typeof v === 'string') return v.length > 0
  if (Array.isArray(v)) return v.length > 0
  if (typeof v === 'object') return Object.values(v).some((x) => typeof x === 'string' && x.length > 0)
  return true
}

export function useContactPage() {
  const [contactPage, setContactPage] = useState(CONTACT_PAGE_DEFAULTS)

  useEffect(() => {
    if (!import.meta.env.VITE_SANITY_PROJECT_ID) return
    let cancelled = false
    sanityClient
      .fetch(CONTACT_PAGE_QUERY)
      .then((data) => {
        if (cancelled || !data) return
        const merged = {}
        for (const key of Object.keys(CONTACT_PAGE_DEFAULTS)) {
          merged[key] = hasContent(data[key]) ? data[key] : CONTACT_PAGE_DEFAULTS[key]
        }
        setContactPage(merged)
      })
      .catch(() => {})
    return () => {
      cancelled = true
    }
  }, [])

  return contactPage
}
