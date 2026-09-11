/**
 * Structural check on dist/ before anything is published.
 *
 * A green `vite build` only proves the bundler did not throw. These are the
 * things that have actually broken this site in practice: a missing SPA
 * fallback, asset URLs that ignore the deploy base, a route with no file behind
 * it, and the loader silently dropping out of index.html.
 *
 *   node scripts/verify-build.mjs
 */
import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'

import { resolveBase, resolveSiteUrl } from './site.mjs'

const DIST = 'dist'
const base = resolveBase()
const problems = []

const must = (cond, message) => {
  if (!cond) problems.push(message)
}

must(existsSync(DIST), `${DIST}/ does not exist`)
if (!existsSync(DIST)) {
  console.error('verify-build: nothing to check')
  process.exit(1)
}

const index = join(DIST, 'index.html')
must(existsSync(index), 'index.html missing')
const html = existsSync(index) ? readFileSync(index, 'utf8') : ''

// SPA fallback for genuinely unknown paths.
must(existsSync(join(DIST, '404.html')), '404.html missing: unknown paths would hard-fail')

// Jekyll would strip anything Pages considers private.
must(existsSync(join(DIST, '.nojekyll')), '.nojekyll missing: Pages may run Jekyll over the output')

// Every route the router serves needs a file behind it, or Pages returns 404.
const slugs = [
  ...readFileSync('src/data/warehouses.js', 'utf8').matchAll(/^\s+slug: '([^']+)'/gm),
].map((m) => m[1])
must(slugs.length > 0, 'no warehouse slugs found: the route emitter would have produced nothing')

const routes = ['warehouses', 'solutions', 'industries', 'about', 'contact', 'privacy', 'terms']
  .concat(slugs.map((s) => `warehouses/${s}`))

for (const route of routes) {
  must(existsSync(join(DIST, route, 'index.html')), `route /${route} has no index.html`)
}

// Asset URLs must carry the deploy base, or nothing loads on a project site.
const refs = [...html.matchAll(/(?:href|src)="([^"]+)"/g)].map((m) => m[1])
const local = refs.filter((r) => r.startsWith('/'))
must(local.length > 0, 'index.html references no local assets, which cannot be right')
// The prerendered page's home link is the base without its trailing slash,
// which is how React Router writes `to="/"` under a basename.
for (const ref of local) {
  must(
    ref.startsWith(base) || ref === base.replace(/\/$/, ''),
    `asset "${ref}" does not start with base "${base}"`,
  )
}

// -- Prerendered pages ----------------------------------------------------
// Every route must ship its own metadata and content in the HTML itself. The
// failure this guards against is silent: the site still works in a browser,
// but crawlers and link previews see one shell page repeated at every URL.
const siteUrl = resolveSiteUrl()
const prefix = `${siteUrl}${base.replace(/\/$/, '')}`
const pageFiles = [['', index], ...routes.map((route) => [route, join(DIST, route, 'index.html')])]
const titles = new Map()

const attr = (doc, pattern) => doc.match(pattern)?.[1]

for (const [route, file] of pageFiles) {
  if (!existsSync(file)) continue
  const doc = readFileSync(file, 'utf8')
  const head = doc.slice(0, doc.indexOf('</head>'))
  const label = `/${route}`

  // Scoped to <head>: an inline SVG in the body may carry its own <title>.
  const title = attr(head, /<title[^>]*>([^<]+)<\/title>/)
  must(title, `${label}: no <title>`)
  must((head.match(/<title[\s>]/g) ?? []).length === 1, `${label}: more than one <title> in <head>`)
  if (title) {
    must(!titles.has(title), `${label}: title "${title}" duplicates ${titles.get(title)}`)
    titles.set(title, label)
  }

  must(/<meta data-prerender name="description" content="[^"]{50,}"/.test(doc), `${label}: no meta description`)
  must(!/name="robots" content="noindex/.test(doc), `${label}: marked noindex`)
  must(/<div id="root"><[^/]/.test(doc), `${label}: #root is empty, the route was not prerendered`)
  must(/<h1[\s>]/.test(doc), `${label}: no <h1>`)

  // GitHub Pages answers /about with a 301 to /about/, so anything a page
  // publishes about its own URL must be the slash form or it names a redirect.
  const canonical = attr(doc, /rel="canonical" href="([^"]+)"/)
  if (siteUrl) {
    const expected = `${prefix}/${route ? `${route}/` : ''}`
    must(canonical === expected, `${label}: canonical is "${canonical}", expected "${expected}"`)
    must(attr(doc, /property="og:url" content="([^"]+)"/) === expected, `${label}: og:url does not match the canonical`)
  }

  const ogImage = attr(doc, /property="og:image" content="([^"]+)"/)
  must(ogImage, `${label}: no og:image`)
  if (ogImage && siteUrl) {
    const local = join(DIST, ogImage.slice(prefix.length))
    must(existsSync(local), `${label}: og:image ${ogImage} is not in the build`)
  }

  const blocks = [...doc.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)]
  must(blocks.length > 0, `${label}: no structured data`)
  const types = []
  for (const [, json] of blocks) {
    try {
      types.push(...JSON.parse(json)['@graph'].map((node) => node['@type']))
    } catch (error) {
      must(false, `${label}: structured data is not valid JSON (${error.message})`)
    }
  }
  must(types.includes('LocalBusiness'), `${label}: the organisation is missing from the structured data`)
}

