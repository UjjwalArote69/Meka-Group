import { useEffect, useState } from 'react'
import { sanityClient } from '../lib/sanity.js'

const BUSINESS_PAGE_DEFAULTS = {
  // ── HERO ──
  heroEyebrow: { en: 'Our Businesses', hi: 'हमारे व्यवसाय', ar: 'أعمالنا' },
  heroTitleWord1: { en: 'Integrated', hi: 'एकीकृत', ar: 'حلول' },
  heroTitleWord2: { en: 'Solutions', hi: 'समाधान', ar: 'متكاملة' },
  heroDescription: {
    en: 'From marine construction and dredging to port development and urban infrastructure — five specialized verticals delivering end-to-end engineering solutions across India and the Middle East.',
    hi: 'समुद्री निर्माण और ड्रेजिंग से लेकर बंदरगाह विकास और शहरी बुनियादी ढांचे तक — भारत और मध्य पूर्व में एंड-टू-एंड इंजीनियरिंग समाधान प्रदान करने वाले पांच विशेष कार्यक्षेत्र।',
    ar: 'من البناء البحري والتجريف إلى تطوير الموانئ والبنية التحتية الحضرية — خمسة قطاعات متخصصة تقدم حلولاً هندسية شاملة في الهند والشرق الأوسط.',
  },

  // ── VERTICALS ──
  verticals: [
    {
      id: '01',
      slug: 'marine',
      company: 'Amma Lines Pvt. Ltd.',
      title: 'Marine\nConstruction',
      tagline: { en: 'Foundation of the Group', hi: 'समूह की नींव', ar: 'أساس المجموعة' },
      description: {
        en: 'Based on principles of innovation and engineering, our marine construction projects form the foundation of the Meka Group. From coastal protection and breakwaters to port facilities and offshore structures, we build infrastructure that withstands the harshest marine environments.',
        hi: 'नवाचार और इंजीनियरिंग के सिद्धांतों पर आधारित, हमारी समुद्री निर्माण परियोजनाएँ Meka Group की नींव हैं। तट संरक्षण और ब्रेकवाटर से लेकर बंदरगाह सुविधाओं और ऑफशोर संरचनाओं तक, हम कठोरतम समुद्री वातावरण में खड़ी रहने वाली बुनियादी ढाँचे का निर्माण करते हैं।',
        ar: 'تُشكّل مشاريع البناء البحري لدينا، المبنية على مبادئ الابتكار والهندسة، أساس مجموعة Meka. من حماية السواحل وكواسر الأمواج إلى مرافق الموانئ والمنشآت البحرية، نبني بنية تحتية تصمد أمام أقسى البيئات البحرية.',
      },
      statValue: '45+',
      statLabel: { en: 'Years Experience', hi: 'वर्षों का अनुभव', ar: 'سنوات الخبرة' },
      services: [
        { en: 'Coastal Protection & Revetment',         hi: 'तट संरक्षण और रीवेटमेंट',          ar: 'حماية السواحل والتدعيم' },
        { en: 'Port & Harbor Development',              hi: 'बंदरगाह और हार्बर विकास',          ar: 'تطوير الموانئ والمرافئ' },
        { en: 'Offshore Platforms & Structures',        hi: 'ऑफशोर प्लेटफ़ॉर्म और संरचनाएँ',     ar: 'منصات ومنشآت بحرية' },
        { en: 'Underwater Construction & Maintenance',  hi: 'पानी के नीचे निर्माण और रखरखाव',    ar: 'البناء والصيانة تحت الماء' },
        { en: 'Marina & Waterfront Development',        hi: 'मरीना और वॉटरफ्रंट विकास',          ar: 'تطوير المراسي والواجهات البحرية' },
      ],
    },
    {
      id: '02',
      slug: 'dredging',
      company: 'Meka Dredging Company',
      title: 'Dredging &\nReclamation',
      tagline: { en: 'Reshaping Coastlines', hi: 'तटरेखाओं को नया आकार', ar: 'إعادة تشكيل السواحل' },
      description: {
        en: "One of India's top capital dredging and reclamation companies, operating an advanced fleet of cutter suction and trailing suction hopper dredgers. We maintain vital waterways, create land from the sea, and execute deep-water channel projects with centimeter-level precision.",
        hi: 'भारत की अग्रणी कैपिटल ड्रेजिंग और पुनर्ग्रहण कंपनियों में से एक, कटर सक्शन और ट्रेलिंग सक्शन हॉपर ड्रेजरों के उन्नत बेड़े का संचालन करती है। हम महत्वपूर्ण जलमार्गों का रखरखाव करते हैं, समुद्र से भूमि बनाते हैं, और सेंटीमीटर-स्तर की सटीकता के साथ गहरे पानी की चैनल परियोजनाओं को निष्पादित करते हैं।',
        ar: 'إحدى الشركات الرائدة في الهند في التجريف الرأسمالي والاستصلاح، تُشغّل أسطولًا متطورًا من جرّافات الشفط القاطعة وجرّافات الشفط المقطور. نحافظ على الممرات المائية الحيوية، ونستصلح الأراضي من البحر، وننفذ مشاريع قنوات المياه العميقة بدقة تصل إلى سنتيمتر.',
      },
      statValue: '150+',
      statLabel: { en: 'Dredging Projects', hi: 'ड्रेजिंग परियोजनाएँ', ar: 'مشاريع تجريف' },
      services: [
        { en: 'Capital & Maintenance Dredging', hi: 'कैपिटल और रखरखाव ड्रेजिंग', ar: 'تجريف رأسمالي وصيانة' },
        { en: 'Land Reclamation',               hi: 'भूमि पुनर्ग्रहण',           ar: 'استصلاح الأراضي' },
        { en: 'Beach Nourishment',              hi: 'बीच न्यूट्रिशन',            ar: 'تغذية الشواطئ' },
        { en: 'Underwater Rock Blasting',       hi: 'अंडरवाटर रॉक ब्लास्टिंग',   ar: 'تفجير صخور تحت الماء' },
        { en: 'Channel Deepening',              hi: 'चैनल गहराई',                ar: 'تعميق القنوات' },
      ],
    },
    {
      id: '03',
      slug: 'infrastructure',
      company: 'Meka Infrastructure Pvt. Ltd.',
      title: 'Urban\nInfrastructure',
      tagline: { en: 'Building Livable Cities', hi: 'रहने योग्य शहरों का निर्माण', ar: 'بناء مدن صالحة للعيش' },
      description: {
        en: 'Taking up EPC work for the urban infrastructure segment — from intake and outfall pipelines to sheet piling, treatment plants, and ground improvement. We deliver the critical systems that cities depend on for water, sanitation, and resilience.',
        hi: 'शहरी बुनियादी ढाँचा खंड के लिए EPC कार्य — इनटेक और आउटफॉल पाइपलाइनों से लेकर शीट पाइलिंग, ट्रीटमेंट प्लांट और ग्राउंड इम्प्रूवमेंट तक। हम पानी, स्वच्छता और लचीलेपन के लिए शहरों की निर्भरता वाली महत्वपूर्ण प्रणालियाँ प्रदान करते हैं।',
        ar: 'تنفيذ أعمال EPC لقطاع البنية التحتية الحضرية — من خطوط المآخذ والمخارج إلى الخوازيق الصفائحية ومحطات المعالجة وتحسين التربة. نقدّم الأنظمة الحيوية التي تعتمد عليها المدن في المياه والصرف الصحي والمرونة.',
      },
      statValue: '100',
      statLabel: { en: 'MLD Nemmelli Plant', hi: 'MLD नेम्मेली प्लांट', ar: 'MLD محطة نيمّلي' },
      services: [
        { en: 'Intake & Outfall Pipelines',     hi: 'इनटेक और आउटफॉल पाइपलाइन',  ar: 'خطوط المآخذ والمخارج' },
        { en: 'Sheet Piling & Retaining Walls', hi: 'शीट पाइलिंग और रिटेनिंग वॉल', ar: 'الخوازيق الصفائحية والجدران الاستنادية' },
        { en: 'Water Treatment Plants',         hi: 'वाटर ट्रीटमेंट प्लांट',      ar: 'محطات معالجة المياه' },
        { en: 'Ground Improvement Works',       hi: 'ग्राउंड इम्प्रूवमेंट कार्य',  ar: 'أعمال تحسين التربة' },
        { en: 'Subsea Utility Installations',   hi: 'सबसी यूटिलिटी इंस्टॉलेशन',   ar: 'تركيبات المرافق تحت الماء' },
      ],
    },
    {
      id: '04',
      slug: 'port',
      company: 'India Ports',
      title: 'Port\nDevelopment',
      tagline: { en: 'Gateways of Commerce', hi: 'वाणिज्य के द्वार', ar: 'بوابات التجارة' },
      description: {
        en: "Design and development of ports on Build-Own-Operate-Share-Transfer basis. Our landmark Rewas Port project — a 50-year concession from the Government of Maharashtra — exemplifies our vision for creating India's deepest and most modern port facilities.",
        hi: 'Build-Own-Operate-Share-Transfer आधार पर बंदरगाहों का डिज़ाइन और विकास। हमारी लैंडमार्क Rewas Port परियोजना — महाराष्ट्र सरकार से 50 साल की रियायत — भारत के सबसे गहरे और सबसे आधुनिक बंदरगाहों के निर्माण के हमारे दृष्टिकोण का उदाहरण है।',
        ar: 'تصميم وتطوير الموانئ على أساس Build-Own-Operate-Share-Transfer. مشروع ميناء ريواس البارز — امتياز 50 عامًا من حكومة ماهاراشترا — يُجسّد رؤيتنا في بناء أعمق وأحدث الموانئ في الهند.',
      },
      statValue: '50yr',
      statLabel: { en: 'Rewas Concession', hi: 'Rewas रियायत', ar: 'امتياز ريواس' },
      services: [
        { en: 'Greenfield Port Development',     hi: 'ग्रीनफ़ील्ड बंदरगाह विकास',    ar: 'تطوير ميناء جديد كليًا' },
        { en: 'Terminal Design & Construction',  hi: 'टर्मिनल डिज़ाइन और निर्माण',  ar: 'تصميم وبناء المحطات' },
        { en: 'Navigation Channel Engineering',  hi: 'नेविगेशन चैनल इंजीनियरिंग',  ar: 'هندسة قنوات الملاحة' },
        { en: 'Breakwater & Berth Construction', hi: 'ब्रेकवाटर और बर्थ निर्माण',  ar: 'بناء كواسر الأمواج والأرصفة' },
        { en: 'Port Operations & Management',    hi: 'बंदरगाह संचालन और प्रबंधन',  ar: 'تشغيل وإدارة الموانئ' },
      ],
    },
    {
      id: '05',
      slug: 'estate',
      company: 'Meka Realty',
      title: 'Real\nEstate',
      tagline: { en: 'Premium Urban Living', hi: 'प्रीमियम शहरी आवास', ar: 'سكن حضري فاخر' },
      description: {
        en: "Developing quality residential and commercial spaces in India's largest real estate market. Meka Realty brings the same engineering rigor and commitment to excellence from our marine heritage into creating sustainable urban environments.",
        hi: 'भारत के सबसे बड़े रियल एस्टेट बाज़ार में गुणवत्तापूर्ण आवासीय और वाणिज्यिक स्थानों का विकास। Meka Realty अपनी समुद्री विरासत से वही इंजीनियरिंग सख़्ती और उत्कृष्टता की प्रतिबद्धता सतत शहरी वातावरण के निर्माण में लाती है।',
        ar: 'تطوير مساحات سكنية وتجارية عالية الجودة في أكبر سوق عقاري في الهند. تنقل Meka Realty الصرامة الهندسية والالتزام بالتميز من إرثنا البحري إلى خلق بيئات حضرية مستدامة.',
      },
      statValue: 'Mumbai',
      statLabel: { en: 'Flagship Market', hi: 'फ़्लैगशिप बाज़ार', ar: 'السوق الرئيسي' },
      services: [
        { en: 'Premium Residential Development',  hi: 'प्रीमियम आवासीय विकास',        ar: 'تطوير سكني فاخر' },
        { en: 'Commercial Complexes',             hi: 'वाणिज्यिक परिसर',               ar: 'مجمعات تجارية' },
        { en: 'Sustainable Design & Construction', hi: 'सतत डिज़ाइन और निर्माण',       ar: 'تصميم وبناء مستدام' },
        { en: 'Urban Regeneration Projects',      hi: 'शहरी पुनर्जनन परियोजनाएँ',     ar: 'مشاريع تجديد حضري' },
        { en: 'Mixed-use Developments',           hi: 'मिक्स्ड-यूज़ विकास',            ar: 'تطويرات متعددة الاستخدامات' },
      ],
    },
  ],

  // ── CTA ──
  ctaEyebrow: { en: 'Get in Touch', hi: 'संपर्क करें', ar: 'تواصل معنا' },
  ctaTitleLine1: { en: "Let's Build", hi: 'आइए बनाएं', ar: 'لنبنِ' },
  ctaTitleLine2: { en: 'Together.', hi: 'मिलकर।', ar: 'معاً.' },
  ctaDescription: {
    en: "Whether it's a new marine EPC project, port development, or urban infrastructure — we'd love to hear from you.",
    hi: 'चाहे यह एक नई समुद्री EPC परियोजना हो, बंदरगाह विकास हो, या शहरी बुनियादी ढांचा — हम आपसे सुनना चाहेंगे।',
    ar: 'سواء كان مشروع EPC بحري جديد، أو تطوير ميناء، أو بنية تحتية حضرية — يسعدنا سماعك.',
  },
  ctaPrimaryLabel: { en: 'Contact Us', hi: 'हमसे संपर्क करें', ar: 'اتصل بنا' },
  ctaSecondaryLabel: { en: 'View Projects', hi: 'परियोजनाएं देखें', ar: 'عرض المشاريع' },
}

