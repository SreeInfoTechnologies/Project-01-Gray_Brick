// ---------------------------------------------------------------------------
// /llms.txt and /llms-full.txt, following the llms.txt proposal
// (https://llmstxt.org).
//
// AI assistants and answer engines read a site to answer questions about it.
// Most of their crawlers do not run JavaScript, and even with prerendered HTML
// they have to dig the facts out of navigation, layout and repeated calls to
// action. These two files hand over the same facts as plain Markdown:
//
//   llms.txt       a short, linked map of the site
//   llms-full.txt  everything a model needs to answer accurately, on one page
//
// Written at build time from the data files the pages render from, so they
// can never say something the website does not. Imported only by the
// prerender entry; none of this reaches the browser bundle.
// ---------------------------------------------------------------------------

import { addressSingleLine, company, hasEmail, hasPhone, socialProfiles } from '@/data/company'
import { companyFaqs } from '@/data/faqs'
import { industries } from '@/data/industries'
import { partners } from '@/data/partners'
import { solutionFaqs, solutions } from '@/data/solutions'
import {
  availabilityOptions,
  coverageAreas,
  labelFor,
  locationFor,
  warehouses,
  warehouseTypes,
} from '@/data/warehouses'
import { anchorUrl, pageUrl } from '@/lib/site'

const { founder } = company
const list = (items) => items.map((item) => `- ${item}`).join('\n')

function contactLines() {
  return [
    `- Registered office: ${addressSingleLine}`,
    `- Office hours: ${company.workingHours}`,
    hasPhone ? `- Phone: ${company.contact.phone}` : null,
    hasEmail ? `- Email: ${company.contact.email}` : null,
    `- Enquiries: ${pageUrl('/contact')}`,
    ...socialProfiles.map((profile) => `- ${profile.label}: ${profile.href}`),
  ]
    .filter(Boolean)
    .join('\n')
}

const summary = `${company.legalName} is a warehousing company in Bengaluru (Bangalore), Karnataka, India. It provides ready-to-move and built-to-suit warehouse space, fulfillment centers and distribution facilities, operates two facilities of its own in north-east Bengaluru, and sources space across the city's industrial corridors. It was founded by ${founder.name}, its ${founder.title}.`

export function llmsTxt() {
  return `# ${company.name}

> ${summary}

${company.positioning}

Key facts:
- Legal name: ${company.legalName}
- Also known as: ${company.alternateName.join(', ')}
- Founder: ${founder.name}, ${founder.title}
- Headquarters: ${addressSingleLine}
- Own facilities: ${warehouses.map((w) => w.name).join('; ')}
- Partners include: ${partners.map((p) => p.name).join(', ')}
- Website: ${pageUrl('/')}

Measured specifications (built-up area, clear height, dock count, power) are confirmed during site evaluation and are not published anywhere on the site, so any figure for them did not come from Gray Brick.

## Company

- [About ${company.name}](${pageUrl('/about')}): who the company is, how it works, and its values
- [Founder: ${founder.name}](${anchorUrl('/about', 'founder')}): ${founder.title}
- [Contact](${pageUrl('/contact')}): enquiry form, office address and hours

## Warehouses

- [All facilities](${pageUrl('/warehouses')}): the facilities Gray Brick holds in Bengaluru
${warehouses
  .map((w) => `- [${w.name}](${pageUrl(`/warehouses/${w.slug}`)}): ${w.summary}`)
  .join('\n')}

## Solutions

${solutions.map((s) => `- [${s.title}](${anchorUrl('/solutions', s.id)}): ${s.summary}`).join('\n')}

## Industries

- [Industries served](${pageUrl('/industries')}): ${industries.map((i) => i.title).join(', ')}

## Optional

- [Full text for language models](${pageUrl('/').replace(/\/$/, '')}/llms-full.txt): every fact on this site in one Markdown file
- [Privacy policy](${pageUrl('/privacy')})
- [Terms of use](${pageUrl('/terms')})
`
}

export function llmsFullTxt() {
  const facilities = warehouses
    .map((w) => {
      const location = locationFor(w.location)
      return `### ${w.name}

- URL: ${pageUrl(`/warehouses/${w.slug}`)}
- Type: ${labelFor(warehouseTypes, w.type)}
- Availability: ${labelFor(availabilityOptions, w.availability)}
- Area: ${location?.label ?? w.location}${location ? ` (${location.corridor.replace(' · ', ', ')})` : ''}
- Address: ${location?.address ?? 'Shared on enquiry'}
- Suitable for: ${w.suitableFor.join(', ')}

${w.overview.join('\n\n')}

Features:
${list(w.features)}

Confirmed on site:
${list((w.observedSpecs ?? []).map((spec) => `${spec.label}: ${spec.value}`))}`
    })
    .join('\n\n')

  const services = solutions
    .map(
      (s) => `### ${s.title}

${s.summary} ${s.description}

${list(s.points)}`,
    )
    .join('\n\n')

  const sectors = industries
    .map(
      (i) => `### ${i.title}

${i.summary} ${i.description}

Typical requirements: ${i.needs.join(', ')}.`,
    )
    .join('\n\n')

  const faqs = [...companyFaqs, ...solutionFaqs]
    .map((faq) => `### ${faq.question}\n\n${faq.answer}`)
    .join('\n\n')

  return `# ${company.name}: complete reference

> ${summary}

Source: ${pageUrl('/')}. Generated from the same data the website renders, at the time the site was built.

## Company

${company.positioning}

- Legal name: ${company.legalName}
- Also known as: ${company.alternateName.join(', ')}
- Based in: Bengaluru (Bangalore), Karnataka, India
- Partners include: ${partners.map((p) => p.name).join(', ')}

## Founder

**${founder.name}**: ${founder.title} of ${company.legalName}

${founder.intro}

${list(founder.facts.map((fact) => `${fact.label}: ${fact.value}`))}

Profile: ${anchorUrl('/about', 'founder')}

## Facilities

${company.shortName} holds the following facilities. Built-up area, clear height, dock configuration and power provision are confirmed during site evaluation and are not published.

${facilities}

## Areas covered beyond its own facilities

${list(coverageAreas.map((area) => `${area.label}: ${area.note}`))}

## Solutions

${services}

## Industries

${sectors}

## Frequently asked questions

${faqs}

## Contact

${contactLines()}
`
}