const notFound = existsSync(join(DIST, '404.html')) ? readFileSync(join(DIST, '404.html'), 'utf8') : ''
must(/name="robots" content="noindex/.test(notFound), '404.html is not marked noindex')
must(!notFound.includes('rel="canonical"'), '404.html declares a canonical')

// -- Crawl files ------------------------------------------------------------
// Sitemap and llms.txt are only written when the build had an absolute origin,
// so they are only required under the same condition.
if (siteUrl) {
  const sitemap = join(DIST, 'sitemap.xml')
  must(existsSync(sitemap), 'sitemap.xml missing even though the build had an origin')
  if (existsSync(sitemap)) {
    const xml = readFileSync(sitemap, 'utf8')
    const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1])
    // One per route plus the homepage. A drifting count means the route list
    // and the sitemap have stopped agreeing, which is invisible in a browser.
    must(
      locs.length === routes.length + 1,
      `sitemap lists ${locs.length} urls; expected ${routes.length + 1}`,
    )
    for (const loc of locs) {
      must(loc.startsWith(`${siteUrl}/`), `sitemap url "${loc}" is not under "${siteUrl}"`)
      must(loc.endsWith('/'), `sitemap url "${loc}" would redirect; it needs a trailing slash`)
    }
  }

  const robots = join(DIST, 'robots.txt')
  must(existsSync(robots), 'robots.txt missing from the build')
  if (existsSync(robots)) {
    must(
      readFileSync(robots, 'utf8').includes(`Sitemap: ${siteUrl}`),
      'robots.txt carries no absolute Sitemap: line',
    )
  }

  for (const file of ['llms.txt', 'llms-full.txt']) {
    must(existsSync(join(DIST, file)), `${file} missing from the build`)
  }
}

for (const file of ['favicon.ico', 'site.webmanifest', 'icons/apple-touch-icon.png', 'icons/icon-512.png', 'og/default.jpg']) {
  must(existsSync(join(DIST, file)), `${file} missing: run npm run build:brand`)
}

// Dev-only entry must not survive into a build.
must(!html.includes('/src/main.jsx'), 'index.html still points at the dev entry /src/main.jsx')

// The splash is inline and easy to lose in a refactor.
must(html.includes('id="gbLoader"'), 'loading splash missing from index.html')
must(html.includes('HARD_LIMIT'), 'splash dismissal guard missing: it could trap visitors')

const assets = existsSync(join(DIST, 'assets')) ? readdirSync(join(DIST, 'assets')) : []
must(assets.some((f) => f.endsWith('.js')), 'no JS emitted')
must(assets.some((f) => f.endsWith('.css')), 'no CSS emitted')

// -- Design system --------------------------------------------------------
// Tailwind only emits the theme variables a generated utility references, so a
// token used solely from SCSS via var() can be tree-shaken out of the bundle.
// The rule then becomes invalid at computed-value time and the element quietly
// inherits its parent's colour: no build error, no console warning, and on a
// dark ground it often still *looks* plausible. Verified on the artifact.
const cssFile = assets.find((f) => f.endsWith('.css'))
if (cssFile) {
  const css = readFileSync(join(DIST, 'assets', cssFile), 'utf8')
  const declared = new Set([...css.matchAll(/(--color-gb-[a-z0-9-]+)\s*:/g)].map((m) => m[1]))
  const referenced = new Set(
    [...css.matchAll(/var\(\s*(--color-gb-[a-z0-9-]+)/g)].map((m) => m[1]),
  )
  for (const name of referenced) {
    must(declared.has(name), `CSS references ${name} but never declares it (theme var was tree-shaken)`)
  }
  must(declared.size > 20, `only ${declared.size} design tokens in the bundle; expected the full palette`)

  // The refactor's whole point: the page ground must be the brand black.
  must(
    /body\s*{[^}]*background-color:\s*var\(--color-gb-surface-page\)/.test(css) ||
      /background-color:\s*var\(--color-gb-surface-page\)/.test(css),
    'body no longer paints the brand page surface',
  )
}

if (problems.length) {
  console.error('verify-build FAILED\n' + problems.map((p) => `  - ${p}`).join('\n'))
  process.exit(1)
}

console.log(
  `verify-build passed: ${routes.length + 1} route files, ${assets.length} assets, base "${base}"`,
)
