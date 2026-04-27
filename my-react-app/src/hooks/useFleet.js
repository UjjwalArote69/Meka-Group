import { useEffect, useState } from 'react'
import { sanityClient } from '../lib/sanity.js'
import { FLEET_DEFAULTS } from '../data/fleetDefaults.js'

const FLEET_QUERY = `*[_id == "fleet"][0]{
  sectionLabel,
  ourLabel,
  fleetLabel,
  description,
  vessels[]{
    id,
    name,
    type,
    function,
    photo
  }
}`

const hasContent = (v) => {
  if (v == null) return false
  if (typeof v === 'string') return v.length > 0
  if (Array.isArray(v)) return v.length > 0
  if (typeof v === 'object') return Object.values(v).some((x) => typeof x === 'string' && x.length > 0)
  return true
}

// Merge vessels from Sanity into the defaults. If Sanity has a vessels array,
// its order and presence win — but for each vessel matched by id, missing
// fields fall back to the corresponding default. This lets the bulk-upload
// script write partial data ({ id, photo }) without nuking name/type/function.
const mergeVessels = (sanityVessels, defaultVessels) => {
  if (!Array.isArray(sanityVessels) || sanityVessels.length === 0) return defaultVessels
  const defaultsById = new Map(defaultVessels.map((v) => [v.id, v]))
  return sanityVessels.map((sv) => {
    const def = defaultsById.get(sv?.id) || {}
    const merged = { ...def }
    for (const [k, v] of Object.entries(sv || {})) {
      if (hasContent(v)) merged[k] = v
    }
    return merged
  })
}

export function useFleet() {
  const [fleet, setFleet] = useState(FLEET_DEFAULTS)

  useEffect(() => {
    if (!import.meta.env.VITE_SANITY_PROJECT_ID) return
    let cancelled = false
    sanityClient
      .fetch(FLEET_QUERY)
      .then((data) => {
        if (cancelled || !data) return
        const merged = {}
        for (const key of Object.keys(FLEET_DEFAULTS)) {
          if (key === 'vessels') {
            merged.vessels = mergeVessels(data.vessels, FLEET_DEFAULTS.vessels)
          } else {
            merged[key] = hasContent(data[key]) ? data[key] : FLEET_DEFAULTS[key]
          }
        }
        setFleet(merged)
      })
      .catch(() => {})
    return () => {
      cancelled = true
    }
  }, [])

  return fleet
}
