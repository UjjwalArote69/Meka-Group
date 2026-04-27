import { useEffect, useState } from 'react'
import { sanityClient } from '../lib/sanity.js'

const PROJECTS_PAGE_DEFAULTS = {
  // ── HEADER ──
  eyebrow: { en: 'The Archive', hi: 'संग्रहालय', ar: 'الأرشيف' },
  title: { en: 'Project Locations', hi: 'परियोजना स्थल', ar: 'مواقع المشاريع' },
  description: {
    en: 'Interact with the map to explore our historical and active deployments across marine construction, dredging, and urban infrastructure.',
    hi: 'समुद्री निर्माण, ड्रेजिंग और शहरी बुनियादी ढांचे में हमारी ऐतिहासिक और सक्रिय तैनाती का पता लगाने के लिए मानचित्र के साथ बातचीत करें।',
    ar: 'تفاعل مع الخريطة لاستكشاف عمليات النشر التاريخية والنشطة عبر البناء البحري والتجريف والبنية التحتية الحضرية.',
  },

  // ── MAP UI ──
  deploymentsLabel: { en: 'deployments', hi: 'तैनातियाँ', ar: 'عمليات نشر' },
  resetMapLabel: { en: 'Reset Map', hi: 'मानचित्र रीसेट करें', ar: 'إعادة تعيين الخريطة' },
  loadingLabel: { en: 'Loading atlas…', hi: 'मानचित्र लोड हो रहा है…', ar: 'جارٍ تحميل الأطلس…' },

  // ── DETAILS ──
  clientLabel: { en: 'Client', hi: 'ग्राहक', ar: 'العميل' },
  ctaLabel: {
    en: 'Discuss a Similar Project',
    hi: 'समान परियोजना पर चर्चा करें',
    ar: 'ناقش مشروعاً مماثلاً',
  },

  // ── EMPTY STATE ──
  emptyTitle: { en: 'Select a Deployment', hi: 'एक तैनाती चुनें', ar: 'اختر عملية نشر' },
  emptyDescription: {
    en: 'Select any marker on the map to view detailed specifications about our historical marine and infrastructure projects.',
    hi: 'हमारी ऐतिहासिक समुद्री और बुनियादी ढांचा परियोजनाओं के बारे में विस्तृत विवरण देखने के लिए मानचित्र पर कोई भी मार्कर चुनें।',
    ar: 'اختر أي علامة على الخريطة لعرض المواصفات التفصيلية لمشاريعنا البحرية والبنية التحتية التاريخية.',
  },
}

const PROJECTS_PAGE_QUERY = `*[_id == "projectsPage"][0]{
  eyebrow,
  title,
  description,
  deploymentsLabel,
  resetMapLabel,
  loadingLabel,
  clientLabel,
  ctaLabel,
  emptyTitle,
  emptyDescription
}`

const hasContent = (v) => {
  if (v == null) return false
  if (typeof v === 'string') return v.length > 0
  if (Array.isArray(v)) return v.length > 0
  if (typeof v === 'object') return Object.values(v).some((x) => typeof x === 'string' && x.length > 0)
  return true
}

export function useProjectsPage() {
  const [projectsPage, setProjectsPage] = useState(PROJECTS_PAGE_DEFAULTS)

  useEffect(() => {
    if (!import.meta.env.VITE_SANITY_PROJECT_ID) return
    let cancelled = false
    sanityClient
      .fetch(PROJECTS_PAGE_QUERY)
      .then((data) => {
        if (cancelled || !data) return
        const merged = {}
        for (const key of Object.keys(PROJECTS_PAGE_DEFAULTS)) {
          merged[key] = hasContent(data[key]) ? data[key] : PROJECTS_PAGE_DEFAULTS[key]
        }
        setProjectsPage(merged)
      })
      .catch(() => {})
    return () => {
      cancelled = true
    }
  }, [])

  return projectsPage
}
