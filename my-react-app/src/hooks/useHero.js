import { useEffect, useState } from 'react'
import { sanityClient } from '../lib/sanity.js'

const HERO_DEFAULTS = {
  titleLine1: { en: 'Marine', hi: 'समुद्री', ar: 'الهندسة' },
  titleLine2: { en: 'engineering.', hi: 'इंजीनियरिंग।', ar: 'البحرية.' },
  description: {
    en: 'Four and a half decades of specialized expertise delivering complex coastal infrastructure and marine construction across India and the Middle East.',
    hi: 'साढ़े चार दशकों की विशेष विशेषज्ञता — भारत और मध्य पूर्व में जटिल तटीय बुनियादी ढांचा और समुद्री निर्माण।',
    ar: 'أربعة عقود ونصف من الخبرة المتخصصة في تنفيذ البنية التحتية الساحلية المعقدة والبناء البحري في الهند والشرق الأوسط.',
  },
  liveLabel: { en: 'Live', hi: 'लाइव', ar: 'مباشر' },
  activeDeploymentLabel: { en: 'Active Deployment', hi: 'सक्रिय तैनाती', ar: 'نشر نشط' },
  scrollLabel: { en: 'Scroll', hi: 'स्क्रॉल', ar: 'مرر' },
  trustedLabel: {
    en: 'Trusted globally by industry leaders',
    hi: 'विश्व स्तर पर उद्योग के नेताओं द्वारा विश्वसनीय',
    ar: 'موثوق به عالمياً من قادة الصناعة',
  },
  establishedYear: '1980',
  videoAlt: {
    en: 'Meka marine construction',
    hi: 'Meka समुद्री निर्माण',
    ar: 'البناء البحري لـ Meka',
  },
  stats: [
    {
      value: 45,
      suffix: '+',
      label: { en: 'Years Experience', hi: 'वर्षों का अनुभव', ar: 'سنوات الخبرة' },
    },
    {
      value: 50,
      suffix: '+',
      label: { en: 'Marine Projects', hi: 'समुद्री परियोजनाएं', ar: 'مشاريع بحرية' },
    },
    {
      value: 25,
      suffix: '+',
      label: { en: 'Specialized Vessels', hi: 'विशेष जहाज', ar: 'سفن متخصصة' },
    },
    {
      value: 10,
      suffix: '',
      label: { en: 'Global Reach', hi: 'वैश्विक पहुंच', ar: 'الانتشار العالمي' },
    },
  ],
  clients: [
    'Reliance Industries',
    'L&T',
    'ONGC',
    'Hyundai Heavy',
    'Mitsui & Co.',
    'McDermott',
    'Vatech Wabag',
    'Indian Navy',
  ],
  deployments: [
    {
      code: 'QA-04',
      site: { en: 'North Field Expansion', hi: 'नॉर्थ फील्ड विस्तार', ar: 'توسعة حقل الشمال' },
      coord: { en: '25.5°N, 51.5°E', hi: '25.5°उ, 51.5°पू', ar: '25.5°ش, 51.5°ق' },
    },
    {
      code: 'IN-12',
      site: { en: 'Kochi LNG Terminal', hi: 'कोच्चि LNG टर्मिनल', ar: 'محطة كوتشي للغاز المسال' },
      coord: { en: '9.9°N, 76.2°E', hi: '9.9°उ, 76.2°पू', ar: '9.9°ش, 76.2°ق' },
    },
    {
      code: 'IN-07',
      site: { en: 'Hazira Marine Works', hi: 'हजीरा समुद्री कार्य', ar: 'أعمال حازيرة البحرية' },
      coord: { en: '21.1°N, 72.6°E', hi: '21.1°उ, 72.6°पू', ar: '21.1°ش, 72.6°ق' },
    },
    {
      code: 'IN-03',
      site: { en: 'Rewas Port Development', hi: 'रेवास बंदरगाह विकास', ar: 'تطوير ميناء ريواس' },
      coord: { en: '18.4°N, 72.9°E', hi: '18.4°उ, 72.9°पू', ar: '18.4°ش, 72.9°ق' },
    },
  ],
}

const HERO_QUERY = `*[_id == "hero"][0]{
  titleLine1,
  titleLine2,
  description,
  liveLabel,
  activeDeploymentLabel,
  scrollLabel,
  trustedLabel,
  establishedYear,
  videoAlt,
  stats,
  clients,
  deployments
}`

const hasContent = (v) => {
  if (v == null) return false
  if (typeof v === 'string') return v.length > 0
  if (Array.isArray(v)) return v.length > 0
  if (typeof v === 'object') return Object.values(v).some((x) => typeof x === 'string' && x.length > 0)
  return true
}

export function useHero() {
  const [hero, setHero] = useState(HERO_DEFAULTS)

  useEffect(() => {
    if (!import.meta.env.VITE_SANITY_PROJECT_ID) return
    let cancelled = false
    sanityClient
      .fetch(HERO_QUERY)
      .then((data) => {
        if (cancelled || !data) return
        const merged = {}
        for (const key of Object.keys(HERO_DEFAULTS)) {
          merged[key] = hasContent(data[key]) ? data[key] : HERO_DEFAULTS[key]
        }
        setHero(merged)
      })
      .catch(() => {})
    return () => {
      cancelled = true
    }
  }, [])

  return hero
}
