import { useEffect, useState } from 'react'
import { sanityClient } from '../lib/sanity.js'

const ABOUT_PAGE_DEFAULTS = {
  // ── HERO ──
  heroEyebrow: { en: 'The Meka Group Story', hi: 'मेका ग्रुप की कहानी', ar: 'قصة مجموعة ميكا' },
  heroTitleWord1: { en: 'Forging', hi: 'निर्माण', ar: 'صياغة' },
  heroTitleConnector: { en: 'The', hi: 'का', ar: 'ال' },
  heroTitleWord2: { en: 'Future', hi: 'भविष्य', ar: 'مستقبل' },
  heroDescription: {
    en: "Decades of maritime engineering excellence. We reshape coastlines, build tomorrow's infrastructure, and engineer resilience into every project.",
    hi: 'समुद्री इंजीनियरिंग उत्कृष्टता के दशक। हम तटरेखाओं को नया आकार देते हैं, कल का बुनियादी ढांचा बनाते हैं, और हर परियोजना में लचीलापन इंजीनियर करते हैं।',
    ar: 'عقود من التميز في الهندسة البحرية. نعيد تشكيل السواحل، ونبني البنية التحتية للغد، ونهندس المرونة في كل مشروع.',
  },
  heroAccentNumber: '45+',
  heroAccentLabel: { en: 'Years of Excellence', hi: 'उत्कृष्टता के वर्ष', ar: 'سنوات التميز' },

  // ── TEXT REVEAL ──
  textRevealLines: [
    {
      en: 'Since our inception, Meka Group has stood at the vanguard of maritime engineering. ',
      hi: 'अपनी स्थापना के बाद से, मेका ग्रुप समुद्री इंजीनियरिंग में अग्रणी रहा है। ',
      ar: 'منذ تأسيسها، وقفت مجموعة ميكا في طليعة الهندسة البحرية. ',
    },
    {
      en: 'We do not just build infrastructure; we engineer resilience. ',
      hi: 'हम केवल बुनियादी ढांचा नहीं बनाते; हम लचीलापन इंजीनियर करते हैं। ',
      ar: 'نحن لا نبني البنية التحتية فحسب؛ بل نهندس المرونة. ',
    },
    {
      en: 'From complex dredging operations to massive fleet logistics, ',
      hi: 'जटिल ड्रेजिंग संचालन से लेकर विशाल बेड़ा रसद तक, ',
      ar: 'من عمليات التجريف المعقدة إلى لوجستيات الأسطول الضخمة، ',
    },
    {
      en: 'our legacy is written in the deep waters and towering ports across the subcontinent.',
      hi: 'हमारी विरासत उपमहाद्वीप भर के गहरे पानी और ऊंचे बंदरगाहों में लिखी गई है।',
      ar: 'إرثنا مكتوب في المياه العميقة والموانئ الشاهقة عبر شبه القارة.',
    },
  ],

  // ── STATS ──
  stats: [
    { value: 45, suffix: '+', label: { en: 'Years of Excellence', hi: 'उत्कृष्टता के वर्ष', ar: 'سنوات التميز' } },
    { value: 25, suffix: '+', label: { en: 'Vessels in Fleet', hi: 'बेड़े में जहाज', ar: 'سفن في الأسطول' } },
    { value: 25, suffix: '+', label: { en: 'Major Projects', hi: 'प्रमुख परियोजनाएं', ar: 'مشاريع رئيسية' } },
    { value: 10, suffix: '',  label: { en: 'Global Partners', hi: 'वैश्विक साझेदार', ar: 'شركاء عالميون' } },
  ],

  // ── BOARD ──
  boardEyebrow: { en: 'Leadership', hi: 'नेतृत्व', ar: 'القيادة' },
  boardTitle: { en: 'Board of Directors', hi: 'निदेशक मंडल', ar: 'مجلس الإدارة' },
  boardDescription: {
    en: 'Guided by decades of experience, our leadership team steers Meka Group toward sustainable growth and engineering excellence.',
    hi: 'दशकों के अनुभव से निर्देशित, हमारी नेतृत्व टीम मेका ग्रुप को सतत विकास और इंजीनियरिंग उत्कृष्टता की ओर ले जाती है।',
    ar: 'بإرشاد من عقود من الخبرة، يقود فريق قيادتنا مجموعة ميكا نحو النمو المستدام والتميز الهندسي.',
  },
  directors: [
    {
      slug: 'drmekapaparao',
      name: 'Dr. Meka Vijay Paparao',
      role: { en: 'Chairman and Managing Director', hi: 'अध्यक्ष और प्रबंध निदेशक', ar: 'رئيس مجلس الإدارة والعضو المنتدب' },
    },
    {
      slug: 'hemantrao',
      name: 'Hemanth Meka Rao',
      role: { en: 'Group CEO & Director', hi: 'समूह CEO और निदेशक', ar: 'الرئيس التنفيذي للمجموعة وعضو مجلس الإدارة' },
    },
    {
      slug: 'mrsrajyalaskhmirao',
      name: 'M. Rajyalakshmi Rao',
      role: { en: 'Co-Founder & Director', hi: 'सह-संस्थापक और निदेशक', ar: 'المؤسس المشارك وعضو مجلس الإدارة' },
    },
  ],

  // ── VALUES ──
  valuesEyebrow: { en: 'Core Principles', hi: 'मूल सिद्धांत', ar: 'المبادئ الأساسية' },
  valuesTitle: { en: 'Our Values', hi: 'हमारे मूल्य', ar: 'قيمنا' },
  valuesDescription: {
    en: 'These foundational pillars govern every project we undertake, every partnership we build, and every decision we make across our global operations.',
    hi: 'ये मूलभूत स्तंभ हमारी हर परियोजना, हर साझेदारी और हमारे वैश्विक संचालन में हर निर्णय को नियंत्रित करते हैं।',
    ar: 'هذه الركائز الأساسية تحكم كل مشروع نتولاه، وكل شراكة نبنيها، وكل قرار نتخذه عبر عملياتنا العالمية.',
  },
  valuesItems: [
    {
      title: { en: 'Safety First', hi: 'सुरक्षा सर्वोपरि', ar: 'السلامة أولاً' },
      description: {
        en: 'Uncompromising commitment to the health and safety of our workforce, partners, and the communities we operate in.',
        hi: 'हमारे कार्यबल, भागीदारों और उन समुदायों की स्वास्थ्य और सुरक्षा के प्रति अटूट प्रतिबद्धता।',
        ar: 'التزام لا هوادة فيه بصحة وسلامة قوانا العاملة وشركائنا والمجتمعات التي نعمل فيها.',
      },
    },
    {
      title: { en: 'Resilience', hi: 'लचीलापन', ar: 'المرونة' },
      description: {
        en: 'Engineering infrastructure that withstands the test of time and the harshest marine environments.',
        hi: 'ऐसा बुनियादी ढांचा इंजीनियरिंग जो समय की कसौटी और कठोरतम समुद्री वातावरण का सामना करे।',
        ar: 'هندسة بنية تحتية تصمد أمام اختبار الزمن وأقسى البيئات البحرية.',
      },
    },
    {
      title: { en: 'Innovation', hi: 'नवाचार', ar: 'الابتكار' },
      description: {
        en: 'Leveraging cutting-edge technology and advanced engineering methods to solve complex maritime challenges.',
        hi: 'जटिल समुद्री चुनौतियों को हल करने के लिए अत्याधुनिक तकनीक और उन्नत इंजीनियरिंग विधियों का लाभ उठाना।',
        ar: 'الاستفادة من التكنولوجيا المتطورة وأساليب الهندسة المتقدمة لحل التحديات البحرية المعقدة.',
      },
    },
    {
      title: { en: 'Integrity', hi: 'सत्यनिष्ठा', ar: 'النزاهة' },
      description: {
        en: 'Upholding the highest standards of transparency, honesty, and ethics in all global operations.',
        hi: 'सभी वैश्विक संचालन में पारदर्शिता, ईमानदारी और नैतिकता के उच्चतम मानकों को बनाए रखना।',
        ar: 'التمسك بأعلى معايير الشفافية والصدق والأخلاق في جميع العمليات العالمية.',
      },
    },
    {
      title: { en: 'Sustainability', hi: 'सततता', ar: 'الاستدامة' },
      description: {
        en: 'Deeply committed to minimizing our environmental footprint and protecting delicate marine ecosystems.',
        hi: 'हमारे पर्यावरणीय प्रभाव को कम करने और नाजुक समुद्री पारिस्थितिकी तंत्र की रक्षा करने के लिए गहराई से प्रतिबद्ध।',
        ar: 'ملتزمون بشدة بتقليل بصمتنا البيئية وحماية النظم البيئية البحرية الحساسة.',
      },
    },
    {
      title: { en: 'Excellence', hi: 'उत्कृष्टता', ar: 'التميز' },
      description: {
        en: 'Delivering superior quality, precision, and craftsmanship in every project, no matter the scale.',
        hi: 'हर परियोजना में बेहतर गुणवत्ता, सटीकता और शिल्प कौशल प्रदान करना, चाहे पैमाना कुछ भी हो।',
        ar: 'تقديم جودة وتقة وحرفية فائقة في كل مشروع، بغض النظر عن الحجم.',
      },
    },
    {
      title: { en: 'Collaboration', hi: 'सहयोग', ar: 'التعاون' },
      description: {
        en: 'Fostering strong partnerships and seamless teamwork to achieve extraordinary, large-scale outcomes.',
        hi: 'असाधारण, बड़े पैमाने के परिणाम प्राप्त करने के लिए मजबूत साझेदारी और निर्बाध टीमवर्क को बढ़ावा देना।',
        ar: 'تعزيز الشراكات القوية والعمل الجماعي السلس لتحقيق نتائج استثنائية على نطاق واسع.',
      },
    },
    {
      title: { en: 'Accountability', hi: 'जवाबदेही', ar: 'المساءلة' },
      description: {
        en: 'Taking full ownership of our actions, decisions, and the long-term success of our infrastructure builds.',
        hi: 'हमारे कार्यों, निर्णयों और हमारे बुनियादी ढांचे की दीर्घकालिक सफलता का पूर्ण स्वामित्व लेना।',
        ar: 'تحمل المسؤولية الكاملة عن أعمالنا وقراراتنا والنجاح طويل الأمد لمشاريعنا.',
      },
    },
    {
      title: { en: 'Empowerment', hi: 'सशक्तिकरण', ar: 'التمكين' },
      description: {
        en: 'Investing heavily in our people, nurturing talent, and encouraging decisive leadership at every organizational level.',
        hi: 'हमारे लोगों में भारी निवेश, प्रतिभा का पोषण, और हर संगठनात्मक स्तर पर निर्णायक नेतृत्व को प्रोत्साहित करना।',
        ar: 'الاستثمار بكثافة في أفرادنا، ورعاية المواهب، وتشجيع القيادة الحاسمة على كل مستوى تنظيمي.',
      },
    },
  ],
}

