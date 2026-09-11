// ---------------------------------------------------------------------------
// Prerender entry. Built with `vite build --ssr` and driven by
// scripts/prerender.mjs; never shipped to the browser.
//
// GitHub Pages can only serve files, and a client-rendered app gives every URL
// the same empty shell. Google renders JavaScript eventually, but most AI
// crawlers (GPTBot, ClaudeBot, PerplexityBot…) and every link-preview bot
// (WhatsApp, LinkedIn, Slack, X) do not. So each route is rendered to real HTML
// at build time: its own title, description, canonical, share card, structured
// data and body copy, all present before a line of JavaScript runs.
// ---------------------------------------------------------------------------

import { StrictMode } from 'react'
import { prerender } from 'react-dom/static'
import { StaticRouter } from 'react-router-dom'

import App from './App.jsx'
import brandedFacade from '@/assets/images/gb-forecourt-branded-wide.webp'
import founderPortrait from '@/assets/images/founder-portrait.webp'
import { solutions } from '@/data/solutions'
import { warehouses } from '@/data/warehouses'
import { seedWarehouses } from '@/hooks/useWarehouses'
import { assetUrl, pageUrl } from '@/lib/site'

export { llmsFullTxt, llmsTxt } from '@/lib/llms'

const BASE = import.meta.env.BASE_URL.replace(/\/$/, '')

/**
 * Every route that exists, with the photographs that belong to it. The images
 * go into the sitemap so the founder portrait and the facility photographs are
 * discoverable in image search, attached to the right page.
 */
export const routes = [
  { path: '/', images: [brandedFacade, ...warehouses.map((w) => w.image)] },
  { path: '/warehouses', images: warehouses.map((w) => w.image) },
  ...warehouses.map((w) => ({
    path: `/warehouses/${w.slug}`,
    images: w.gallery.map((photo) => photo.src),
  })),
  { path: '/solutions', images: solutions.map((s) => s.image) },
  { path: '/industries', images: [] },
  { path: '/about', images: [founderPortrait] },
  { path: '/contact', images: [] },
  { path: '/privacy', images: [] },
  { path: '/terms', images: [] },
]

/** Any path the router does not know renders the 404 page. */
export const notFoundPath = '/__not-found__'

export async function render(path) {
  seedWarehouses()

  const { prelude } = await prerender(
    <StrictMode>
      <StaticRouter location={`${BASE}${path}`} basename={BASE || undefined}>
        <App />
      </StaticRouter>
    </StrictMode>,
  )

  return new Response(prelude).text()
}

const xml = (text) =>
  text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

export function sitemapXml(lastmod) {
  const entries = routes.map(({ path, images }) => {
    const imageTags = [...new Set(images)]
      .map((src) => assetUrl(src))
      .filter((src) => src && !src.startsWith('data:'))
      .map((src) => `\n    <image:image><image:loc>${xml(src)}</image:loc></image:image>`)
      .join('')

    return `  <url>\n    <loc>${xml(pageUrl(path))}</loc>\n    <lastmod>${lastmod}</lastmod>${imageTags}\n  </url>`
  })

  return (
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n' +
    '        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n' +
    `${entries.join('\n')}\n</urlset>\n`
  )
}
