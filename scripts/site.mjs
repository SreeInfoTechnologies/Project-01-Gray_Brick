/**
 * Deploy origin and base path, resolved the same way everywhere that runs in
 * Node: vite.config.js, the prerender step and the build verifier.
 *
 * CI sets both explicitly (see .github/workflows/deploy.yml). Locally neither is
 * usually set, so the origin falls back to public/CNAME. That keeps a local
 * `npm run build` byte-for-byte comparable with what ships, including absolute
 * canonical URLs, the sitemap and the structured data.
 */
import { existsSync, readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

const cnameFile = fileURLToPath(new URL('../public/CNAME', import.meta.url))

export function resolveSiteUrl() {
  const explicit = (process.env.VITE_SITE_URL || '').trim()
  if (explicit) return explicit.replace(/\/$/, '')
  if (!existsSync(cnameFile)) return ''
  const domain = readFileSync(cnameFile, 'utf8').trim()
  return domain ? `https://${domain}` : ''
}

export function resolveBase() {
  return process.env.VITE_BASE_PATH || '/'
}