const ABOUT_PAGE_QUERY = `*[_id == "aboutPage"][0]{
  heroEyebrow,
  heroTitleWord1,
  heroTitleConnector,
  heroTitleWord2,
  heroDescription,
  heroAccentNumber,
  heroAccentLabel,
  textRevealLines,
  stats,
  boardEyebrow,
  boardTitle,
  boardDescription,
  directors,
  valuesEyebrow,
  valuesTitle,
  valuesDescription,
  valuesItems
}`

const hasContent = (v) => {
  if (v == null) return false
  if (typeof v === 'string') return v.length > 0
  if (Array.isArray(v)) return v.length > 0
  if (typeof v === 'object') return Object.values(v).some((x) => typeof x === 'string' && x.length > 0)
  return true
}

export function useAboutPage() {
  const [aboutPage, setAboutPage] = useState(ABOUT_PAGE_DEFAULTS)

  useEffect(() => {
    if (!import.meta.env.VITE_SANITY_PROJECT_ID) return
    let cancelled = false
    sanityClient
      .fetch(ABOUT_PAGE_QUERY)
      .then((data) => {
        if (cancelled || !data) return
        const merged = {}
        for (const key of Object.keys(ABOUT_PAGE_DEFAULTS)) {
          merged[key] = hasContent(data[key]) ? data[key] : ABOUT_PAGE_DEFAULTS[key]
        }
        setAboutPage(merged)
      })
      .catch(() => {})
    return () => {
      cancelled = true
    }
  }, [])

  return aboutPage
}
