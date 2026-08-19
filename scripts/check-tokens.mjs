#!/usr/bin/env node
/**
 * Guards the design system.
 *
 * Tailwind v4 generates utilities from the @theme block. A class naming a token
 * that does not exist there is not an error: no rule is emitted and the element
 * silently inherits its parent's colour. That failure is invisible in a build
 * log and easy to miss on screen, so it is checked here instead.
 *
 * Also fails on raw Tailwind palette colours (bg-blue-500, text-gray-700) and
 * on arbitrary hex values in markup, both of which route around the brand.
 */
import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'

const root = process.cwd()
const theme = readFileSync(join(root, 'src/styles/tailwind.css'), 'utf8')

const defined = new Set(
  [...theme.matchAll(/--color-gb-([a-z0-9-]+)\s*:/g)].map((m) => m[1]),
)
// shadow-gb-* resolves against a different namespace, so it gets its own set.
const shadows = new Set(
  [...theme.matchAll(/--shadow-gb-([a-z0-9-]+)\s*:/g)].map((m) => m[1]),
)

const walk = (dir, out = []) => {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry)
    if (statSync(full).isDirectory()) walk(full, out)
    else if (/\.(jsx?|scss|css|html)$/.test(entry)) out.push(full)
  }
  return out
}

const files = [...walk(join(root, 'src')), join(root, 'index.html')]

const PREFIX =
  '(?:bg|text|border|from|via|to|ring|fill|stroke|decoration|outline|divide|placeholder|accent|caret)'
const BRAND = new RegExp(`\\b(?:[a-z-]+:)*${PREFIX}-gb-([a-z0-9-]+)`, 'g')
const SHADOW = /\b(?:[a-z-]+:)*shadow-gb-([a-z0-9-]+)/g
const VAR = /var\(\s*--color-gb-([a-z0-9-]+)/g
// Tailwind's own palette. Semantic red is allowed nowhere: we ship gb-error.
const PALETTE =
  /\b(?:[a-z-]+:)*(?:bg|text|border|from|via|to|ring|fill|stroke|decoration|outline|divide|placeholder|accent|caret)-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-\d{2,3}\b/g
const HEX = /(?:bg|text|border|from|via|to|fill|stroke|shadow|outline|ring)-\[#[0-9a-fA-F]{3,8}\]/g

const problems = []

for (const file of files) {
  const src = readFileSync(file, 'utf8')
  const rel = relative(root, file)
  const lines = src.split('\n')

  lines.forEach((line, i) => {
    const at = `${rel}:${i + 1}`

    for (const m of line.matchAll(BRAND)) {
      // Strip a trailing opacity modifier: bg-gb-slate/70 -> slate
      const token = m[1].replace(/\/.*$/, '')
      if (!defined.has(token)) {
        problems.push(`${at}  unknown design token "gb-${token}" in "${m[0]}"`)
      }
    }
    for (const m of line.matchAll(SHADOW)) {
      if (!shadows.has(m[1])) {
        problems.push(`${at}  unknown shadow token "gb-${m[1]}" in "${m[0]}"`)
      }
    }
    // var(--color-gb-*) in SCSS fails the same silent way: an undefined custom
    // property makes the declaration invalid at computed-value time.
    for (const m of line.matchAll(VAR)) {
      if (!defined.has(m[1])) {
        problems.push(`${at}  unknown design token in var(--color-gb-${m[1]})`)
      }
    }
    for (const m of line.matchAll(PALETTE)) {
      problems.push(`${at}  raw Tailwind palette colour "${m[0]}" (use a gb-* token)`)
    }
    for (const m of line.matchAll(HEX)) {
      problems.push(`${at}  hardcoded hex "${m[0]}" (use a gb-* token)`)
    }
  })
}

// Project component classes (anything starting with `gb-`, as opposed to a
// Tailwind utility built FROM a gb token like `bg-gb-black`). A class that is
// referenced in markup but defined nowhere is not an error to any tool in the
// chain: the element just renders without it. That is how a whole photographic
// grade once disappeared from the build while every check still passed.
{
  const styleSrc = walk(join(root, 'src/styles'))
    .map((f) => readFileSync(f, 'utf8'))
    .join('\n')
  // `.gb-delay-#{$i}` in a SCSS loop yields `gb-delay-` here, which is kept as
  // a prefix rather than as an exact name.
  const names = new Set(['gb-scroll-locked'])
  const prefixes = []
  const collect = (src) => {
    for (const m of src.matchAll(/\.(gb-[a-z0-9-]*)/g)) {
      if (m[1].endsWith('-')) prefixes.push(m[1])
      else names.add(m[1])
    }
  }
  collect(styleSrc)
  for (const m of readFileSync(join(root, 'src/styles/tailwind.css'), 'utf8')
    .matchAll(/@utility\s+(gb-[a-z0-9-]+)/g)) {
    names.add(m[1])
  }
  const known = (c) => names.has(c) || prefixes.some((p) => c.startsWith(p))

  // Only class positions count. The same `gb-` naming is used for element ids
  // that aria-controls and htmlFor point at, and those are not classes.
  const NOT_A_CLASS = /(?:\bid|aria-controls|aria-labelledby|aria-describedby|htmlFor)=["'{`]?$/

  for (const file of files) {
    if (!file.endsWith('.jsx')) continue
    const rel = relative(root, file)
    readFileSync(file, 'utf8')
      .split('\n')
      .forEach((line, i) => {
        for (const m of line.matchAll(/(?:^|[\s'"`])(gb-[a-z0-9-]+)/g)) {
          if (NOT_A_CLASS.test(line.slice(0, m.index + m[0].length - m[1].length))) continue
          if (!known(m[1])) {
            problems.push(`${rel}:${i + 1}  class "${m[1]}" is used but defined in no stylesheet`)
          }
        }
      })
  }
}

// Surface roles: graphite is the CARD surface. A <section> painted with it
// leaves any card inside sitting on its own colour with no edge between them,
// which reads as a rendering bug rather than as a design choice. Sections get
// the page ground or the section surface; nothing else.
for (const file of files) {
  if (!file.endsWith('.jsx')) continue
  const rel = relative(root, file)
  readFileSync(file, 'utf8')
    .split('\n')
    .forEach((line, i) => {
      if (/<section\b/.test(line) && /\bbg-gb-(graphite|slate)\b/.test(line)) {
        problems.push(
          `${rel}:${i + 1}  <section> uses a card surface; sections take bg-gb-black or bg-gb-charcoal`,
        )
      }
    })
}

// Hex literals are legal only in the token file itself and in the pre-hydration
// splash, which cannot depend on the stylesheet.
const allowHex = new Set(['src/styles/tailwind.css', 'index.html'])
for (const file of files) {
  const rel = relative(root, file)
  if (allowHex.has(rel)) continue
  const src = readFileSync(file, 'utf8')
  src.split('\n').forEach((line, i) => {
    if (/#[0-9a-fA-F]{6}\b/.test(line) && !/^\s*(\/\/|\*|<!--)/.test(line)) {
      problems.push(`${rel}:${i + 1}  hex literal outside the token file: ${line.trim().slice(0, 70)}`)
    }
  })
}

if (problems.length) {
  console.error(`\n✖ ${problems.length} design-system violation(s):\n`)
  for (const p of problems) console.error('  ' + p)
  console.error('')
  process.exit(1)
}

console.log(
  `✔ design tokens clean — ${defined.size} colour + ${shadows.size} shadow tokens, ` +
    `${files.length} files scanned`,
)
