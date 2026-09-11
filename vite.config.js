import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

import { resolveBase, resolveSiteUrl } from './scripts/site.mjs'

/**
 * GitHub Pages serves a project site from a sub-path, so the base has to be
 * settable. CI passes `/<repo>/`; a custom domain or a user site would pass
 * nothing and get `/`.
 */
const base = resolveBase()

// Canonical URLs, share cards, structured data and the sitemap all need an
// absolute origin, and they are all rendered at build time. CI passes it; a
// local build reads it from public/CNAME, so both produce the same output.
process.env.VITE_SITE_URL = resolveSiteUrl()

// Every route is prerendered to its own index.html after the client build
// (scripts/prerender.mjs, run by `npm run build`), which is also where
// 404.html, sitemap.xml, robots.txt and llms.txt are written.
export default defineConfig(({ isSsrBuild }) => ({
  base,
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    // Route-level code splitting comes from the lazy() boundaries in App.jsx;
    // the bundler handles vendor chunking from there.
    chunkSizeWarningLimit: 700,
    // The prerender bundle only has to run once, in Node. public/ belongs to
    // the client build alone.
    copyPublicDir: !isSsrBuild,
  },
}))
