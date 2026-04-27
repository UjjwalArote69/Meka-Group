import { useEffect, useState } from 'react'
import { sanityClient } from '../lib/sanity.js'

const CAREERS_PAGE_DEFAULTS = {
  // ── HERO ──
  heroEyebrow: { en: 'Join the Legacy', hi: 'विरासत से जुड़ें', ar: 'انضم إلى الإرث' },
  heroTitleWord1: { en: 'Build', hi: 'बनाएं', ar: 'ابنِ' },
  heroTitleWord2: { en: 'With Us', hi: 'हमारे साथ', ar: 'معنا' },
  heroDescription: {
    en: "Four decades of engineering excellence. Join a team that reshapes coastlines, builds tomorrow's infrastructure, and engineers resilience into every project.",
    hi: 'इंजीनियरिंग उत्कृष्टता के चार दशक। एक ऐसी टीम से जुड़ें जो तटरेखाओं को नया आकार देती है, कल का बुनियादी ढांचा बनाती है, और हर परियोजना में लचीलापन इंजीनियर करती है।',
    ar: 'أربعة عقود من التميز الهندسي. انضم إلى فريق يعيد تشكيل السواحل، ويبني البنية التحتية للغد، ويهندس المرونة في كل مشروع.',
  },

  // ── WHY MEKA ──
  whyMekaEyebrow: { en: 'Why Meka Group', hi: 'मेका ग्रुप क्यों', ar: 'لماذا مجموعة ميكا' },
  whyMekaCards: [
    {
      title: { en: 'Legacy of Excellence', hi: 'उत्कृष्टता की विरासत', ar: 'إرث من التميز' },
      description: {
        en: '45+ years of pioneering marine construction and coastal infrastructure across India and beyond.',
        hi: 'भारत और उसके बाहर 45+ वर्षों का अग्रणी समुद्री निर्माण और तटीय बुनियादी ढांचा।',
        ar: 'أكثر من 45 عاماً من الريادة في البناء البحري والبنية التحتية الساحلية في الهند وخارجها.',
      },
    },
    {
      title: { en: 'Diverse Opportunities', hi: 'विविध अवसर', ar: 'فرص متنوعة' },
      description: {
        en: 'Nine specialized companies spanning marine, dredging, ports, infrastructure, real estate, and consulting.',
        hi: 'समुद्री, ड्रेजिंग, बंदरगाह, बुनियादी ढांचा, रियल एस्टेट और परामर्श में फैली नौ विशेष कंपनियां।',
        ar: 'تسع شركات متخصصة تغطي البحرية والتجريف والموانئ والبنية التحتية والعقارات والاستشارات.',
      },
    },
    {
      title: { en: 'Growth & Impact', hi: 'विकास और प्रभाव', ar: 'النمو والتأثير' },
      description: {
        en: "Work on landmark projects that shape India's coastline and infrastructure for generations to come.",
        hi: 'ऐतिहासिक परियोजनाओं पर काम करें जो आने वाली पीढ़ियों के लिए भारत की तटरेखा और बुनियादी ढांचे को आकार देती हैं।',
        ar: 'اعمل على مشاريع بارزة تشكل ساحل الهند وبنيتها التحتية للأجيال القادمة.',
      },
    },
  ],

  // ── APPLICATION HEADER ──
  applyEyebrow: { en: 'Job Application', hi: 'नौकरी आवेदन', ar: 'طلب توظيف' },
  applyTitle: { en: 'Apply Now', hi: 'अभी आवेदन करें', ar: 'تقدّم الآن' },
  applyDescription: {
    en: 'Diversified group with interests in Civil & Marine Construction, Dredging, Subsea Pipelines, and Port Development.',
    hi: 'सिविल और समुद्री निर्माण, ड्रेजिंग, सबसी पाइपलाइन और बंदरगाह विकास में रुचि रखने वाला विविध समूह।',
    ar: 'مجموعة متنوعة لها اهتمامات في البناء المدني والبحري، التجريف، خطوط الأنابيب تحت البحر، وتطوير الموانئ.',
  },

  // ── POSITIONS ──
  positionGroups: [
    {
      id: 'management',
      label: { en: 'Management', hi: 'प्रबंधन', ar: 'الإدارة' },
      roles: [
        'Project Director (Min 25 yrs — Marine/Offshore/Oil & Gas)',
        'Project Manager — Seawater Intake Outfall Pipeline Systems',
        'Marine Operations Manager',
        'Company Secretary',
      ],
    },
    {
      id: 'engineering',
      label: { en: 'Engineering', hi: 'इंजीनियरिंग', ar: 'الهندسة' },
      roles: [
        'Naval Architect / Marine Engineer',
        'Planning Engineer',
        'Dredging Engineer',
        'Project Engineer',
        'Environmental Engineer (Marine experience only)',
      ],
    },
    {
      id: 'legal',
      label: { en: 'Contracts & Legal', hi: 'अनुबंध और कानूनी', ar: 'العقود والشؤون القانونية' },
      roles: [
        'Contracts Manager (Legal) — Administration & Claims',
        'Contracts Manager (SCM) — Subcontracts & Procurement',
        'Legal Manager (Real Estate)',
        'Bid Specialist',
      ],
    },
    {
      id: 'crew',
      label: { en: 'Marine Crew', hi: 'समुद्री दल', ar: 'الطاقم البحري' },
      roles: [
        'Dredge Master (Large CSD experience)',
        'Chief Engineer (Large CSD experience)',
        '2nd Engineer (Large CSD experience)',
        '3rd Engineer (Large CSD experience)',
        'Watchkeeping Engineer — On Deck',
        'Watchkeeping Engineer — Engine Room',
        'Fitter / Mechanic — Deck',
        'Fitter / Mechanic — Engine Room',
      ],
    },
    {
      id: 'support',
      label: { en: 'Specialist & Support', hi: 'विशेषज्ञ और सहायक', ar: 'الاختصاصيون والدعم' },
      roles: [
        'Ship Repair / Ship Building Manager',
        'Hydrographic Surveyor',
        'HSE Manager (Marine experience only)',
        'Project Accountant (Dahej)',
        'Event Assistant',
        'IT System Admin',
      ],
    },
    {
      id: 'other',
      label: { en: 'Other', hi: 'अन्य', ar: 'أخرى' },
      roles: ['Intern', 'Other'],
    },
  ],
}

