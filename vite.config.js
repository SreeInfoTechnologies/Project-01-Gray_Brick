import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

/**
 * GitHub Pages serves a project site from a sub-path, so the base has to be
 * settable. CI passes `/<repo>/`; a custom domain or a user site would pass
 * nothing and get `/`.
 */
const base = process.env.VITE_BASE_PATH || '/'

/**
 * GitHub Pages has no rewrite rules. A hard refresh on /warehouses/<slug>
 * would hit a path with no file behind it.
 *
 * Pages serves 404.html for anything unresolved, so a copy of index.html under
 * that name is enough to make the SPA boot and render the right route. But it
 * is served with a 404 status, and this site has real SEO work in it, so every
 * route that actually exists also gets its own index.html and a 200. 404.html
 * then means what it says: a genuinely unknown path.
 */
function staticRoutes() {
  const dist = fileURLToPath(new URL('./dist', import.meta.url))

  // Slugs are read out of the data file rather than imported, because that
  // module imports .webp assets which Node cannot resolve on its own.
  const readSlugs = () => {
    const src = readFileSync(fileURLToPath(new URL('./src/data/warehouses.js', import.meta.url)), 'utf8')
    return [...src.matchAll(/^\s+slug: '([^']+)'/gm)].map((m) => m[1])
  }

  return {
    name: 'gray-brick:static-routes',
    apply: 'build',
    closeBundle() {
      const index = `${dist}/index.html`
      if (!existsSync(index)) return

      const html = readFileSync(index)
      const routes = [
        'warehouses',
        'solutions',
        'industries',
        'about',
        'contact',
        'privacy',
        'terms',
        ...readSlugs().map((slug) => `warehouses/${slug}`),
      ]

      for (const route of routes) {
        mkdirSync(`${dist}/${route}`, { recursive: true })
        writeFileSync(`${dist}/${route}/index.html`, html)
      }

      // Real 404s, and the SPA fallback for anything not listed above.
      writeFileSync(`${dist}/404.html`, html)

      this.info?.(`emitted ${routes.length} static routes + 404.html`)
    },
  }
}

export default defineConfig({
  base,
  plugins: [react(), tailwindcss(), staticRoutes()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    // Route-level code splitting comes from the lazy() boundaries in App.jsx;
    // the bundler handles vendor chunking from there.
    chunkSizeWarningLimit: 700,
  },
})
