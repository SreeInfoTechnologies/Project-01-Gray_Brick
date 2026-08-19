# Gray Brick Infra: Corporate Website

Production frontend for **Gray Brick Infra Pvt. Ltd.** Ready-to-move and built-to-suit
warehousing, fulfillment centers, distribution centers and end-to-end supply chain support.

---

## Stack

| Concern    | Choice                                                        |
| ---------- | ------------------------------------------------------------- |
| Framework  | React 19 (JavaScript, no TypeScript)                          |
| Build      | Vite 8                                                         |
| Styling    | Tailwind CSS v4 utilities + SCSS for effects and theme tokens |
| Routing    | React Router 7                                                 |
| Fonts      | Inter Variable, self-hosted via `@fontsource-variable/inter`  |
| Metadata   | React 19 native document metadata (no helmet dependency)      |
| Animation  | In-house IntersectionObserver + CSS system (no GSAP/Framer)   |

## Getting started

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build into dist/
npm run preview   # serve the production build
npm run lint      # eslint, including jsx-a11y and the no-inline-styles rule
```

---

## Before this goes live

Three content items are deliberately left empty rather than filled with invented data.
All three are single-line changes.

### 1. Phone and email (`src/data/company.js`)

```js
contact: {
  phone: null,   // e.g. '+91 80 0000 0000'
  email: null,   // e.g. 'enquiries@graybrickinfra.com'
},
```

While these are `null` the footer, contact page and mobile drawer omit the rows entirely and
route visitors through the enquiry form. Filling them in makes them appear everywhere,
including in the `LocalBusiness` structured data.

### 2. Enquiry endpoint (`.env`)

**Until this is set, submitted enquiries are not delivered anywhere.** The form completes and
shows its success state so the experience can be demonstrated, and a warning is logged to the
console with the payload. Copy `.env.example` to `.env` and point it at whatever receives
submissions (a form service, an API route, a serverless function):

```
VITE_ENQUIRY_ENDPOINT=https://example.com/api/enquiries
```

The request is a `POST` with a JSON body containing the form fields plus `submittedAt` and,
on facility pages, `facility`. See `src/lib/enquiry.js`.

Optionally also set `VITE_SITE_URL=https://graybrickinfra.com` so canonical and Open Graph
URLs are absolute in the build rather than derived from `window.location`.

### 3. Sitemap and robots (`public/robots.txt`)

`robots.txt` ships allowing full crawling. Once the production domain is
confirmed, add the absolute `Sitemap:` line to it and publish a `sitemap.xml`
covering the eight static routes plus one URL per facility. Setting
`VITE_SITE_URL` at the same time makes canonical and Open Graph URLs absolute.

### 4. Leadership designation (`src/data/company.js`)

The About page carries a leadership block: portrait, name and title.

```js
leadership: {
  name: 'B Y Jayanth Reddy',
  title: 'Chief Executive Officer',   // <- confirm this
  message: null,
},
```

**Confirm the designation.** The supplied portrait was named
`Ceo-Gray-Brick.png`, so Chief Executive Officer is used. In an Indian private
limited company, Managing Director and Director are distinct roles, so if that
is the correct title change this one string. It also feeds the image alt text.

`message` is null on purpose. A sentence in his own words would carry real
weight in that space, but writing one for him would mean attributing invented
words to a named real person. Add it and the paragraph renders; leave it and
the block shows name and title only.

Once the title is confirmed it is also worth adding him to the `LocalBusiness`
structured data in `StructuredData.jsx` as `founder` or `employee`, whichever
is accurate.

### 5. Social profile URLs (`src/data/company.js`)

The footer and mobile drawer now render LinkedIn, Instagram, X, Facebook and
YouTube icons. **Each `href` is currently the platform's home page, not Gray
Brick's profile.** Replace them, and delete any platform the company does not
actually maintain:

