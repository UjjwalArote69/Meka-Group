export function loc(value, lang = 'en') {
  if (value == null) return ''
  if (typeof value === 'string') return value
  return value[lang] || value.en || Object.values(value).find((v) => typeof v === 'string' && v) || ''
}
