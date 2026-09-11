// ---------------------------------------------------------------------------
// schema.org structured data.
//
// Every node carries a stable `@id`, and nodes refer to each other by it, so
// search engines and AI systems can assemble one connected picture: this
// website is published by this organisation, which was founded by this
// person, operates these facilities and offers these services.
//
//   /#organization   the company (a LocalBusiness, which is an Organization)
//   /#website        the website
//   /about/#founder  the founder, at the About page section about the founder
//
// Built strictly from src/data. A field the company has not supplied yet
// (phone, email, social profiles) is omitted rather than emitted empty.
// ---------------------------------------------------------------------------

import brandedFacade from '@/assets/images/gb-forecourt-branded-wide.webp'
import founderPortrait from '@/assets/images/founder-portrait.webp'
import { company, directionsUrl, socialProfiles } from '@/data/company'
import { solutions } from '@/data/solutions'
import { coverageAreas, labelFor, locationFor, warehouseTypes } from '@/data/warehouses'
import { SITE_NAME, anchorUrl, assetUrl, pageUrl } from '@/lib/site'

const LANG = 'en-IN'

export const ids = {
  organization: () => `${pageUrl('/')}#organization`,
  website: () => `${pageUrl('/')}#website`,
  founder: () => anchorUrl('/about', 'founder'),
  logo: () => `${pageUrl('/')}#logo`,
  webpage: (path) => `${pageUrl(path)}#webpage`,
  breadcrumb: (path) => `${pageUrl(path)}#breadcrumb`,
  facility: (slug) => `${pageUrl(`/warehouses/${slug}`)}#facility`,
  service: (id) => anchorUrl('/solutions', id),
}

const ref = (id) => ({ '@id': id })

const image = (src, { width, height, caption } = {}) => ({
  '@type': 'ImageObject',
  url: assetUrl(src),
  contentUrl: assetUrl(src),
  ...(width ? { width, height } : null),
  ...(caption ? { caption } : null),
})

const bengaluru = {
  '@type': 'City',
  name: 'Bengaluru',
  alternateName: 'Bangalore',
  containedInPlace: { '@type': 'State', name: 'Karnataka', containedInPlace: { '@type': 'Country', name: 'India' } },
}

const officeAddress = {
  '@type': 'PostalAddress',
  streetAddress: `${company.address.building}, ${company.address.landmark}, ${company.address.locality}`,
  addressLocality: 'Bengaluru',
  addressRegion: company.address.region,
  postalCode: company.address.postalCode,
  addressCountry: 'IN',
}

const facilityAddress = (location) => ({
  '@type': 'PostalAddress',
  streetAddress: location.street,
  addressLocality: 'Bengaluru',
  addressRegion: 'Karnataka',
  postalCode: location.postalCode,
  addressCountry: 'IN',
})