```js
social: [
  { label: 'LinkedIn', icon: 'linkedin', href: 'https://www.linkedin.com/company/…' },
  { label: 'Instagram', icon: 'instagram', href: 'https://www.instagram.com/…' },
],
```

An empty array hides the block entirely. The same list feeds the `sameAs`
property in the structured data, so fixing it here fixes it everywhere.

---

## Content rules

### Voice

The copy is written for a Bengaluru operations lead who is busy. Short sentences, specific
nouns, Indian business English, and a claim only where there is something to back it. Sections
lead with the reader's problem ("Moving into a new market?") rather than our capabilities, and
CTAs say what happens next: *Explore warehouses*, *Check availability*, *Find my warehouse*,
*Request a call*. Never *Learn more* or *Submit*.

The marketing copy says **Bengaluru**. "Bangalore" appears nowhere; the registered address uses
the official wording.

**No em dashes.** The site contains none, in the copy or the code. An em dash used as a
sentence-level pause is one of the strongest tells that text was machine-written, so clauses are
joined with a full stop, a comma or a colon instead. Ranges and the postal address keep their en
dash, which is ordinary Indian address typography.

A few other patterns are avoided for the same reason: the "X, not Y" rhetorical flip (kept to
two deliberate uses), "that is where…", "whether X or Y", and the usual vocabulary tells
(*seamless*, *leverage*, *robust*, *elevate*, *unlock*, *streamline*, *holistic*, *bespoke*).

If you extend the site, the test for any new sentence is: could five hundred other companies
publish it unchanged? If yes, it is not specific enough yet.

### Honesty

The site states capabilities, never metrics. There are no invented warehouse counts, areas,
clear heights, certifications, client names, logos, testimonials, years of operation or
performance figures anywhere in the codebase, and no personal identification information.

**There is no customer logo strip and no testimonials.** Both were deliberately left out.
Gray Brick has not published a verified customer list, and a fabricated one is the fastest way
to lose a serious enquiry. The homepage proves relevance by naming the *sectors* it is built
for instead. When real, publicly approvable customer relationships exist, `TrustBand.jsx` is
the component to extend, and the heading should describe the actual relationship (tenant,
operating partner, customer) rather than a vague "Trusted by".

- `src/data/warehouses.js` is **placeholder inventory**. Facilities are described by real
  Bengaluru industrial corridors, and every measurable field resolves to the shared
  `ON_REQUEST` constant, which the UI renders as *"Available on request"* in a muted style.
- Replacing it with live data means changing one function: `loadWarehouses()` in
  `src/hooks/useWarehouses.js`. Every consumer already handles loading, error, empty-inventory
  and no-results states.
- The map link uses Google's documented Maps URL API against the real office address, with no
  fabricated place ID and no API key required.

## Imagery

`src/assets/images/` holds 22 Unsplash-licensed photographs, converted to WebP and sized for
their largest on-screen use (≈3.7M total, no single page loading more than a fraction of it).

They were selected for an **Indian** context: Eicher and Tata goods carriers, Indian Railways
container freight, an Indian container port, stacked crates, and industrial elevations of the
kind found on the Bengaluru corridors. Photographs carrying obvious non-Indian cues (European
solar-roof logistics parks, US trailer yards, snow-covered industrial estates) were
deliberately excluded. The remaining warehouse interiors (racking, clear floors, steel trusses)
carry no geographic markers at all, which is why they sit comfortably alongside the rest.

**Replace them with Gray Brick's own facility photography when it is available:** keep the
filenames and every reference updates itself.

## The loading splash

`index.html` carries a self-contained splash: the brick wall, the mark rising
out of its own baseline, the wordmark settling beneath it, and a gold progress
rule. It shows on a full page load only. Route changes are client-side, so it
never reappears while someone is browsing.

Three things about it are deliberate:

- **Its CSS, markup and controller are inline.** The splash exists to cover the
  wait for the stylesheet and the JS bundle, so it cannot wait for them itself.
  It paints on the first chunk of HTML with no stylesheet, font or image
  request of its own.
