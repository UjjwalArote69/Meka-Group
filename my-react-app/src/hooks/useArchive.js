import { useEffect, useState } from 'react'
import { sanityClient } from '../lib/sanity.js'

const C = {
  port:     { en: 'Port',                     hi: 'बंदरगाह',                ar: 'الموانئ' },
  marine:   { en: 'Marine Construction',      hi: 'समुद्री निर्माण',         ar: 'البناء البحري' },
  dredging: { en: 'Dredging and Reclamation', hi: 'ड्रेजिंग और पुनर्ग्रहण',    ar: 'التجريف والاستصلاح' },
  urban:    { en: 'Urban Infrastructure',     hi: 'शहरी बुनियादी ढांचा',    ar: 'البنية التحتية الحضرية' },
}
const L = {
  mumbai:    { en: 'Mumbai, India',     hi: 'मुंबई, भारत',     ar: 'مومباي، الهند' },
  gujarat:   { en: 'Gujarat, India',    hi: 'गुजरात, भारत',    ar: 'غوجارات، الهند' },
  chennai:   { en: 'Chennai, India',    hi: 'चेन्नई, भारत',     ar: 'تشيناي، الهند' },
  madras:    { en: 'Madras, India',     hi: 'मद्रास, भारत',    ar: 'مدراس، الهند' },
  tamilnadu: { en: 'Tamil Nadu, India', hi: 'तमिलनाडु, भारत',  ar: 'تاميل نادو، الهند' },
  odisha:    { en: 'Odisha, India',     hi: 'ओडिशा, भारत',     ar: 'أوديشا، الهند' },
  varanasi:  { en: 'Varanasi, India',   hi: 'वाराणसी, भारत',   ar: 'فاراناسي، الهند' },
}

const ARCHIVE_DEFAULTS = {
  sectionLabel: { en: 'Archive', hi: 'संग्रहालय', ar: 'الأرشيف' },
  sectionTitle: { en: 'More Projects', hi: 'और परियोजनाएं', ar: 'مشاريع أخرى' },
  viewFullArchiveLabel: { en: 'View Full Archive', hi: 'पूरा संग्रह देखें', ar: 'عرض الأرشيف الكامل' },
  entries: [
    {
      slug: 'nhava_sheva', year: '1988', name: 'Vallsons Nhava Sheva Port',
      category: C.port, location: L.mumbai,
      title: { en: 'Port Construction Works at Nhava Sheva' },
      description: { en: 'Port engineering and construction works at Nhava Sheva contributing to the early JNPT development programme (1988).' },
      lat: 18.9493, lng: 72.9510,
    },
    {
      slug: 'government_of_gujrat', year: '1977', name: 'Government of Gujarat Port',
      category: C.port, location: L.gujarat,
      title: { en: 'Porbandar Deepwater Berth & Breakwater' },
      description: { en: "Deepwater berth and breakwater works for Gujarat's state port programme along the Porbandar coast (1977)." },
      lat: 21.6417, lng: 69.6293,
    },
    {
      slug: 'marg_limited', year: '2023', name: 'Marg Limited',
      category: C.port, location: L.chennai,
      title: { en: 'Karaikal Port Breakwaters' },
      description: { en: 'Construction of breakwaters and port infrastructure at Karaikal Port for Marg Limited (2023).' },
      lat: 10.9255, lng: 79.8387,
    },
    {
      slug: 'krishak', year: '1984', name: 'Krishak Bharathi Co-operative Ltd.',
      category: C.marine, location: L.mumbai,
      title: { en: 'KRIBHCO Wharf & Jetty, Hazira' },
      description: { en: "Wharf and jetty construction at KRIBHCO's Hazira facility in Surat, Gujarat (1984)." },
      lat: 21.1204, lng: 72.6295,
    },
    {
      slug: 'madras_port', year: '1986', name: 'Madras Port',
      category: C.marine, location: L.madras,
      title: { en: 'Outer Protection Arm & Breakwater' },
      description: { en: 'Construction of the outer protection arm and breakwater at Madras Harbour (1986).' },
      lat: 13.1020, lng: 80.2985,
    },
    {
      slug: 'vikram_ispat', year: '1992', name: 'Vikram Ispat Ltd.',
      category: C.marine, location: L.tamilnadu,
      title: { en: 'Approach Bund, Caisson Bridge & Jetty' },
      description: { en: 'Approach bund, caisson bridge and jetty works at Revdanda for Vikram Ispat (1992).' },
      lat: 18.5432, lng: 72.9295,
    },
    {
      slug: 'jnpt', year: '1990', name: 'Jawaharlal Nehru Port Trust JNPT.',
      category: C.dredging, location: L.odisha,
      title: { en: 'Lagoon Dredging & Reclamation' },
      description: { en: 'Dredging and reclamation works in the lagoon behind the bulk berth at JNPT (1990).' },
      lat: 18.9640, lng: 72.9550,
    },
    {
      slug: 'landt', year: '2010', name: 'Larsen & Toubro Ltd.',
      category: C.dredging, location: L.odisha,
      title: { en: 'Dredging & Reclamation, Hazira' },
      description: { en: "Dredging and reclamation across L&T's Hazira West Plot, Surat — Phase I–III (2010)." },
      lat: 21.0995, lng: 72.6450,
    },
    {
      slug: 'bmc', year: '1996', name: 'B.M.C',
      category: C.urban, location: L.varanasi,
      title: { en: 'Urban Water Main Replacement' },
      description: { en: "Replacement and laying of standard-diameter distributary water mains across BMC's City North Area (1996)." },
      lat: 19.0760, lng: 72.8777,
    },
    {
      slug: 'urmila', year: '1987', name: 'Urmila & Company, Mumbai',
      category: C.urban, location: L.mumbai,
      title: { en: 'Sardar Sarovar Canal Earthwork' },
      description: { en: 'Earthwork for the main canal of the Sardar Sarovar Narmada Nigam project (1987).' },
      lat: 21.8314, lng: 73.7483,
    },
  ],
}

const ARCHIVE_QUERY = `*[_id == "archive"][0]{
  sectionLabel,
  sectionTitle,
  viewFullArchiveLabel,
  entries
}`

const hasContent = (v) => {
  if (v == null) return false
  if (typeof v === 'string') return v.length > 0
  if (Array.isArray(v)) return v.length > 0
  if (typeof v === 'object') return Object.values(v).some((x) => typeof x === 'string' && x.length > 0)
  return true
}

export function useArchive() {
  const [archive, setArchive] = useState(ARCHIVE_DEFAULTS)

  useEffect(() => {
    if (!import.meta.env.VITE_SANITY_PROJECT_ID) return
    let cancelled = false
    sanityClient
      .fetch(ARCHIVE_QUERY)
      .then((data) => {
        if (cancelled || !data) return
        const merged = {}
        for (const key of Object.keys(ARCHIVE_DEFAULTS)) {
          merged[key] = hasContent(data[key]) ? data[key] : ARCHIVE_DEFAULTS[key]
        }
        setArchive(merged)
      })
      .catch(() => {})
    return () => {
      cancelled = true
    }
  }, [])

  return archive
}
