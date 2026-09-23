/**
 * Generates the share cards and app icons in public/ from the brand artwork
 * and Gray Brick's own photographs.
 *
 *   npm run build:brand            (needs Google Chrome or Chromium installed)
 *
 *   public/og/*.jpg        1200 × 630 Open Graph / Twitter cards, one per page
 *   public/icons/*.png     app, touch and maskable icons, and the schema logo
 *   public/favicon.ico     16, 32 and 48 px, for crawlers and older browsers
 *
 * The output is committed, so this only needs running when the logo, a
 * photograph or a page's headline changes. Like build-loader-svg.mjs, it reads
 * the logo from logoPaths.js so there is one copy of the artwork.
 *
 * Chrome is driven over the DevTools protocol with Node's built-in WebSocket,
 * so there is no dependency to install. Set CHROME_PATH to use a different
 * binary.
 */
import { spawn } from 'node:child_process'
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = fileURLToPath(new URL('..', import.meta.url))
const at = (...parts) => join(root, ...parts)

// -- Brand ------------------------------------------------------------------

const COLOR = {
  page: '#0d0e0f',
  wall: '#161718',
  gold: '#b19260',
  goldSoft: '#d2b47e',
  silver: '#d1d1cf',
  ink: '#f4f4f2',
  muted: '#9d9e9f',
  line: 'rgba(255, 255, 255, 0.12)',
}

const DOMAIN = readFileSync(at('public/CNAME'), 'utf8').trim()

const dataUri = (file, type) => `data:${type};base64,${readFileSync(file).toString('base64')}`
const photo = (name) => dataUri(at('src/assets/images', name), 'image/webp')
const font = dataUri(
  at('node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2'),
  'font/woff2',
)

// Horizontal lockup, assembled the same way as <Logo layout="horizontal">.
function horizontalLogo() {
  const src = readFileSync(at('src/components/common/logoPaths.js'), 'utf8')
  const grab = (name) => {
    const block = src.slice(src.indexOf(`export const LOGO_${name}`))
    const take = (key) => {
      const start = block.indexOf(`${key}: [`)
      const end = block.indexOf('\n  ]', start)
      return [...block.slice(start, end).matchAll(/'([^']+)'/g)].map((m) => m[1])
    }
    return { silver: take('silver'), gold: take('gold') }
  }
  const paths = ({ silver, gold }) =>
    `<g fill="${COLOR.silver}" fill-rule="evenodd">${silver.map((d) => `<path d="${d}"/>`).join('')}</g>` +
    `<g fill="${COLOR.gold}" fill-rule="evenodd">${gold.map((d) => `<path d="${d}"/>`).join('')}</g>`

  return (
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2734 538">` +
    `<g>${paths(grab('MARK'))}</g>` +
    `<g transform="translate(888 91.5) scale(2.219)">${paths(grab('WORDMARK'))}</g></svg>`
  )
}

const logo = horizontalLogo()

// The brick coursing from the loading splash, as a background texture.
const brickwork = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='60'%3E%3Cg fill='none' stroke='rgba(255,255,255,0.045)' stroke-width='1'%3E%3Cpath d='M0 .5H120M0 30.5H120'/%3E%3Cpath d='M.5 0V30M60.5 0V30M30.5 30V60M90.5 30V60'/%3E%3C/g%3E%3C/svg%3E")`

// -- Cards ------------------------------------------------------------------
// Headlines mirror each page's own hero, so a shared link reads the same as
// the page it opens. Change them together.

