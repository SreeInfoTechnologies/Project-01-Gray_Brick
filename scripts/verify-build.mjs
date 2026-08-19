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

const DIST = 'dist'
const base = process.env.VITE_BASE_PATH || '/'
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
for (const ref of local) {
  must(ref.startsWith(base), `asset "${ref}" does not start with base "${base}"`)
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