const CAREERS_PAGE_QUERY = `*[_id == "careersPage"][0]{
  heroEyebrow,
  heroTitleWord1,
  heroTitleWord2,
  heroDescription,
  whyMekaEyebrow,
  whyMekaCards,
  applyEyebrow,
  applyTitle,
  applyDescription,
  positionGroups
}`

const hasContent = (v) => {
  if (v == null) return false
  if (typeof v === 'string') return v.length > 0
  if (Array.isArray(v)) return v.length > 0
  if (typeof v === 'object') return Object.values(v).some((x) => typeof x === 'string' && x.length > 0)
  return true
}

export function useCareersPage() {
  const [careersPage, setCareersPage] = useState(CAREERS_PAGE_DEFAULTS)

  useEffect(() => {
    if (!import.meta.env.VITE_SANITY_PROJECT_ID) return
    let cancelled = false
    sanityClient
      .fetch(CAREERS_PAGE_QUERY)
      .then((data) => {
        if (cancelled || !data) return
        const merged = {}
        for (const key of Object.keys(CAREERS_PAGE_DEFAULTS)) {
          merged[key] = hasContent(data[key]) ? data[key] : CAREERS_PAGE_DEFAULTS[key]
        }
        setCareersPage(merged)
      })
      .catch(() => {})
    return () => {
      cancelled = true
    }
  }, [])

  return careersPage
}
