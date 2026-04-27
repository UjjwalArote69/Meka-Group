// Shared default content for the Fleet section. Used by:
//   - src/hooks/useFleet.js (rendered as fallback when Sanity has no value)
//   - scripts/upload-images.mjs (seeds the Sanity doc with full vessel data
//     so Studio shows real names/types instead of "(no name)" placeholders)
//
// Keep this file plain ESM with no React/Vite-only imports — Node imports it
// from the upload script.

export const FLEET_DEFAULTS = {
  sectionLabel: { en: 'Advanced Machinery', hi: 'उन्नत मशीनरी', ar: 'الآلات المتقدمة' },
  ourLabel: { en: 'Our', hi: 'हमारा', ar: 'أسطولنا' },
  fleetLabel: { en: 'Fleet.', hi: 'बेड़ा।', ar: 'البحري.' },
  description: {
    en: 'Equipped with a state-of-the-art maritime fleet, we execute the most complex coastal and deep-water engineering projects worldwide. Explore our vessels below.',
    hi: 'अत्याधुनिक समुद्री बेड़े से लैस, हम विश्व भर में सबसे जटिल तटीय और गहरे पानी की इंजीनियरिंग परियोजनाओं को क्रियान्वित करते हैं। नीचे हमारे जहाजों का अन्वेषण करें।',
    ar: 'مجهزون بأسطول بحري متطور، ننفذ أكثر المشاريع الهندسية تعقيداً في المناطق الساحلية والمياه العميقة حول العالم. استكشف سفننا أدناه.',
  },
  vessels: [
    {
      id: '01',
      name: 'Aero Star',
      type: { en: 'Crew Boat', hi: 'क्रू बोट', ar: 'قارب طاقم' },
      function: { en: 'High-Speed Transport', hi: 'उच्च-गति परिवहन', ar: 'نقل عالي السرعة' },
    },
    {
      id: '02',
      name: 'Amma Boat',
      type: { en: 'Support Vessel', hi: 'सहायक पोत', ar: 'سفينة إمداد' },
      function: { en: 'Offshore Supply & Logistics', hi: 'ऑफशोर आपूर्ति और लॉजिस्टिक्स', ar: 'التوريد البحري واللوجستيات' },
    },
    {
      id: '03',
      name: 'CB 04',
      type: { en: 'Crane Barge', hi: 'क्रेन बार्ज', ar: 'صندل رافعة' },
      function: { en: 'Heavy Lifting & Installation', hi: 'भारी उठान और स्थापना', ar: 'الرفع الثقيل والتركيب' },
    },
    {
      id: '04',
      name: 'Essar Dredge IV',
      type: { en: 'Heavy Dredger', hi: 'भारी ड्रेजर', ar: 'جرّافة ثقيلة' },
      function: { en: 'Deep Channel Dredging', hi: 'गहरे चैनल ड्रेजिंग', ar: 'تجريف قنوات عميقة' },
    },
    {
      id: '05',
      name: 'FT3',
      type: { en: 'Flat Top Barge', hi: 'फ्लैट टॉप बार्ज', ar: 'صندل مسطّح' },
      function: { en: 'Bulk Material Transport', hi: 'बल्क सामग्री परिवहन', ar: 'نقل المواد السائبة' },
    },
    {
      id: '06',
      name: 'Hansita III',
      type: { en: 'Piling Rig', hi: 'पाइलिंग रिग', ar: 'حفارة أساسات' },
      function: { en: 'Marine Foundation & Drilling', hi: 'समुद्री नींव और ड्रिलिंग', ar: 'أساسات بحرية وحفر' },
    },
    {
      id: '07',
      name: 'Meka 2',
      type: { en: 'Cutter Suction Dredger', hi: 'कटर सक्शन ड्रेजर', ar: 'جرّافة شفط قاطعة' },
      function: { en: 'Land Reclamation Services', hi: 'भूमि पुनर्ग्रहण सेवाएँ', ar: 'خدمات استصلاح الأراضي' },
    },
    {
      id: '08',
      name: 'Meka 3',
      type: { en: 'Cutter Suction Dredger', hi: 'कटर सक्शन ड्रेजर', ar: 'جرّافة شفط قاطعة' },
      function: { en: 'Land Reclamation Services', hi: 'भूमि पुनर्ग्रहण सेवाएँ', ar: 'خدمات استصلاح الأراضي' },
    },
  ],
}
