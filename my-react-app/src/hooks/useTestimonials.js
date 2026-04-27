import { useEffect, useState } from 'react'
import { sanityClient } from '../lib/sanity.js'

const TESTIMONIALS_DEFAULTS = {
  sectionLabel: { en: 'Client Perspectives', hi: 'ग्राहक दृष्टिकोण', ar: 'آراء العملاء' },
  entries: [
    {
      id: '01',
      name: 'CR Pradeep',
      quote: {
        en: 'We are immensely satisfied with the performance of Meka while executing the work. They are committed to achieve the targets and complete the work. They have got a large marine spread and extensive experience to take up challenging marine works. We wish them success in their future ventures.',
        hi: 'कार्य निष्पादन के दौरान Meka के प्रदर्शन से हम अत्यंत संतुष्ट हैं। वे लक्ष्यों को प्राप्त करने और कार्य पूरा करने के लिए प्रतिबद्ध हैं। उनके पास एक विशाल समुद्री बेड़ा और चुनौतीपूर्ण समुद्री कार्यों को संभालने का व्यापक अनुभव है। हम उनके भविष्य के उपक्रमों के लिए शुभकामनाएँ देते हैं।',
        ar: 'نحن راضون تمامًا عن أداء Meka خلال تنفيذ العمل. هم ملتزمون بتحقيق الأهداف وإنجاز العمل. لديهم عتاد بحري ضخم وخبرة واسعة في تولي الأعمال البحرية الصعبة. نتمنى لهم التوفيق في مشاريعهم القادمة.',
      },
      role: {
        en: 'Additional GM - Projects, Vatech Wabag',
        hi: 'अतिरिक्त GM — परियोजनाएँ, Vatech Wabag',
        ar: 'مساعد المدير العام — المشاريع، Vatech Wabag',
      },
    },
    {
      id: '02',
      name: 'Vipinkant Doshi',
      quote: {
        en: 'Meka Dredging have performed to our entire satisfaction while executing this work. They have got the experienced and skilled staff to execute such and similar works. We wish them success for their future ventures!',
        hi: 'इस कार्य को निष्पादित करते समय Meka Dredging ने हमारी पूर्ण संतुष्टि के अनुरूप प्रदर्शन किया। ऐसे और समान कार्यों को निष्पादित करने के लिए उनके पास अनुभवी और कुशल कर्मचारी हैं। हम उनके भविष्य के उपक्रमों की सफलता की कामना करते हैं!',
        ar: 'قدمت Meka Dredging أداءً يرضينا تمامًا أثناء تنفيذ هذا العمل. لديهم طاقم من الخبراء والمهرة لتنفيذ مثل هذه الأعمال وما شابهها. نتمنى لهم التوفيق في مشاريعهم المستقبلية!',
      },
      role: {
        en: 'Reliance Industries',
        hi: 'Reliance Industries',
        ar: 'Reliance Industries',
      },
    },
    {
      id: '03',
      name: 'AK Upadhyay',
      quote: {
        en: 'The work has been carried out in an excellent workmanship like manner. The project displayed Amma Lines professionalism and technical expertise for marine works. They have got the experienced staff and a team of specialized underwater divers to take up challenging work. They have also got a large fleet of marine equipments and dredging equipments. We are immensely satisfied with their performance. We strongly recommend Amma Lines for such and similar marine construction works and wish them all the success for their ventures.',
        hi: 'कार्य उत्कृष्ट कारीगरी के साथ सम्पन्न किया गया है। परियोजना ने समुद्री कार्यों के लिए Amma Lines की व्यावसायिकता और तकनीकी विशेषज्ञता प्रदर्शित की। चुनौतीपूर्ण कार्य के लिए उनके पास अनुभवी कर्मचारी और विशेष अंडरवाटर गोताखोरों की टीम है। उनके पास समुद्री उपकरणों और ड्रेजिंग उपकरणों का बड़ा बेड़ा भी है। हम उनके प्रदर्शन से अत्यंत संतुष्ट हैं। हम ऐसे और समान समुद्री निर्माण कार्यों के लिए Amma Lines की पुरज़ोर अनुशंसा करते हैं।',
        ar: 'تم تنفيذ العمل بإتقان ممتاز. أظهرت المشروع احترافية Amma Lines وخبرتهم التقنية في الأعمال البحرية. لديهم طاقم متمرّس وفريق من الغواصين المتخصصين لتولي الأعمال الصعبة. كما يمتلكون أسطولًا كبيرًا من المعدات البحرية ومعدات التجريف. نحن راضون تمامًا عن أدائهم ونوصي بقوة باللجوء إلى Amma Lines لمثل هذه الأعمال البحرية.',
      },
      role: {
        en: 'DGM - Civil Projects, L & T Hazira Works',
        hi: 'DGM — सिविल परियोजनाएँ, L & T हजीरा कार्य',
        ar: 'نائب المدير العام — المشاريع المدنية، L & T حازيرة',
      },
    },
  ],
}

const TESTIMONIALS_QUERY = `*[_id == "testimonials"][0]{
  sectionLabel,
  entries
}`

const hasContent = (v) => {
  if (v == null) return false
  if (typeof v === 'string') return v.length > 0
  if (Array.isArray(v)) return v.length > 0
  if (typeof v === 'object') return Object.values(v).some((x) => typeof x === 'string' && x.length > 0)
  return true
}

export function useTestimonials() {
  const [testimonials, setTestimonials] = useState(TESTIMONIALS_DEFAULTS)

  useEffect(() => {
    if (!import.meta.env.VITE_SANITY_PROJECT_ID) return
    let cancelled = false
    sanityClient
      .fetch(TESTIMONIALS_QUERY)
      .then((data) => {
        if (cancelled || !data) return
        const merged = {}
        for (const key of Object.keys(TESTIMONIALS_DEFAULTS)) {
          merged[key] = hasContent(data[key]) ? data[key] : TESTIMONIALS_DEFAULTS[key]
        }
        setTestimonials(merged)
      })
      .catch(() => {})
    return () => {
      cancelled = true
    }
  }, [])

  return testimonials
}
