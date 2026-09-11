// ---------------------------------------------------------------------------
// Absolute URLs for canonicals, Open Graph and structured data.
//
// GitHub Pages serves every route from a directory (`about/index.html`), and a
// request for `/about` is answered with a 301 to `/about/`. A canonical, sitemap
// entry or schema `url` pointing at the slashless form would therefore point at
// a redirect, which search engines read as a conflicting signal. Every URL this
// site publishes about itself is built here, in the trailing-slash form that
// actually returns a 200.
// ---------------------------------------------------------------------------

export const SITE_NAME = 'Gray Brick Infra'

// Resolved from public/CNAME at build time (see scripts/site.mjs), so this is
// only empty in `vite dev`, where the browser's own origin is the right answer.
const SITE_URL = (import.meta.env.VITE_SITE_URL ?? '').replace(/\/$/, '')

// Deploy sub-path, without its trailing slash. Empty at a domain root.
const BASE = import.meta.env.BASE_URL.replace(/\/$/, '')

export const origin = () =>
  SITE_URL || (typeof window === 'undefined' ? '' : window.location.origin)

/** Canonical URL for a route: `/` → `https://host/`, `/about` → `https://host/about/`. */
export function pageUrl(path = '/') {
  const clean = path.split(/[?#]/)[0].replace(/\/+$/, '')
  return `${origin()}${BASE}${clean}/`
}

/** Canonical URL plus a fragment, for things that live at an anchor on a page. */
export const anchorUrl = (path, id) => `${pageUrl(path)}#${id}`

/**
 * Absolute URL for an asset. Bundled imports already carry the deploy base
 * (`/assets/x.webp`), and files in public/ are referenced from the site root
 * (`/og/x.jpg`) and need it added. Data URIs and absolute URLs pass through.
 */
export function assetUrl(src) {
  if (!src) return null
  if (/^(https?:|data:)/.test(src)) return src
  const withBase = BASE && !src.startsWith(`${BASE}/`) ? `${BASE}${src}` : src
  return `${origin()}${withBase}`
}