const BUSINESS_PAGE_QUERY = `*[_id == "businessPage"][0]{
  heroEyebrow,
  heroTitleWord1,
  heroTitleWord2,
  heroDescription,
  verticals,
  ctaEyebrow,
  ctaTitleLine1,
  ctaTitleLine2,
  ctaDescription,
  ctaPrimaryLabel,
  ctaSecondaryLabel
}`

const hasContent = (v) => {
  if (v == null) return false
  if (typeof v === 'string') return v.length > 0
  if (Array.isArray(v)) return v.length > 0
  if (typeof v === 'object') return Object.values(v).some((x) => typeof x === 'string' && x.length > 0)
  return true
}

export function useBusinessPage() {
  const [businessPage, setBusinessPage] = useState(BUSINESS_PAGE_DEFAULTS)

  useEffect(() => {
    if (!import.meta.env.VITE_SANITY_PROJECT_ID) return
    let cancelled = false
    sanityClient
      .fetch(BUSINESS_PAGE_QUERY)
      .then((data) => {
        if (cancelled || !data) return
        const merged = {}
        for (const key of Object.keys(BUSINESS_PAGE_DEFAULTS)) {
          merged[key] = hasContent(data[key]) ? data[key] : BUSINESS_PAGE_DEFAULTS[key]
        }
        setBusinessPage(merged)
      })
      .catch(() => {})
    return () => {
      cancelled = true
    }
  }, [])

  return businessPage
}