const directionsTo = (address) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`

/* -- Site-wide ----------------------------------------------------------- */

export function organizationNode(warehouseList = []) {
  return {
    '@type': 'LocalBusiness',
    '@id': ids.organization(),
    name: company.name,
    legalName: company.legalName,
    alternateName: company.alternateName,
    url: pageUrl('/'),
    description: company.positioning,
    logo: {
      '@type': 'ImageObject',
      '@id': ids.logo(),
      url: assetUrl('/icons/icon-512.png'),
      contentUrl: assetUrl('/icons/icon-512.png'),
      width: 512,
      height: 512,
      caption: company.legalName,
    },
    image: [
      image(brandedFacade, {
        width: 1600,
        height: 899,
        caption: `The ${company.name} facility at Horamavu, Bengaluru, with the company logo on its gable`,
      }),
    ],
    address: officeAddress,
    hasMap: directionsUrl,
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: company.openingHours.days,
      opens: company.openingHours.opens,
      closes: company.openingHours.closes,
    },
    areaServed: [
      bengaluru,
      ...coverageAreas.map((area) => ({ '@type': 'Place', name: `${area.label}, Bengaluru`, description: area.note })),
    ],
    founder: ref(ids.founder()),
    knowsAbout: [
      'Warehousing',
      'Warehouse leasing',
      'Ready-to-move warehouses',
      'Built-to-suit warehouses',
      'Fulfillment centers',
      'Distribution centers',
      'Quick commerce warehousing',
      'Supply chain management',
      'Industrial real estate in Bengaluru',
    ],
    location: warehouseList.map((warehouse) => facilityRef(warehouse)),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Warehousing solutions',
      itemListElement: solutions.map((solution) => ({
        '@type': 'Offer',
        itemOffered: serviceNode(solution),
      })),
    },
    ...(company.contact.phone ? { telephone: company.contact.phone } : null),
    ...(company.contact.email ? { email: company.contact.email } : null),
    ...(socialProfiles.length ? { sameAs: socialProfiles.map((s) => s.href) } : null),
  }
}

export function websiteNode() {
  return {
    '@type': 'WebSite',
    '@id': ids.website(),
    url: pageUrl('/'),
    name: SITE_NAME,
    alternateName: company.alternateName,
    description: company.shortStatement,
    publisher: ref(ids.organization()),
    inLanguage: LANG,
  }
}

export function founderNode() {
  const { founder } = company
  const fact = (label) => founder.facts?.find((f) => f.label === label)?.value
  const qualification = fact('Qualification')
  const focus = fact('Focus')

  // "B Y Jayanth Reddy" is also written and searched as "Jayanth Reddy".
  const withoutInitials = founder.name.replace(/^(?:[A-Z]\.?\s+)+/, '')

  return {
    '@type': 'Person',
    '@id': ids.founder(),
    name: founder.name,
    ...(withoutInitials !== founder.name ? { alternateName: withoutInitials } : null),
    jobTitle: founder.title,
    description: founder.intro,
    url: anchorUrl('/about', 'founder'),
    image: image(founderPortrait, {
      width: 880,
      height: 1100,
      caption: `${founder.name}, ${founder.title} of ${company.legalName}`,
    }),
    worksFor: ref(ids.organization()),
    workLocation: bengaluru,
    ...(qualification
      ? {
          hasCredential: {
            '@type': 'EducationalOccupationalCredential',
            credentialCategory: 'degree',
            name: qualification,
          },
        }
      : null),
    knowsAbout: ['Finance', focus ?? 'Warehousing'],
  }
}

/* -- Page-level ---------------------------------------------------------- */

export function webPageNode({ path, name, description, type = 'WebPage', image: src, imageAlt, about, mainEntity }) {
  return {
    '@type': type,
    '@id': ids.webpage(path),
    url: pageUrl(path),
    name,
    description,
    isPartOf: ref(ids.website()),
    about: about ?? ref(ids.organization()),
    inLanguage: LANG,
    ...(src ? { primaryImageOfPage: image(src, { caption: imageAlt }) } : null),
    ...(mainEntity ? { mainEntity } : null),
  }
}

export function breadcrumbNode(path, items) {
  return {
    '@type': 'BreadcrumbList',
    '@id': ids.breadcrumb(path),
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: pageUrl(item.to ?? path),
    })),
  }
}

export function faqNode(path, faqs) {
  return {
    '@type': 'FAQPage',
    '@id': `${pageUrl(path)}#faq`,
    isPartOf: ref(ids.webpage(path)),
    inLanguage: LANG,
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  }
}

export function serviceNode(solution) {
  return {
    '@type': 'Service',
    '@id': ids.service(solution.id),
    name: solution.title,
    serviceType: solution.title,
    description: `${solution.summary} ${solution.description}`,
    url: anchorUrl('/solutions', solution.id),
    image: assetUrl(solution.image),
    provider: ref(ids.organization()),
    areaServed: bengaluru,
  }
}

function facilityRef(warehouse) {
  const location = locationFor(warehouse.location)
  return {
    '@type': 'Place',
    '@id': ids.facility(warehouse.slug),
    name: warehouse.name,
    url: pageUrl(`/warehouses/${warehouse.slug}`),
    ...(location ? { address: facilityAddress(location) } : null),
  }
}

export function facilityNode(warehouse) {
  const location = locationFor(warehouse.location)

  return {
    ...facilityRef(warehouse),
    description: [warehouse.summary, ...warehouse.overview].join(' '),
    ...(location ? { hasMap: directionsTo(location.address) } : null),
    containedInPlace: bengaluru,
    image: warehouse.gallery.map((photo) => image(photo.src, { caption: photo.alt })),
    // Observed specifications carry a value ("Floor": "Clear span…"); the
    // feature list is a set of things the facility has, which schema.org
    // expresses as a named feature with the value `true`.
    amenityFeature: [
      ...(warehouse.observedSpecs ?? []).map((spec) => ({ name: spec.label, value: spec.value })),
      ...warehouse.features.map((feature) => ({ name: feature, value: true })),
    ].map((feature) => ({ '@type': 'LocationFeatureSpecification', ...feature })),
    keywords: [labelFor(warehouseTypes, warehouse.type), ...warehouse.suitableFor, 'Warehouse', 'Bengaluru'].join(', '),
  }
}

/** The facilities as an ordered list, for the listing page. */
export function facilityListNode(warehouseList) {
  return {
    '@type': 'ItemList',
    name: `${company.name} warehouses in Bengaluru`,
    numberOfItems: warehouseList.length,
    itemListElement: warehouseList.map((warehouse, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: pageUrl(`/warehouses/${warehouse.slug}`),
      name: warehouse.name,
    })),
  }
}

/** Services as an ordered list, for the solutions page. */
export function serviceListNode() {
  return {
    '@type': 'ItemList',
    name: `${company.name} warehousing solutions`,
    numberOfItems: solutions.length,
    itemListElement: solutions.map((solution, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: ref(ids.service(solution.id)),
    })),
  }
}