- **The mark is the real traced logo**, generated from `logoPaths.js` by
  `node scripts/build-loader-svg.mjs`. Regenerate and paste into `index.html`
  if the logo ever changes. Showing an approximation of your own logo, one
  second before the real one appears in the header, would be worse than no
  splash at all.
- **Everything is namespaced `gbl-`.** The first draft used `gb-` and its
  `.gb-progress` collided with the site's own scroll-progress rule, which sets
  `transform: scaleX(0)` and silently flattened the loader's bar to zero width.

Safety rails, because a splash that will not leave is worse than none:

| Guard | Behaviour |
| --- | --- |
| `MIN_VISIBLE` 4000ms | The display window. The bar is paced to fill across exactly this span |
| `PENDING_CEILING` 92% | If the page genuinely takes longer than the window, the bar waits here rather than sitting full and lying about it |
| `HARD_LIMIT` 12000ms | Dismisses regardless of what stalled |
| `<noscript>` | Hides the splash entirely; the site is never blocked |
| Monotonic progress | Module scripts defer `DOMContentLoaded` until after they run, so naive milestones arrive out of order; the bar can never go backwards |

Progress is paced against the display window rather than guessed from
milestones. On a fast connection the page is ready in a few hundred
milliseconds, so a milestone-driven bar would jump to 100% and then sit there
for the rest of the window, which reads as broken. Change `MIN_VISIBLE` to
change the duration; the bar follows it automatically.

The handoff is on the real `load` event, not a timer. While `html.gbl-loading`
is set the hero and page entrance animations are held at their first frame
(`animations.scss`) so they play *to* the visitor as the splash lifts, rather
than to an empty room behind it.

## The logo

`src/components/common/logoPaths.js` holds the Gray Brick mark and wordmark as
vector paths **traced from the supplied artwork** (`Gray-brick-new-logo.jpeg`),
not redrawn by hand. The photograph was illumination-corrected against a local
background, thresholded, cleaned with a morphological open/close, boundary
traced, simplified, and fitted to cubic curves with the hard architectural
corners preserved, so the G, the tower with its gold column, the B and the
sweep are the real letterforms.

`Logo.jsx` composes them into three lockups:

| `layout`     | Used for                        |
| ------------ | ------------------------------- |
| `horizontal` | Header and mobile drawer        |
| `stacked`    | Footer, matches the artwork     |
| `mark`       | Compact placements, favicon     |

The neutral letterforms use `currentColor` and the gold column is pinned to the
brand accent. The site has a single dark ground, so the lockup carries one
treatment rather than a light and a dark copy of the artwork.

`public/favicon.svg` is the mark on a brand-black tile, generated from the same
paths. `src/assets/brand/gray-brick-logo.svg` is the full lockup as a standalone
file for decks, signage and email signatures.

If a proper vector original ever turns up, replacing `logoPaths.js` is the only
change needed.

## Motion

Everything is CSS transitions driven by IntersectionObserver, with no animation
library. `src/styles/animations.scss` holds the whole system.

### The homepage is deliberately still

**Nothing on the homepage animates in on scroll.** The page is fully composed
the moment it renders; the work of holding attention is done by typography,
layout, section numbering and hover states instead. The only motion is the
hero's one-time load-in, which is a CSS animation (`.gb-intro`), not a scroll
effect.

This is implemented with a context rather than a second set of components:

```jsx
// src/pages/Home.jsx
<MotionContext.Provider value={false}>…</MotionContext.Provider>
```

`Reveal`, `AnimatedWords`, `GoldRule` and `useParallax` all read
`useMotionEnabled()` (`src/lib/motion.js`). Where it is `false` they render
their finished state directly: no observer is created, no reveal classes are
emitted, and `AnimatedWords` renders the heading as a single text node instead
of masked per-word spans. The homepage therefore contains **zero** `.gb-reveal`
nodes, not hidden ones.

