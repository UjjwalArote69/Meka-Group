// One-shot tool to migrate /public images into Sanity assets.
//
// Usage (from my-react-app/):
//   node scripts/upload-images.mjs              # all sections defined below
//   node scripts/upload-images.mjs fleet        # only fleet
//   node scripts/upload-images.mjs fleet archive
//
// Behavior:
// - Idempotent: vessels/entries that already have a photo asset are skipped.
// - Requires the target singleton doc to already exist with its array
//   populated (open Studio, publish the section once with defaults, then
//   re-run). The script ONLY adds photo references; it doesn't fabricate
//   missing copy.
// - Reads SANITY_WRITE_TOKEN from .env (gitignored, NEVER prefixed with
//   VITE_ — keep it server-side only).

import { createClient } from '@sanity/client'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { FLEET_DEFAULTS } from '../src/data/fleetDefaults.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, '..')
const PUBLIC_DIR = path.join(ROOT, 'public')

// ── Env loading ──────────────────────────────────────────────
function loadEnv() {
  const envPath = path.join(ROOT, '.env')
  if (!fs.existsSync(envPath)) {
    console.error('✖ Missing .env at', envPath)
    process.exit(1)
  }
  const text = fs.readFileSync(envPath, 'utf8')
  const env = {}
  for (const line of text.split(/\r?\n/)) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const eq = trimmed.indexOf('=')
    if (eq === -1) continue
    const key = trimmed.slice(0, eq).trim()
    let val = trimmed.slice(eq + 1).trim()
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1)
    }
    env[key] = val
  }
  return env
}

const env = loadEnv()

if (!env.SANITY_WRITE_TOKEN) {
  console.error('✖ SANITY_WRITE_TOKEN is missing from .env')
  process.exit(1)
}

const client = createClient({
  projectId: env.VITE_SANITY_PROJECT_ID,
  dataset: env.VITE_SANITY_DATASET || 'production',
  apiVersion: '2025-04-01',
  token: env.SANITY_WRITE_TOKEN,
  useCdn: false,
})

// ── Asset upload helper ──────────────────────────────────────
const uploadCache = new Map() // dedupe identical files within one run

async function uploadImage(relPath) {
  if (!relPath) return null
  if (uploadCache.has(relPath)) return uploadCache.get(relPath)

  const filePath = path.join(PUBLIC_DIR, relPath.replace(/^\//, ''))
  if (!fs.existsSync(filePath)) {
    console.warn(`    ⚠ missing file: ${relPath}`)
    return null
  }
  const buffer = fs.readFileSync(filePath)
  const filename = path.basename(filePath)
  process.stdout.write(`    ↑ ${relPath} … `)
  const asset = await client.assets.upload('image', buffer, { filename })
  console.log(asset._id)
  const ref = { _type: 'image', asset: { _type: 'reference', _ref: asset._id } }
  uploadCache.set(relPath, ref)
  return ref
}

// ── Generic array-photo migration ────────────────────────────
//   For each item in `defaults`, uploads its image (from `imageFor(item)`)
//   and writes back the FULL item (all default fields + uploaded photo)
//   into `arrayField`. Writing full items means Studio shows real
//   names/types instead of "(no name)" placeholders.
//
//   Idempotent: items already carrying a photo asset are skipped (their
//   existing fields preserved as-is — we don't blow over admin edits).
//   Works whether the doc exists or not (uses createIfNotExists + patch).
async function migrateArraySection({
  docId, docType, arrayField, matchKey, photoField, defaults, imageFor, label,
}) {
  console.log(`\n📦 ${label} (doc: ${docId})`)

  const existing = await client.fetch(
    `*[_id == $id][0]{ "items": ${arrayField} }`,
    { id: docId }
  )
  const existingItems = existing?.items || []
  const existingByMatch = new Map(
    existingItems.filter((it) => it && it[matchKey]).map((it) => [it[matchKey], it])
  )

  const updated = []
  let uploads = 0
  let already = 0
  let skipped = 0

  // Stable _key derivation so re-runs don't churn keys.
  const keyFor = (id) => `${matchKey}-${id}`.replace(/[^a-zA-Z0-9_-]/g, '_')

  for (const def of defaults) {
    const id = def[matchKey]
    const existingItem = existingByMatch.get(id)

    // Always merge in default fields so name/type/function are present in
    // Studio. Existing Sanity fields take precedence so we never overwrite
    // admin edits.
    let merged = {
      ...def,                  // full default content
      ...(existingItem || {}), // admin edits win
      _key: existingItem?._key || keyFor(id),
    }

    if (existingItem?.[photoField]?.asset?._ref) {
      already++
    } else {
      const photo = await uploadImage(imageFor(def))
      if (photo) {
        uploads++
        merged[photoField] = photo
      } else {
        skipped++
      }
    }

    updated.push(merged)
  }

  // Preserve any admin-added items not in our defaults manifest.
  const defaultIds = new Set(defaults.map((d) => d[matchKey]))
  for (const it of existingItems) {
    if (!it || defaultIds.has(it[matchKey])) continue
    updated.push(it._key ? it : { _key: keyFor(it[matchKey] || Math.random().toString(36).slice(2, 10)), ...it })
  }

  await client
    .transaction()
    .createIfNotExists({ _id: docId, _type: docType })
    .patch(docId, (p) => p.set({ [arrayField]: updated }))
    .commit()

  console.log(`    ✅ ${docId}: ${uploads} uploaded, ${already} already had photos, ${skipped} skipped`)
}

// ── Section registry ─────────────────────────────────────────
//   Add a new section here once its schema gains a photo field.
const FLEET_IMAGES = {
  '01': '/fleet/Aero Star.webp',
  '02': '/fleet/Amma Boat.webp',
  '03': '/fleet/Cb 04.webp',
  '04': '/fleet/Essar Dredge IV.webp',
  '05': '/fleet/FT3.webp',
  '06': '/fleet/Hansita III.webp',
  '07': '/fleet/Meka 2.webp',
  '08': '/fleet/Meka 3.webp',
}

const SECTIONS = {
  fleet: () => migrateArraySection({
    docId: 'fleet',
    docType: 'fleet',
    arrayField: 'vessels',
    matchKey: 'id',
    photoField: 'photo',
    label: 'Fleet',
    defaults: FLEET_DEFAULTS.vessels,
    imageFor: (vessel) => FLEET_IMAGES[vessel.id],
  }),
}

// ── Main ─────────────────────────────────────────────────────
const requested = process.argv.slice(2)
const targets = requested.length ? requested : Object.keys(SECTIONS)

console.log(`Project: ${env.VITE_SANITY_PROJECT_ID} / ${env.VITE_SANITY_DATASET || 'production'}`)
console.log(`Sections: ${targets.join(', ')}`)

for (const name of targets) {
  const fn = SECTIONS[name]
  if (!fn) {
    console.warn(`✖ Unknown section: ${name}. Available: ${Object.keys(SECTIONS).join(', ')}`)
    continue
  }
  try {
    await fn()
  } catch (err) {
    console.error(`✖ ${name} failed:`, err.message)
  }
}

console.log('\n✓ Done.')
