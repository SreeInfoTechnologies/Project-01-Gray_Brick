/**
 * Generates the loader's inline SVG from src/components/common/logoPaths.js.
 *
 * The splash has to paint before the JS bundle exists, so its copy of the logo
 * lives in index.html rather than being imported. Running this script keeps
 * that copy honest: if logoPaths.js ever changes, regenerate and paste.
 *
 *   node scripts/build-loader-svg.mjs
 */
import { readFileSync } from 'node:fs'

const src = readFileSync(new URL('../src/components/common/logoPaths.js', import.meta.url), 'utf8')

const grab = (name) => {
  const block = src.slice(src.indexOf(`export const LOGO_${name}`))
  const take = (key) => {
    const start = block.indexOf(`${key}: [`)
    const end = block.indexOf('\n  ]', start)
    return [...block.slice(start, end).matchAll(/'([^']+)'/g)].map((m) => m[1])
  }
  return { silver: take('silver'), gold: take('gold') }
}

const mark = grab('MARK')
const word = grab('WORDMARK')

const path = (d, cls) => `<path class="${cls}" d="${d}"/>`
const indent = (s) => s.map((l) => `        ${l}`).join('\n')

// Stacked lockup, matching the artwork: mark above, wordmark beneath.
const svg = `<svg class="gbl-mark" viewBox="0 0 832 714" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="gblSteel" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#f4f7f9"/>
          <stop offset=".18" stop-color="#aeb5bb"/>
          <stop offset=".38" stop-color="#eef1f3"/>
          <stop offset=".57" stop-color="#7c838a"/>
          <stop offset=".79" stop-color="#c8ced3"/>
          <stop offset="1" stop-color="#868d94"/>
        </linearGradient>
        <linearGradient id="gblGold" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#f6e1a8"/>
          <stop offset=".22" stop-color="#c79a3c"/>
          <stop offset=".48" stop-color="#f2ce79"/>
          <stop offset=".74" stop-color="#967023"/>
          <stop offset="1" stop-color="#e0bc6a"/>
        </linearGradient>
        <clipPath id="gblBase"><rect x="-40" y="-40" width="912" height="620"/></clipPath>
      </defs>

      <g transform="translate(17 0)" clip-path="url(#gblBase)">
${indent(mark.silver.map((d, i) => path(d, `gbl-l gbl-l${i + 1}`)))}
${indent(mark.gold.map((d, i) => path(d, `gbl-t gbl-t${i + 1}`)))}
      </g>

      <g transform="translate(0 554)">
        <g class="gbl-word">
          <g class="gbl-w-steel">
${indent(word.silver.map((d) => path(d, 'gbl-wp')))}
          </g>
          <g class="gbl-w-gold">
${indent(word.gold.map((d) => path(d, 'gbl-wp')))}
          </g>
        </g>
      </g>
    </svg>`

process.stdout.write(svg)
