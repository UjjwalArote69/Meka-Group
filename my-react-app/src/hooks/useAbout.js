import { useEffect, useState } from 'react'
import { sanityClient } from '../lib/sanity.js'

const ABOUT_DEFAULTS = {
  sectionLabel: { en: 'About Us', hi: 'हमारे बारे में', ar: 'من نحن' },
  sectionTitle: { en: 'Our Legacy', hi: 'हमारी विरासत', ar: 'إرثنا' },
  chapters: [
    {
      year: '1979',
      title: {
        en: 'Establishment in Mumbai',
        hi: 'मुंबई में स्थापना',
        ar: 'التأسيس في مومباي',
      },
      text: {
        en: "Meka Group began its journey in Mumbai under the vision of Dr. Meka Vijay Papa Rao (PhD, UIUC), focusing on specialized civil and marine engineering solutions for India's growing coastline.",
        hi: 'मेका ग्रुप ने डॉ. मेका विजय पापा राव (PhD, UIUC) की दूरदर्शिता में मुंबई में अपनी यात्रा शुरू की, भारत के बढ़ते तटरेखा के लिए विशेष सिविल और समुद्री इंजीनियरिंग समाधानों पर ध्यान केंद्रित किया।',
        ar: 'بدأت مجموعة ميكا رحلتها في مومباي تحت رؤية الدكتور ميكا فيجاي بابا راو (دكتوراه، UIUC)، مع التركيز على حلول الهندسة المدنية والبحرية المتخصصة لساحل الهند المتنامي.',
      },
    },
    {
      year: '1982',
      title: {
        en: 'Foundation of Amma Lines',
        hi: 'अम्मा लाइन्स की स्थापना',
        ar: 'تأسيس أمّا لاينز',
      },
      text: {
        en: 'The group established Amma Lines Ltd, which became a cornerstone of the organization, eventually building nearly 70% of the new jetties and ports across Maharashtra and Tamil Nadu.',
        hi: 'समूह ने अम्मा लाइन्स लिमिटेड की स्थापना की, जो संगठन की आधारशिला बन गई, अंततः महाराष्ट्र और तमिलनाडु में लगभग 70% नई घाटों और बंदरगाहों का निर्माण किया।',
        ar: 'أسست المجموعة شركة أمّا لاينز المحدودة، التي أصبحت حجر الزاوية للمنظمة، حيث بنت في نهاية المطاف ما يقرب من 70% من الأرصفة والموانئ الجديدة في ماهاراشترا وتاميل نادو.',
      },
    },
    {
      year: '1995',
      title: {
        en: 'Leadership in Subsea Engineering',
        hi: 'सबसी इंजीनियरिंग में नेतृत्व',
        ar: 'الريادة في هندسة الأعماق',
      },
      text: {
        en: 'Meka Infrastructure was founded, establishing the group as a leader in subsea intake and outfall pipelines, providing critical infrastructure for desalination and industrial cooling systems.',
        hi: 'मेका इंफ्रास्ट्रक्चर की स्थापना हुई, जिसने समूह को सबसी इनटेक और आउटफॉल पाइपलाइनों में अग्रणी के रूप में स्थापित किया, विलवणीकरण और औद्योगिक शीतलन प्रणालियों के लिए महत्वपूर्ण बुनियादी ढांचा प्रदान किया।',
        ar: 'تأسست ميكا للبنية التحتية، مما أسس المجموعة كرائدة في أنابيب السحب والتصريف تحت البحر، وتوفير بنية تحتية حيوية لأنظمة التحلية والتبريد الصناعي.',
      },
    },
    {
      year: '2002',
      title: {
        en: 'The Rewas Port Milestone',
        hi: 'रेवास बंदरगाह मील का पत्थर',
        ar: 'إنجاز ميناء ريواس',
      },
      text: {
        en: "The Government of Maharashtra awarded the group a 50-year concession to develop the Rewas Port. This mega-project, later partnered with Reliance, aimed to create one of India's deepest ports.",
        hi: 'महाराष्ट्र सरकार ने समूह को रेवास बंदरगाह विकसित करने के लिए 50 साल की रियायत दी। यह मेगा-प्रोजेक्ट, बाद में रिलायंस के साथ साझेदारी में, भारत के सबसे गहरे बंदरगाहों में से एक बनाने का लक्ष्य रखता था।',
        ar: 'منحت حكومة ماهاراشترا المجموعة امتيازاً لمدة 50 عاماً لتطوير ميناء ريواس. هذا المشروع العملاق، بالشراكة لاحقاً مع ريلاينس، هدف إلى إنشاء أحد أعمق موانئ الهند.',
      },
    },
    {
      year: '2010',
      title: {
        en: 'Deep-Water Port Innovation',
        hi: 'गहरे पानी के बंदरगाह नवाचार',
        ar: 'ابتكار ميناء المياه العميقة',
      },
      text: {
        en: 'Based on proprietary design patents, the group received approval to develop a ₹6,000 crore deep-water port in West Bengal, further diversifying its port development portfolio.',
        hi: 'स्वामित्व डिजाइन पेटेंट के आधार पर, समूह को पश्चिम बंगाल में ₹6,000 करोड़ के गहरे पानी के बंदरगाह को विकसित करने की मंजूरी मिली, जिसने अपने बंदरगाह विकास पोर्टफोलियो को और विविधता प्रदान की।',
        ar: 'بناءً على براءات اختراع تصميم حصرية، حصلت المجموعة على موافقة لتطوير ميناء مياه عميقة بقيمة ₹6,000 كرور في غرب البنغال، مما زاد من تنويع محفظة تطوير الموانئ.',
      },
    },
    {
      year: '2013',
      title: {
        en: 'Nemmelli Desalination Success',
        hi: 'नेमेली विलवणीकरण सफलता',
        ar: 'نجاح محطة تحلية نيميلي',
      },
      text: {
        en: 'Successfully executed the landmark 100 MLD subsea intake outfall pipeline for the Nemmelli Desalination Plant, demonstrating world-class precision in subsea utility installations.',
        hi: 'नेमेली विलवणीकरण संयंत्र के लिए ऐतिहासिक 100 MLD सबसी इनटेक आउटफॉल पाइपलाइन को सफलतापूर्वक क्रियान्वित किया, सबसी उपयोगिता प्रतिष्ठानों में विश्व स्तरीय सटीकता का प्रदर्शन किया।',
        ar: 'نفذت بنجاح خط أنابيب السحب والتصريف تحت البحر بسعة 100 MLD لمحطة تحلية نيميلي، مما أظهر دقة عالمية المستوى في تركيبات المرافق تحت البحر.',
      },
    },
    {
      year: '2018',
      title: {
        en: 'International Expansion',
        hi: 'अंतर्राष्ट्रीय विस्तार',
        ar: 'التوسع الدولي',
      },
      text: {
        en: 'Leveraging its diverse fleet of dredgers and marine equipment, the group expanded operations into the Middle East, notably securing infrastructure and environmental roles in Qatar.',
        hi: 'ड्रेजरों और समुद्री उपकरणों के अपने विविध बेड़े का लाभ उठाते हुए, समूह ने मध्य पूर्व में संचालन का विस्तार किया, विशेष रूप से कतर में बुनियादी ढांचा और पर्यावरणीय भूमिकाएं हासिल कीं।',
        ar: 'مستفيدة من أسطولها المتنوع من الحفارات والمعدات البحرية، وسعت المجموعة عملياتها إلى الشرق الأوسط، ولا سيما تأمين أدوار البنية التحتية والبيئة في قطر.',
      },
    },
    {
      year: '2024',
      title: {
        en: 'Global Marine EPC Leader',
        hi: 'वैश्विक समुद्री EPC नेता',
        ar: 'رائد عالمي في EPC البحري',
      },
      text: {
        en: 'Today, Meka Group is recognized as a premier partner for Marine EPC, dredging, and offshore installations, serving government agencies and global energy corporations with a focus on innovation.',
        hi: 'आज, मेका ग्रुप को समुद्री EPC, ड्रेजिंग और अपतटीय प्रतिष्ठानों के लिए एक प्रमुख भागीदार के रूप में मान्यता प्राप्त है, जो नवाचार पर ध्यान केंद्रित करते हुए सरकारी एजेंसियों और वैश्विक ऊर्जा निगमों की सेवा करता है।',
        ar: 'اليوم، تُعترف مجموعة ميكا كشريك رائد في EPC البحري والتجريف والتركيبات البحرية، تخدم الوكالات الحكومية وشركات الطاقة العالمية مع التركيز على الابتكار.',
      },
    },
  ],
}

const ABOUT_QUERY = `*[_id == "about"][0]{
  sectionLabel,
  sectionTitle,
  chapters
}`

const hasContent = (v) => {
  if (v == null) return false
  if (typeof v === 'string') return v.length > 0
  if (Array.isArray(v)) return v.length > 0
  if (typeof v === 'object') return Object.values(v).some((x) => typeof x === 'string' && x.length > 0)
  return true
}

export function useAbout() {
  const [about, setAbout] = useState(ABOUT_DEFAULTS)

  useEffect(() => {
    if (!import.meta.env.VITE_SANITY_PROJECT_ID) return
    let cancelled = false
    sanityClient
      .fetch(ABOUT_QUERY)
      .then((data) => {
        if (cancelled || !data) return
        const merged = {}
        for (const key of Object.keys(ABOUT_DEFAULTS)) {
          merged[key] = hasContent(data[key]) ? data[key] : ABOUT_DEFAULTS[key]
        }
        setAbout(merged)
      })
      .catch(() => {})
    return () => {
      cancelled = true
    }
  }, [])

  return about
}