Interior pages keep their scroll reveals. To make any other page still, wrap it
the same way; to make the whole site still, change the context default.

### Two rules for anything added to the system

1. **Reduced motion wins.** Every animated state is authored so that with
   `prefers-reduced-motion: reduce` the element renders in its *final* state.
   No content can be stranded behind an animation that never plays.
2. **Never animate the observed element into nothing.** IntersectionObserver
   accounts for a target's own `clip-path` and `transform`, so an element
   clipped or scaled to zero can never report as intersecting and would stay
   invisible forever. Anything that collapses to zero is applied to a *child*.

Components: `Reveal` (eight variants), `AnimatedWords`, `AnimatedHeading`,
`GoldRule`, plus `useParallax` and `useScrollProgress`, which only ever write
CSS custom properties so no element carries an inline transform.

One layout trap worth knowing: a section with `overflow: hidden` becomes the
scroll container for any `position: sticky` descendant, which then silently
stops sticking. The corridor band is deliberately un-clipped for that reason.

## Deployment

Pushing to `main` builds and publishes to GitHub Pages via
`.github/workflows/deploy.yml`. Pull requests run the same lint, build and
verify steps without deploying.

**Live:** https://sreeinfotechnologies.github.io/Project-01-Gray_Brick/

```
npm run ci        # exactly what the workflow runs
npm run verify:build
```

### Why this needs more than "upload dist"

The app is a client-rendered SPA served from a project sub-path, and Pages has
no rewrite rules. Three things follow from that, all handled in
`vite.config.js`:

| Problem | Handling |
| --- | --- |
| Assets resolve against the domain root | `base` comes from `VITE_BASE_PATH`; CI derives it from the repo name |
| Router thinks it is at the root | `BrowserRouter basename` reads `import.meta.env.BASE_URL` |
| A refresh on `/warehouses/<slug>` has no file behind it | A real `index.html` is emitted per route, so Pages returns **200** |

The last one is the one that matters. The usual fix is a `404.html` copy of
`index.html`: the SPA boots and renders the right route, but Pages serves it
with a **404 status**, which is a poor trade for a site carrying per-page
canonicals and structured data. So every route the router serves gets its own
file and a 200, and `404.html` is kept for what it actually means, a path that
does not exist. Facility routes are enumerated from `warehouses.js`, so adding
a facility adds its page automatically.

`.nojekyll` ships in `public/` because Pages otherwise runs Jekyll over the
output and strips paths it treats as private.

### Moving off Pages

Set `VITE_BASE_PATH=/` and point the host at `dist/`. On a host with rewrites
the per-route files are harmless, but you can also just send unknown paths to
`index.html`:

- **Netlify** — `/* /index.html 200` in `_redirects`
- **Vercel** — `{ "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }`
- **Nginx** — `try_files $uri $uri/ /index.html;`
- **Apache** — `FallbackResource /index.html`

Hashed assets under `/assets/` are safe to cache immutably; the HTML is not.

### One caveat of a project sub-path

`robots.txt` is served from `/Project-01-Gray_Brick/robots.txt`, but crawlers
only look at the domain root, which belongs to the organisation account. A
custom domain fixes this properly and is worth doing before any real SEO push.

## Architecture

```
src/
  assets/images/      photography (imported, hashed and served by Vite)
  components/
    common/           Button, Container, Icon, ImageFrame, Logo, Seo, Reveal, Field, …
    layout/           Navbar, MobileMenu, Footer, Layout, ScrollToTop
    home/             Hero, ValueStrip, AboutPreview, SolutionsPreview, WarehouseFinder, …
    warehouses/       WarehouseCard, WarehouseFilters, WarehouseGallery, WarehouseSpecs
    solutions/        SolutionSection, ProcessFlow
    industries/       IndustryCard
    contact/          EnquiryForm, ContactDetails
  data/               company, navigation, solutions, industries, warehouses
  hooks/              useInView, useScrolled, useLockBodyScroll, useFocusTrap, useWarehouses
  lib/                cn, enquiry, validation
  pages/              one file per route
  styles/             tailwind.css (tokens), variables.scss, globals.scss, animations.scss
```

