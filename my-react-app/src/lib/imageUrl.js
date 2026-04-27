// Helpers for resolving Sanity image references into URLs, with a fallback
// to the existing `/public` paths so sections work before admins upload
// anything.
//
// Usage:
//   imgSrc(img, fallback)                      // raw URL, full size
//   imgSrc(img, fallback, { width: 1200 })     // 1200px-wide, auto format
//   imgSrcSet(img, [600, 900, 1200, 1800])     // responsive srcSet string
//   urlFor(img).width(800).format('webp').url()
//
// Why size matters: Sanity stores the original (e.g. 1536×1024 webp). A
// vessel card displays at ~600px wide on most screens, so requesting the
// full asset wastes ~3× the pixels. Pair `imgSrc({ width })` with a
// `srcSet` so the browser picks the right size for the viewport.

import imageUrlBuilder from '@sanity/image-url'
import { sanityClient } from './sanity'

const builder = imageUrlBuilder(sanityClient)

// Returns a chainable URL builder for full control.
//   urlFor(img).width(1200).height(800).fit('crop').url()
export const urlFor = (source) => builder.image(source)

const isSanityImage = (img) => Boolean(img?.asset?._ref || img?.asset?._id)

// Returns a single optimized URL, or the fallback if no Sanity asset is set.
// `auto('format')` lets Sanity pick webp/avif based on Accept header.
export const imgSrc = (sanityImage, fallback = '', opts = {}) => {
  if (!isSanityImage(sanityImage)) return fallback
  let b = urlFor(sanityImage).auto('format').quality(opts.quality ?? 80)
  if (opts.width) b = b.width(opts.width)
  if (opts.height) b = b.height(opts.height)
  if (opts.fit) b = b.fit(opts.fit)
  return b.url()
}

// Returns a `srcSet` string for responsive images, or empty string when no
// Sanity asset is set (browsers ignore empty srcSet — `src` takes over).
//   srcSet={imgSrcSet(v.photo, [600, 900, 1200, 1800])}
export const imgSrcSet = (sanityImage, widths = [600, 900, 1200, 1800], opts = {}) => {
  if (!isSanityImage(sanityImage)) return ''
  return widths
    .map((w) => `${urlFor(sanityImage).width(w).auto('format').quality(opts.quality ?? 80).url()} ${w}w`)
    .join(', ')
}
