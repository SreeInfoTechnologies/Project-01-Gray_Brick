/**
 * Render every route to static HTML, after `vite build` (client) and
 * `vite build --ssr src/entry-server.jsx` (renderer) have both run.
 *
 *   node scripts/prerender.mjs
 *
 * For each route this writes <route>/index.html: the client build's own
 * index.html, with the page's <head> tags and rendered body in place. GitHub
 * Pages then serves a 200 with the real page at every URL, and the browser
 * boots the same app over it.
 *
 * Also written here, from the same renderer so they cannot drift from the
 * pages: 404.html, sitemap.xml, the Sitemap: line in robots.txt, llms.txt and
 * llms-full.txt.
 */
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { pathToFileURL } from 'node:url'

import { resolveBase, resolveSiteUrl } from './site.mjs'

const DIST = 'dist'
const SSR_DIST = 'dist-ssr'
const entry = join(SSR_DIST, 'entry-server.js')

if (!existsSync(join(DIST, 'index.html')) || !existsSync(entry)) {
  console.error('prerender: run `vite build` and `vite build --ssr src/entry-server.jsx` first')
  process.exit(1)
}

const { render, routes, notFoundPath, sitemapXml, llmsTxt, llmsFullTxt } = await import(
  pathToFileURL(entry).href
)

const template = readFileSync(join(DIST, 'index.html'), 'utf8')

// React emits a page's hoisted tags (title, meta, link) at the very start of
// its output when it renders anything other than a whole document.
const HOISTED = /^(?:<title>[\s\S]*?<\/title>|<(?:meta|link)\b[^>]*>)+/

// Marked so the client can drop them the moment React takes over <head>;
// otherwise the first page's canonical would outlive a client-side navigation.
const mark = (tags) => tags.replace(/<(title|meta|link)\b/g, '<$1 data-prerender')

function page(html) {
  const head = html.match(HOISTED)?.[0] ?? ''
  const body = html.slice(head.length)

  // Function replacements throughout: rendered content is arbitrary text, and
  // a `$&` or `$'` in it would otherwise be read as a replacement pattern.
  const doc = template
    // The template's own title and description are fallbacks for `vite dev`.
    .replace(/\s*<title>[\s\S]*?<\/title>/, () => '')
    .replace(/\s*<meta\s+name="description"[\s\S]*?\/>/, () => '')
    // Straight after the viewport tag, ahead of the inline splash styles, so
    // link-preview bots that only read the first few kilobytes still find it.
    .replace(/<meta name="viewport"[^>]*>/, (tag) => `${tag}\n    ${mark(head)}`)
    .replace('<div id="root"></div>', () => `<div id="root">${body}</div>`)

  if (!doc.includes('data-prerender') || !doc.includes(body)) {
    throw new Error('prerender: the index.html template no longer has the expected shape')
  }
  return doc
}

const write = (file, content) => {
  mkdirSync(join(file, '..'), { recursive: true })
  writeFileSync(file, content)
}

for (const { path } of routes) {
  const file = path === '/' ? join(DIST, 'index.html') : join(DIST, path, 'index.html')
  write(file, page(await render(path)))
}

// Real 404s. Pages serves this with a 404 status for any path not above.
write(join(DIST, '404.html'), page(await render(notFoundPath)))

console.log(`prerender: ${routes.length} routes + 404.html`)

// -- Crawl files ------------------------------------------------------------
// All of these need absolute URLs, so they are only written when the build
// knows its origin. Emitting them regardless would publish invalid files, and a
// robots.txt pointing at a sitemap that was never written is worse than none.
const siteUrl = resolveSiteUrl()

if (siteUrl) {
  const prefix = `${siteUrl}${resolveBase().replace(/\/$/, '')}`
  const lastmod = new Date().toISOString().slice(0, 10)

  write(join(DIST, 'sitemap.xml'), sitemapXml(lastmod))
  write(join(DIST, 'llms.txt'), llmsTxt())
  write(join(DIST, 'llms-full.txt'), llmsFullTxt())

  // Appended at build time rather than committed, so the domain lives in
  // exactly one place: public/CNAME.
  const robots = join(DIST, 'robots.txt')
  if (existsSync(robots)) {
    const current = readFileSync(robots, 'utf8').trimEnd()
    writeFileSync(robots, `${current}\n\nSitemap: ${prefix}/sitemap.xml\n`)
  }

  console.log(`prerender: sitemap.xml (${routes.length} urls), llms.txt, llms-full.txt for ${prefix}/`)
} else {
  console.warn('prerender: no site origin (VITE_SITE_URL or public/CNAME); skipped sitemap and llms.txt')
}

rmSync(SSR_DIST, { recursive: true, force: true })
