import { useEffect, useState } from 'react'
import { sanityClient } from '../lib/sanity.js'

const COMPANIES_PAGE_DEFAULTS = {
  // ── HERO ──
  heroEyebrow: { en: 'The Powerhouse', hi: 'शक्ति का केंद्र', ar: 'مركز القوة' },
  heroTitleLine1: { en: 'One Vision,', hi: 'एक दृष्टि,', ar: 'رؤية واحدة،' },
  heroTitleLine2: { en: 'Nine Forces.', hi: 'नौ शक्तियां।', ar: 'تسع قوى.' },
  heroDescription: {
    en: 'A unified force of specialized entities operating across marine construction, dredging, port development, infrastructure, and consulting since 1978.',
    hi: '1978 से समुद्री निर्माण, ड्रेजिंग, बंदरगाह विकास, बुनियादी ढांचा और परामर्श में काम करने वाली विशेष इकाइयों की एकीकृत शक्ति।',
    ar: 'قوة موحدة من كيانات متخصصة تعمل في البناء البحري والتجريف وتطوير الموانئ والبنية التحتية والاستشارات منذ 1978.',
  },

  // ── INDEX ──
  indexLabel: { en: 'Index', hi: 'सूची', ar: 'الفهرس' },
  estLabel: { en: 'Est.', hi: 'स्था.', ar: 'تأسست' },
  visitWebsiteLabel: { en: 'Visit Website', hi: 'वेबसाइट देखें', ar: 'زيارة الموقع' },

  // ── COMPANIES ──
  companies: [
    {
      slug: 'ammalines',
      name: 'Amma Lines',
      founded: '1982',
      website: 'http://www.ammalines.com/',
      layout: 'landscape',
      subtitle: { en: 'Marine & Coastal Construction', hi: 'समुद्री और तटीय निर्माण', ar: 'البناء البحري والساحلي' },
      description: {
        en: "The flagship marine construction arm of the Meka Group. With a 40-year legacy, Amma Lines has built most of India's major breakwaters — including the longest at Tuticorin Port — along with jetties, cofferdams, caissons, and coastal protection infrastructure.",
        hi: 'Meka Group की प्रमुख समुद्री निर्माण शाखा। 40 साल की विरासत के साथ, Amma Lines ने भारत के अधिकांश बड़े ब्रेकवाटर — जिसमें तूतीकोरिन बंदरगाह का सबसे लंबा भी शामिल है — के साथ-साथ जेट्टी, कोफरडैम, केसन और तट सुरक्षा बुनियादी ढाँचे का निर्माण किया है।',
        ar: 'الذراع الرئيسية للبناء البحري في مجموعة Meka. مع إرث يمتد 40 عامًا، بنت Amma Lines معظم كواسر الأمواج الكبرى في الهند — بما في ذلك الأطول في ميناء توتيكورين — إلى جانب الأرصفة والسدود والكيسونات والبنية التحتية لحماية السواحل.',
      },
      specialties: [
        { en: 'Breakwater Construction', hi: 'ब्रेकवाटर निर्माण',         ar: 'بناء كواسر الأمواج' },
        { en: 'Pile & Block Jetties',    hi: 'पाइल और ब्लॉक जेट्टी',       ar: 'أرصفة على ركائز وكتل' },
        { en: 'Sheet Piling',            hi: 'शीट पाइलिंग',                ar: 'خوازيق صفائحية' },
        { en: 'Cofferdam & Caisson Works', hi: 'कोफरडैम और केसन कार्य',    ar: 'أعمال السدود والكيسونات' },
        { en: 'Soil Improvement',        hi: 'मिट्टी सुधार',               ar: 'تحسين التربة' },
      ],
      statValue: '70%',
      statLabel: { en: "Of Maharashtra's Jetties", hi: 'महाराष्ट्र की जेट्टियों में', ar: 'من أرصفة ماهاراشترا' },
    },
    {
      slug: 'mekadredging',
      name: 'Meka Dredging',
      founded: '1990',
      website: '',
      layout: 'portrait-right',
      subtitle: { en: 'Capital Dredging & Reclamation', hi: 'कैपिटल ड्रेजिंग और पुनर्ग्रहण', ar: 'التجريف الرأسمالي والاستصلاح' },
      description: {
        en: "One of India's leading capital dredging companies, operating an advanced fleet of cutter suction and trailing suction hopper dredgers. From deep-water channel maintenance to large-scale land reclamation, we reshape India's coastline.",
        hi: 'भारत की अग्रणी कैपिटल ड्रेजिंग कंपनियों में से एक, कटर सक्शन और ट्रेलिंग सक्शन हॉपर ड्रेजरों के उन्नत बेड़े का संचालन करती है। गहरे पानी की चैनल रखरखाव से लेकर बड़े पैमाने पर भूमि पुनर्ग्रहण तक, हम भारत की तटरेखा को आकार देते हैं।',
        ar: 'إحدى الشركات الرائدة في الهند للتجريف الرأسمالي، تُشغّل أسطولًا متطورًا من جرّافات الشفط القاطعة وجرّافات الشفط المقطور. من صيانة قنوات المياه العميقة إلى استصلاح أراضٍ واسعة، نُعيد تشكيل الساحل الهندي.',
      },
      specialties: [
        { en: 'CSD & TSHD Operations', hi: 'CSD और TSHD संचालन', ar: 'عمليات CSD و TSHD' },
        { en: 'Land Reclamation',      hi: 'भूमि पुनर्ग्रहण',     ar: 'استصلاح الأراضي' },
        { en: 'Rock Dredging',         hi: 'रॉक ड्रेजिंग',         ar: 'تجريف الصخور' },
        { en: 'Channel Deepening',     hi: 'चैनल गहराई',          ar: 'تعميق القنوات' },
        { en: 'Beach Nourishment',     hi: 'बीच न्यूट्रिशन',       ar: 'تغذية الشواطئ' },
      ],
      statValue: '150+',
      statLabel: { en: 'Dredging Projects', hi: 'ड्रेजिंग परियोजनाएँ', ar: 'مشاريع تجريف' },
    },
    {
      slug: 'mekainfra',
      name: 'Meka Infrastructure',
      founded: '1995',
      website: '',
      layout: 'portrait-left',
      subtitle: { en: 'Subsea Pipelines & Outfalls', hi: 'सबसी पाइपलाइन और आउटफॉल', ar: 'الخطوط البحرية والمخارج' },
      description: {
        en: 'A leader in subsea intake and outfall pipeline engineering. Meka Infrastructure provides critical infrastructure for desalination plants and industrial cooling systems — including the landmark 100 MLD Nemmelli Desalination Plant.',
        hi: 'सबसी इनटेक और आउटफॉल पाइपलाइन इंजीनियरिंग में अग्रणी। Meka Infrastructure डिसैलिनेशन प्लांट और औद्योगिक कूलिंग सिस्टम के लिए महत्वपूर्ण बुनियादी ढाँचा प्रदान करता है — जिसमें लैंडमार्क 100 MLD नेम्मेली डिसैलिनेशन प्लांट भी शामिल है।',
        ar: 'رائدة في هندسة خطوط المآخذ والمخارج تحت البحر. تقدّم Meka Infrastructure بنية تحتية حيوية لمحطات التحلية وأنظمة التبريد الصناعية — بما في ذلك محطة تحلية نيمّلي التاريخية بطاقة 100 MLD.',
      },
      specialties: [
        { en: 'Subsea Intake Pipelines',     hi: 'सबसी इनटेक पाइपलाइन',     ar: 'خطوط مآخذ تحت البحر' },
        { en: 'Outfall Systems',             hi: 'आउटफॉल सिस्टम',           ar: 'أنظمة المخارج' },
        { en: 'Desalination Infrastructure', hi: 'डिसैलिनेशन बुनियादी ढाँचा', ar: 'بنية التحلية' },
        { en: 'Trenching & Backfilling',     hi: 'ट्रेंचिंग और बैकफिलिंग',   ar: 'الخنادق والردم' },
        { en: 'Pipeline Installation',       hi: 'पाइपलाइन स्थापना',        ar: 'تركيب الخطوط' },
      ],
      statValue: '100 MLD',
      statLabel: { en: 'Nemmelli Plant', hi: 'नेम्मेली प्लांट', ar: 'محطة نيمّلي' },
    },
    {
      slug: 'mekaheavy',
      name: 'Meka Heavy Engineering',
      founded: '2005',
      website: '',
      layout: 'landscape',
      subtitle: { en: 'Offshore Fabrication & Shipbuilding', hi: 'ऑफशोर फैब्रिकेशन और जहाज़ निर्माण', ar: 'التصنيع البحري وبناء السفن' },
      description: {
        en: 'A strategic arm dedicated to high-capacity fabrication, shipbuilding, and structural solutions for the offshore and energy sectors. Delivering heavy-lift platforms and marine structures built to the most demanding specifications.',
        hi: 'उच्च-क्षमता फैब्रिकेशन, जहाज़ निर्माण और ऑफशोर और ऊर्जा क्षेत्रों के लिए संरचनात्मक समाधानों को समर्पित एक रणनीतिक शाखा। सबसे मांग वाले विनिर्देशों के अनुसार निर्मित भारी-लिफ्ट प्लेटफॉर्म और समुद्री संरचनाएँ प्रदान करती है।',
        ar: 'ذراع استراتيجية مخصصة للتصنيع عالي الطاقة وبناء السفن والحلول الإنشائية لقطاعَي البحر والطاقة. تُقدّم منصات رفع ثقيل ومنشآت بحرية مبنية وفق أعلى المواصفات.',
      },
      specialties: [
        { en: 'Heavy Fabrication',     hi: 'भारी फैब्रिकेशन',     ar: 'التصنيع الثقيل' },
        { en: 'Shipbuilding',          hi: 'जहाज़ निर्माण',        ar: 'بناء السفن' },
        { en: 'Offshore Structures',   hi: 'ऑफशोर संरचनाएँ',      ar: 'منشآت بحرية' },
        { en: 'Structural Steel Works', hi: 'स्ट्रक्चरल स्टील कार्य', ar: 'أعمال حديد هيكلي' },
        { en: 'Marine Equipment',      hi: 'समुद्री उपकरण',        ar: 'معدات بحرية' },
      ],
      statValue: 'Heavy',
      statLabel: { en: 'Lift Specialists', hi: 'लिफ्ट विशेषज्ञ', ar: 'خبراء الرفع' },
    },
    {
      slug: 'indiaports',
      name: 'India Ports',
      founded: '2002',
      website: '',
      layout: 'portrait-right',
      subtitle: { en: 'Port Development & Operations', hi: 'बंदरगाह विकास और संचालन', ar: 'تطوير وتشغيل الموانئ' },
      description: {
        en: "The port development division managing the landmark Rewas Port — a 50-year concession from the Government of Maharashtra. India Ports is creating one of India's deepest and most modern port facilities through a partnership with Reliance.",
        hi: 'लैंडमार्क Rewas Port का प्रबंधन करने वाली बंदरगाह विकास शाखा — महाराष्ट्र सरकार से 50 साल की रियायत। India Ports Reliance के साथ साझेदारी के माध्यम से भारत के सबसे गहरे और सबसे आधुनिक बंदरगाह का निर्माण कर रहा है।',
        ar: 'قسم تطوير الموانئ الذي يدير ميناء ريواس — امتياز 50 عامًا من حكومة ماهاراشترا. تعمل India Ports على إنشاء أحد أعمق وأحدث مرافق الموانئ في الهند بالشراكة مع Reliance.',
      },
      specialties: [
        { en: 'Greenfield Port Development', hi: 'ग्रीनफ़ील्ड बंदरगाह विकास', ar: 'تطوير ميناء جديد كليًا' },
        { en: 'BOOST Model',                 hi: 'BOOST मॉडल',              ar: 'نموذج BOOST' },
        { en: 'Terminal Operations',         hi: 'टर्मिनल संचालन',           ar: 'تشغيل المحطات' },
        { en: 'Navigation Engineering',      hi: 'नेविगेशन इंजीनियरिंग',     ar: 'هندسة الملاحة' },
        { en: 'Port Infrastructure',         hi: 'बंदरगाह बुनियादी ढाँचा',   ar: 'بنية الموانئ' },
      ],
      statValue: '50yr',
      statLabel: { en: 'Rewas Concession', hi: 'Rewas रियायत', ar: 'امتياز ريواس' },
    },
    {
      slug: 'virajce',
      name: 'Viraj Consulting Engineers',
      founded: '1998',
      website: '',
      layout: 'portrait-left',
      subtitle: { en: 'Marine & Geotechnical Consulting', hi: 'समुद्री और जियोटेक्निकल परामर्श', ar: 'الاستشارات البحرية والجيوتقنية' },
      description: {
        en: 'End-to-end project management, hydrographic surveys, and technical consultancy for coastal and marine infrastructure. Viraj provides the engineering intelligence that underpins complex offshore and harbor projects.',
        hi: 'तटीय और समुद्री बुनियादी ढाँचे के लिए अंत-से-अंत परियोजना प्रबंधन, हाइड्रोग्राफिक सर्वेक्षण और तकनीकी परामर्श। Viraj जटिल ऑफशोर और हार्बर परियोजनाओं को रेखांकित करने वाली इंजीनियरिंग बुद्धिमत्ता प्रदान करता है।',
        ar: 'إدارة مشاريع متكاملة ومسوحات هيدروغرافية واستشارات تقنية للبنية الساحلية والبحرية. تُقدّم Viraj الذكاء الهندسي الذي يدعم أعقد المشاريع البحرية ومشاريع المرافئ.',
      },
      specialties: [
        { en: 'Hydrographic Surveys',       hi: 'हाइड्रोग्राफिक सर्वेक्षण', ar: 'مسوحات هيدروغرافية' },
        { en: 'Geotechnical Investigations', hi: 'जियोटेक्निकल जाँच',     ar: 'تحقيقات جيوتقنية' },
        { en: 'Project Management',         hi: 'परियोजना प्रबंधन',       ar: 'إدارة المشاريع' },
        { en: 'Marine Design Consulting',   hi: 'समुद्री डिज़ाइन परामर्श',  ar: 'استشارات التصميم البحري' },
        { en: 'Environmental Assessments',  hi: 'पर्यावरण आकलन',          ar: 'تقييمات بيئية' },
      ],
      statValue: 'PMC',
      statLabel: { en: 'Marine Specialists', hi: 'समुद्री विशेषज्ञ', ar: 'متخصصون بحريون' },
    },
    {
      slug: 'mekaconsultants',
      name: 'Meka Consultants',
      founded: '2000',
      website: '',
      layout: 'landscape',
      subtitle: { en: 'Strategic & Management Advisory', hi: 'रणनीतिक और प्रबंधन सलाहकार', ar: 'الاستشارة الاستراتيجية والإدارية' },
      description: {
        en: "A multidisciplinary consultancy offering strategic management, human capital services, and technical advisory. From IT solutions and manpower to financial consulting, Meka Consultants supports the group's diverse operations.",
        hi: 'रणनीतिक प्रबंधन, मानव पूंजी सेवाएँ और तकनीकी सलाहकार प्रदान करने वाली एक बहु-विषयक परामर्श फर्म। IT समाधान और जनशक्ति से लेकर वित्तीय परामर्श तक, Meka Consultants समूह के विविध संचालन का समर्थन करता है।',
        ar: 'استشارات متعددة التخصصات تقدّم إدارة استراتيجية وخدمات رأس المال البشري واستشارات تقنية. من حلول تكنولوجيا المعلومات والموارد البشرية إلى الاستشارات المالية، تدعم Meka Consultants العمليات المتنوعة للمجموعة.',
      },
      specialties: [
        { en: 'Strategic Advisory',      hi: 'रणनीतिक सलाहकार',         ar: 'استشارات استراتيجية' },
        { en: 'Human Capital Services',  hi: 'मानव पूंजी सेवाएँ',        ar: 'خدمات رأس المال البشري' },
        { en: 'IT Solutions',            hi: 'IT समाधान',               ar: 'حلول تكنولوجيا المعلومات' },
        { en: 'Financial Consulting',    hi: 'वित्तीय परामर्श',          ar: 'استشارات مالية' },
        { en: 'Project Advisory',        hi: 'परियोजना सलाहकार',         ar: 'استشارات المشاريع' },
      ],
      statValue: 'Multi',
      statLabel: { en: 'Disciplinary', hi: 'विषयक', ar: 'متعدد التخصصات' },
    },
    {
      slug: 'meka-realty',
      name: 'Meka Realty',
      founded: '2015',
      website: '',
      layout: 'portrait-right',
      subtitle: { en: 'Premium Urban Development', hi: 'प्रीमियम शहरी विकास', ar: 'التطوير الحضري الفاخر' },
      description: {
        en: 'Entering the real estate space with a vision to create sustainable, functional urban environments. Meka Realty brings the same engineering rigor from our marine heritage into premium residential and commercial developments in Mumbai.',
        hi: 'सतत, कार्यात्मक शहरी वातावरण बनाने के दृष्टिकोण के साथ रियल एस्टेट स्पेस में प्रवेश। Meka Realty मुंबई में प्रीमियम आवासीय और वाणिज्यिक विकास में अपनी समुद्री विरासत से वही इंजीनियरिंग सख़्ती लाती है।',
        ar: 'الدخول إلى مجال العقارات برؤية خلق بيئات حضرية مستدامة وعملية. تنقل Meka Realty الصرامة الهندسية من إرثنا البحري إلى تطويرات سكنية وتجارية فاخرة في مومباي.',
      },
      specialties: [
        { en: 'Residential Development', hi: 'आवासीय विकास',         ar: 'تطوير سكني' },
        { en: 'Commercial Properties',   hi: 'वाणिज्यिक संपत्तियाँ',  ar: 'عقارات تجارية' },
        { en: 'Sustainable Design',      hi: 'सतत डिज़ाइन',           ar: 'تصميم مستدام' },
        { en: 'Urban Regeneration',      hi: 'शहरी पुनर्जनन',         ar: 'تجديد حضري' },
        { en: 'Mixed-use Projects',      hi: 'मिक्स्ड-यूज़ परियोजनाएँ', ar: 'مشاريع متعددة الاستخدامات' },
      ],
      statValue: 'Mumbai',
      statLabel: { en: 'Flagship Market', hi: 'फ़्लैगशिप बाज़ार', ar: 'السوق الرئيسي' },
    },
    {
      slug: 'meka-education',
      name: 'Meka Education',
      founded: '2022',
      website: '',
      layout: 'portrait-left',
      subtitle: { en: 'Knowledge & Skill Development', hi: 'ज्ञान और कौशल विकास', ar: 'المعرفة وتنمية المهارات' },
      description: {
        en: 'Foraying into the education sector with a commitment to building the next generation of engineering talent. Meka Education focuses on maritime studies, vocational training, and technical skill development programs.',
        hi: 'इंजीनियरिंग प्रतिभा की अगली पीढ़ी के निर्माण की प्रतिबद्धता के साथ शिक्षा क्षेत्र में प्रवेश। Meka Education समुद्री अध्ययन, व्यावसायिक प्रशिक्षण और तकनीकी कौशल विकास कार्यक्रमों पर केंद्रित है।',
        ar: 'الدخول إلى قطاع التعليم بالتزام ببناء الجيل القادم من المواهب الهندسية. تركّز Meka Education على الدراسات البحرية والتدريب المهني وبرامج تنمية المهارات التقنية.',
      },
      specialties: [
        { en: 'Maritime Studies',     hi: 'समुद्री अध्ययन',     ar: 'دراسات بحرية' },
        { en: 'Vocational Training',  hi: 'व्यावसायिक प्रशिक्षण', ar: 'تدريب مهني' },
        { en: 'Technical Education',  hi: 'तकनीकी शिक्षा',      ar: 'تعليم تقني' },
        { en: 'Skill Development',    hi: 'कौशल विकास',         ar: 'تنمية المهارات' },
        { en: 'Industry Partnerships', hi: 'उद्योग साझेदारी',    ar: 'شراكات صناعية' },
      ],
      statValue: 'Next',
      statLabel: { en: 'Generation', hi: 'पीढ़ी', ar: 'الجيل' },
    },
  ],

  // ── CTA ──
  ctaEyebrow: { en: 'Work With Us', hi: 'हमारे साथ काम करें', ar: 'اعمل معنا' },
  ctaTitleLine1: { en: 'One Legacy,', hi: 'एक विरासत,', ar: 'إرث واحد،' },
  ctaTitleLine2: { en: 'Infinite Reach.', hi: 'असीमित पहुंच।', ar: 'انتشار لا حدود له.' },
  ctaDescription: {
    en: "Each company brings specialized expertise. Together, they deliver integrated solutions for the world's most demanding maritime and infrastructure projects.",
    hi: 'प्रत्येक कंपनी विशेष विशेषज्ञता लाती है। साथ मिलकर, वे दुनिया की सबसे कठिन समुद्री और बुनियादी ढांचा परियोजनाओं के लिए एकीकृत समाधान प्रदान करते हैं।',
    ar: 'كل شركة تجلب خبرة متخصصة. معاً، تقدم حلولاً متكاملة لأصعب المشاريع البحرية والبنية التحتية في العالم.',
  },
  ctaPrimaryLabel: { en: 'Get in Touch', hi: 'संपर्क करें', ar: 'تواصل معنا' },
  ctaSecondaryLabel: { en: 'View Projects', hi: 'परियोजनाएं देखें', ar: 'عرض المشاريع' },
}

const COMPANIES_PAGE_QUERY = `*[_id == "companiesPage"][0]{
  heroEyebrow,
  heroTitleLine1,
  heroTitleLine2,
  heroDescription,
  indexLabel,
  estLabel,
  visitWebsiteLabel,
  companies,
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

export function useCompaniesPage() {
  const [companiesPage, setCompaniesPage] = useState(COMPANIES_PAGE_DEFAULTS)

  useEffect(() => {
    if (!import.meta.env.VITE_SANITY_PROJECT_ID) return
    let cancelled = false
    sanityClient
      .fetch(COMPANIES_PAGE_QUERY)
      .then((data) => {
        if (cancelled || !data) return
        const merged = {}
        for (const key of Object.keys(COMPANIES_PAGE_DEFAULTS)) {
          merged[key] = hasContent(data[key]) ? data[key] : COMPANIES_PAGE_DEFAULTS[key]
        }
        setCompaniesPage(merged)
      })
      .catch(() => {})
    return () => {
      cancelled = true
    }
  }, [])

  return companiesPage
}