const cards = [
  {
    file: 'default',
    eyebrow: 'Warehousing in Bengaluru',
    title: 'Warehouse space that fits the way you operate.',
    lines: ['Ready-to-move and built-to-suit space', 'HRBR Layout · Horamavu · Bengaluru'],
    image: photo('gb-forecourt-branded-wide.webp'),
    focus: '50% 35%',
  },
  {
    file: 'about',
    eyebrow: 'Founder & Director',
    title: 'B Y Jayanth Reddy',
    lines: ['Gray Brick Infra Pvt. Ltd.', 'MBA, Finance · Bengaluru, Karnataka'],
    image: photo('founder-portrait.webp'),
    focus: '50% 22%',
    portrait: true,
  },
  {
    file: 'warehouses',
    eyebrow: 'Facilities',
    title: 'Warehouses in and around Bengaluru',
    lines: ['HRBR Layout, Kalyan Nagar · Horamavu', 'Sourcing across the city’s corridors'],
    image: photo('gb-forecourt-wide.webp'),
    focus: '50% 50%',
  },
  {
    file: 'hrbr-layout-100-feet-road',
    eyebrow: 'Fulfillment Center',
    title: 'HRBR Layout Facility, 100 Feet Road',
    lines: ['Kalyan Nagar · Bengaluru North-East', 'Quick commerce and FMCG distribution'],
    image: photo('gb-frontage-dusk.webp'),
    focus: '60% 55%',
  },
  {
    file: 'horamavu-narayana-reddy-layout',
    eyebrow: 'Ready-to-Move',
    title: 'Horamavu Facility, Narayana Reddy Layout Road',
    lines: ['Horamavu · Bengaluru East', 'Newly completed, available now'],
    image: photo('gb-floor-ready.webp'),
    focus: '50% 50%',
  },
  {
    file: 'solutions',
    eyebrow: 'Solutions',
    title: 'Warehousing that fits the operation',
    lines: ['Ready-to-move · Built-to-suit', 'Fulfillment · Distribution · Supply chain'],
    image: photo('gb-mezzanine-stocked.webp'),
    focus: '50% 50%',
  },
  {
    file: 'industries',
    eyebrow: 'Industries',
    title: 'Different sectors, different floors',
    lines: ['E-commerce · Quick commerce · FMCG', 'Retail · Manufacturing · 3PL'],
    image: photo('gb-mezzanine-fmcg.webp'),
    focus: '50% 50%',
  },
  {
    file: 'contact',
    eyebrow: 'Contact',
    title: 'Looking for the right warehouse in Bengaluru?',
    lines: ['852, 7th A Main, Banaswadi', 'Bengaluru North 560043'],
    image: photo('gb-frontage-dusk.webp'),
    focus: '50% 55%',
  },
]

const escape = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;')

function cardHtml({ eyebrow, title, lines, image, focus, portrait }) {
  // Long headlines step down so every card holds three lines at most.
  const size = title.length > 40 ? 50 : title.length > 26 ? 56 : 64
  const photoWidth = portrait ? 470 : 540

  return `<!doctype html><html><head><meta charset="utf-8"><style>
    @font-face { font-family: Inter; src: url(${font}) format('woff2'); font-weight: 100 900; }
    * { margin: 0; box-sizing: border-box; }
    html, body { width: 1200px; height: 630px; overflow: hidden; }
    body {
      position: relative; background: ${COLOR.page}; color: ${COLOR.ink};
      font-family: Inter, sans-serif; -webkit-font-smoothing: antialiased;
    }
    .wall { position: absolute; inset: 0; background: ${COLOR.wall} ${brickwork}; background-size: 120px 60px; }
    .wall::after {
      content: ''; position: absolute; inset: 0;
      background: radial-gradient(120% 120% at 0% 0%, rgba(255,255,255,0.05), transparent 55%);
    }
    .photo {
      position: absolute; top: 0; right: 0; bottom: 0; width: ${photoWidth}px;
      background: url(${image}) ${focus} / cover no-repeat;
    }
    .photo::before {
      content: ''; position: absolute; inset: 0 auto 0 0; width: 180px;
      background: linear-gradient(90deg, ${COLOR.wall}, rgba(22,23,24,0));
    }
    .rule { position: absolute; top: 0; bottom: 0; left: 0; width: 8px; background: linear-gradient(${COLOR.goldSoft}, ${COLOR.gold} 50%, #8b7045); }
    .panel {
      position: absolute; top: 0; bottom: 0; left: 0; width: ${1200 - photoWidth + 40}px;
      padding: 60px 64px 52px 72px; display: flex; flex-direction: column;
    }
    .logo { height: 46px; width: auto; display: block; align-self: flex-start; }
    .eyebrow {
      margin-top: auto; display: flex; align-items: center; gap: 16px;
      font-size: 17px; font-weight: 600; letter-spacing: 0.24em; text-transform: uppercase; color: ${COLOR.gold};
    }
    .eyebrow::before { content: ''; width: 40px; height: 2px; background: ${COLOR.gold}; }
    h1 {
      margin-top: 22px; font-size: ${size}px; line-height: 1.06; font-weight: 700;
      letter-spacing: -0.025em; color: ${COLOR.ink}; text-wrap: balance;
    }
    .lines { margin-top: 24px; display: flex; flex-direction: column; gap: 6px; font-size: 22px; line-height: 1.35; color: ${COLOR.silver}; }
    .lines span:first-child { color: ${COLOR.ink}; font-weight: 500; }
    .foot {
      margin-top: 40px; padding-top: 20px; border-top: 1px solid ${COLOR.line};
      display: flex; justify-content: space-between; font-size: 17px; font-weight: 500; letter-spacing: 0.02em; color: ${COLOR.muted};
    }
    .foot b { color: ${COLOR.goldSoft}; font-weight: 600; }
  </style></head><body>
    <div class="wall"></div>
    <div class="photo"></div>
    <div class="rule"></div>
    <div class="panel">
      <img class="logo" src="data:image/svg+xml;base64,${Buffer.from(logo).toString('base64')}" alt="">
      <p class="eyebrow">${escape(eyebrow)}</p>
      <h1>${escape(title)}</h1>
      <p class="lines">${lines.map((l) => `<span>${escape(l)}</span>`).join('')}</p>
      <p class="foot"><b>${escape(DOMAIN)}</b><span>Bengaluru · Karnataka · India</span></p>
    </div>
  </body></html>`
}