### Design tokens

Colours, type scale, radii, shadows and easing live **once**, in the `@theme` block of
`src/styles/tailwind.css`. Tailwind generates utilities from them (`bg-gb-charcoal`,
`text-gb-gold`, `text-display-xl`) and SCSS reads the same custom properties via
`var(--color-gb-*)`. There is no second copy of the palette to drift.

Note the block is `@theme static`, not `@theme`. By default Tailwind only emits the theme
variables that some generated utility happens to reference, so a token used **only** from
SCSS via `var()` gets tree-shaken out of the bundle. The rule then becomes invalid at
computed-value time and the element quietly inherits its parent's colour: no build error, no
console warning. `static` forces the whole palette into the output. `npm run check:tokens`
and `npm run verify:build` both assert this, the latter against the built CSS.

`src/styles/variables.scss` holds only what Tailwind has no opinion about: the z-index scale,
header heights, motion constants and breakpoint mixins.

### The palette

Every value is sampled from the logo artwork, not invented. Running a luminance-bucketed
average over `src/assets/brand/gray-brick-logo-source.jpeg` gives `#0d0d0b`, `#191917`,
`#282828`, `#393939`, `#585858`, `#a8a8a9`, `#d8d8d9` across the neutrals and `#886e45`,
`#b29361`, `#c8a771` across the gold. Those measurements are what ship, nudged to an even
step.

| Role                   | Token                  | Value     |
| ---------------------- | ---------------------- | --------- |
| Page ground, footer    | `gb-black`             | `#0d0e0f` |
| Section surface        | `gb-charcoal`          | `#171819` |
| Card surface           | `gb-graphite`          | `#242526` |
| Raised / hover surface | `gb-slate`             | `#2e2f30` |
| Borders, dividers      | `gb-concrete`          | `#3b3c3d` |
| Strong border          | `gb-steel`             | `#5a5c5d` |
| Muted text             | `gb-silver-dark`       | `#8a8c8d` |
| Secondary text         | `gb-silver`            | `#a9aaab` |
| Primary text, headings | `gb-silver-light`      | `#d1d1cf` |
| Deliberate max contrast| `gb-white`             | `#f2f2f0` |
| Accent                 | `gb-gold`              | `#b19260` |
| Accent hover           | `gb-gold-light`        | `#c5a56f` |
| Gold fills and borders | `gb-gold-dark`         | `#8b7045` |

Two rules that are not obvious from the table:

- **`gb-gold-dark` is never a text colour.** It reaches 3.29:1 on the card surface, so it is
  a fill, a border and a gradient stop only. `gb-gold` (5.23:1) and `gb-gold-soft` are the
  gold values that may carry text.
- **Every text token clears 4.5:1 on black, charcoal *and* graphite.** `gb-silver-dark` is
  the floor at 4.55:1; nothing dimmer is a text colour in this system. That means a text
  token can be moved between surfaces without silently failing.

Semantic aliases (`--color-gb-surface`, `--color-gb-surface-card`, `--color-gb-text`,
`--color-gb-border`, `--color-gb-accent`, …) map the ramp onto roles. The role mapping lives
on the **tokens**, which is what a utility-first codebase can actually consume; only the two
roles that remove real repetition are also classes, `.gb-page` and `.gb-card` in
`src/styles/components/_surfaces.scss`. A `.gb-text-secondary` that just restated
`text-gb-silver` would be a second name for one thing, so there isn't one.

### Surfaces

The site has **one ground**. There is no light mode and no light/dark variant of any
component: the `tone` / `onDark` props that used to thread polarity through the tree are
gone, along with the paired button variants (`outline` vs `outlineLight`).