// -- Icons ------------------------------------------------------------------

const favicon = readFileSync(at('public/favicon.svg'), 'utf8')
const faviconUri = `data:image/svg+xml;base64,${Buffer.from(favicon).toString('base64')}`

// `inset` is how far in from the edge the rounded tile sits. Maskable and
// touch icons get a full-bleed ground, because the platform applies its own
// mask and would otherwise show the tile's corners against black.
const iconHtml = (size, { inset = 0, ground = 'transparent' } = {}) =>
  `<!doctype html><html><head><style>
    * { margin: 0; } html, body { width: ${size}px; height: ${size}px; background: ${ground}; overflow: hidden; }
    img { position: absolute; inset: ${inset}px; width: ${size - inset * 2}px; height: ${size - inset * 2}px; }
  </style></head><body><img src="${faviconUri}" alt=""></body></html>`

const icons = [
  { file: 'icons/icon-192.png', size: 192 },
  { file: 'icons/icon-512.png', size: 512 },
  { file: 'icons/apple-touch-icon.png', size: 180, inset: 8, ground: COLOR.page },
  // The maskable safe zone is the centre 80%; the tile's own padding plus this
  // inset keeps the whole mark well inside it.
  { file: 'icons/icon-maskable-512.png', size: 512, inset: 56, ground: COLOR.page },
]

const icoSizes = [16, 32, 48]

/** A .ico is a small directory of embedded PNGs. */
function ico(pngs) {
  const header = Buffer.alloc(6)
  header.writeUInt16LE(0, 0)
  header.writeUInt16LE(1, 2)
  header.writeUInt16LE(pngs.length, 4)

  let offset = 6 + 16 * pngs.length
  const entries = pngs.map(({ size, data }) => {
    const entry = Buffer.alloc(16)
    entry.writeUInt8(size >= 256 ? 0 : size, 0)
    entry.writeUInt8(size >= 256 ? 0 : size, 1)
    entry.writeUInt16LE(1, 4)
    entry.writeUInt16LE(32, 6)
    entry.writeUInt32LE(data.length, 8)
    entry.writeUInt32LE(offset, 12)
    offset += data.length
    return entry
  })

  return Buffer.concat([header, ...entries, ...pngs.map((p) => p.data)])
}

// -- Chrome over the DevTools protocol --------------------------------------

function findChrome() {
  const candidates = [
    process.env.CHROME_PATH,
    '/usr/bin/google-chrome',
    '/usr/bin/google-chrome-stable',
    '/usr/bin/chromium',
    '/usr/bin/chromium-browser',
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  ].filter(Boolean)
  const found = candidates.find((path) => existsSync(path))
  if (!found) throw new Error('No Chrome found. Install Chrome or set CHROME_PATH.')
  return found
}