Surfaces step in one direction only, and each level has a job:

```
gb-black      page ground, footer, alternating bands
gb-charcoal   section surface
gb-graphite   cards, inputs, panels        <- never a <section>
gb-slate      hover / raised state
```

A `<section>` painted with the card surface leaves every card inside it sitting on its own
colour with no edge between them, which reads as a rendering bug. `check:tokens` fails the
build on it. Sections alternate black and charcoal down the page so a long page does not read
as one flat field.

Hover moves **toward** the light (`gb-graphite` → `gb-slate`) and the border warms toward
gold. On a dark ground the drop shadow does almost nothing, so colour and a small lift carry
the interaction instead.

### Photography

Stock warehousing and freight photography arrives in whatever colour it was shot in, and
several of the rail and port frames are a hard cyan that belongs to no part of this palette.
Two grades pull them into the brand, both applied through `ImageFrame` or directly on the
backdrop `<img>`:

- `.gb-photo` — card and editorial imagery. Mild, so the photograph stays realistic.
- `.gb-photo--backdrop` — full-bleed frames sitting behind text under a scrim. Firmer,
  because they carry no detail the reader is asked to study.

The grades were chosen by running every file in `src/assets/images` through the filter matrix
and measuring the result, not by taste. Under the card grade all but one image drops below
14% of pixels in the cyan band while the warehouse interiors keep enough saturation to still
read as photographs; under the backdrop grade the Solutions hero goes from 0.394 mean
saturation and 58% cyan to 0.119 and 22%.

One photograph resisted any grade a realistic image can take: `rail-container-freight.webp`
is teal to the bone and still measured 50% cyan at settings that flattened everything else.
It stays in the galleries, where it is one frame of four, and the Doddaballapur card now
fronts `container-truck-dusk.webp` instead. Note that `container-yard.webp` was the obvious
neutral swap but carries prominent Hapag-Lloyd and Evergreen markings; incidental in a
gallery thumbnail, but fronting a facility card it starts to read as a stated client
relationship, which this site does not claim.

### Styling rules enforced in CI

- **No inline styles.** `style={{ … }}` is a lint *error*, not a convention, see the
  `no-restricted-syntax` rule in `eslint.config.js`. Animation delays are SCSS classes, and
  every dynamic value routes through a class name.
- SCSS is wrapped in `@layer base` / `@layer components` so Tailwind utilities written in JSX
  always win the cascade.
- **`npm run check:tokens`** fails the build on: a `gb-*` class used in markup but defined in
  no stylesheet, a `var(--color-gb-*)` naming a token that does not exist, a raw Tailwind
  palette colour (`bg-blue-500`), a hardcoded hex outside the token file, and a `<section>`
  painted with a card surface. Each of these fails *silently* at runtime, which is why they
  are checked rather than left to review.
- **`npm run verify:build`** re-checks the design system against the built CSS, so a token
  that survives source review but gets tree-shaken out of the bundle still fails CI.

### Motion

See the [Motion](#motion) section above. In short: interior pages reveal on
scroll, the homepage does not, and the switch is `MotionContext`.

### Accessibility

Semantic landmarks, a skip link, one `<h1>` per page, visible gold focus rings on every
interactive element, `aria-current` on active navigation, a focus-trapped mobile drawer with
Escape-to-close and body scroll locking, labelled form fields with `aria-invalid` /
`aria-describedby` error wiring, and meaningful `alt` text on every photograph.
`eslint-plugin-jsx-a11y` runs on every lint.

### Performance

Route-level code splitting, WebP imagery at display size, `loading="lazy"` +
`decoding="async"` below the fold, `fetchPriority="high"` on the LCP hero, fixed aspect-ratio
frames so no image can shift layout, a two-crop `<picture>` hero so phones do not download the
desktop frame, and `scrollbar-gutter: stable` so opening the drawer cannot reflow the page.