async function launch() {
  const profile = mkdtempSync(join(tmpdir(), 'gb-brand-'))
  const chrome = spawn(
    findChrome(),
    [
      '--headless=new',
      '--remote-debugging-port=0',
      `--user-data-dir=${profile}`,
      '--no-first-run',
      '--no-default-browser-check',
      '--hide-scrollbars',
      '--force-color-profile=srgb',
      'about:blank',
    ],
    { stdio: ['ignore', 'ignore', 'pipe'] },
  )

  const endpoint = await new Promise((resolve, reject) => {
    let log = ''
    chrome.stderr.on('data', (chunk) => {
      log += chunk
      const match = log.match(/DevTools listening on (ws:\/\/\S+)/)
      if (match) resolve(match[1])
    })
    chrome.on('exit', (code) => reject(new Error(`Chrome exited (${code}) before it was ready:\n${log}`)))
  })

  const socket = new WebSocket(endpoint)
  await new Promise((resolve, reject) => {
    socket.addEventListener('open', resolve, { once: true })
    socket.addEventListener('error', reject, { once: true })
  })

  let nextId = 0
  const pending = new Map()
  const listeners = new Set()

  socket.addEventListener('message', ({ data }) => {
    const message = JSON.parse(data)
    if (message.id && pending.has(message.id)) {
      const { resolve, reject } = pending.get(message.id)
      pending.delete(message.id)
      if (message.error) reject(new Error(`${message.error.message} (${message.error.code})`))
      else resolve(message.result)
    } else if (message.method) {
      listeners.forEach((listener) => listener(message))
    }
  })

  const send = (method, params = {}, sessionId) =>
    new Promise((resolve, reject) => {
      const id = ++nextId
      pending.set(id, { resolve, reject })
      socket.send(JSON.stringify({ id, method, params, ...(sessionId ? { sessionId } : null) }))
    })

  const once = (method, sessionId) =>
    new Promise((resolve) => {
      const listener = (message) => {
        if (message.method === method && message.sessionId === sessionId) {
          listeners.delete(listener)
          resolve(message.params)
        }
      }
      listeners.add(listener)
    })

  /** Render an HTML string at a fixed size and return the screenshot bytes. */
  async function shoot(html, { width, height, format }) {
    const file = join(profile, `page-${nextId}.html`)
    writeFileSync(file, html)

    const { targetId } = await send('Target.createTarget', { url: 'about:blank' })
    const { sessionId } = await send('Target.attachToTarget', { targetId, flatten: true })

    await send('Page.enable', {}, sessionId)
    await send('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor: 1, mobile: false }, sessionId)
    if (format === 'png') {
      await send('Emulation.setDefaultBackgroundColorOverride', { color: { r: 0, g: 0, b: 0, a: 0 } }, sessionId)
    }

    const loaded = once('Page.loadEventFired', sessionId)
    await send('Page.navigate', { url: pathToFileURL(file).href }, sessionId)
    await loaded
    await send(
      'Runtime.evaluate',
      {
        expression: 'document.fonts.ready.then(() => Promise.all([...document.images].map((i) => i.decode())))',
        awaitPromise: true,
      },
      sessionId,
    )

    const { data } = await send(
      'Page.captureScreenshot',
      { format, ...(format === 'jpeg' ? { quality: 86 } : null), clip: { x: 0, y: 0, width, height, scale: 1 } },
      sessionId,
    )

    await send('Target.closeTarget', { targetId })
    return Buffer.from(data, 'base64')
  }

  const close = () => {
    socket.close()
    chrome.kill()
    rmSync(profile, { recursive: true, force: true })
  }

  return { shoot, close }
}

// -- Run --------------------------------------------------------------------

const browser = await launch()

try {
  mkdirSync(at('public/og'), { recursive: true })
  mkdirSync(at('public/icons'), { recursive: true })

  for (const card of cards) {
    const jpeg = await browser.shoot(cardHtml(card), { width: 1200, height: 630, format: 'jpeg' })
    writeFileSync(at('public/og', `${card.file}.jpg`), jpeg)
    console.log(`og/${card.file}.jpg  ${(jpeg.length / 1024).toFixed(0)} kB`)
  }

  for (const icon of icons) {
    const png = await browser.shoot(iconHtml(icon.size, icon), { width: icon.size, height: icon.size, format: 'png' })
    writeFileSync(at('public', icon.file), png)
    console.log(`${icon.file}  ${(png.length / 1024).toFixed(0)} kB`)
  }

  const pngs = []
  for (const size of icoSizes) {
    pngs.push({ size, data: await browser.shoot(iconHtml(size), { width: size, height: size, format: 'png' }) })
  }
  writeFileSync(at('public/favicon.ico'), ico(pngs))
  console.log(`favicon.ico  ${icoSizes.join(', ')} px`)
} finally {
  browser.close()
}
