import { company } from '@/data/company'

/**
 * Organisation / LocalBusiness markup built strictly from verified fields.
 * Phone and email are omitted entirely until they exist rather than emitted
 * empty, which would be worse than absent for search engines.
 */
export function StructuredData() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: company.legalName,
    description: company.positioning,
    address: {
      '@type': 'PostalAddress',
      streetAddress: `${company.address.building}, ${company.address.landmark}`,
      addressLocality: `${company.address.locality}, ${company.address.city}`,
      addressRegion: company.address.region,
      postalCode: company.address.postalCode,
      addressCountry: 'IN',
    },
    areaServed: 'Bengaluru, Karnataka, India',
    // Confirmed designation, so he is emitted as the organisation's founder
    // rather than as a generic employee.
    founder: {
      '@type': 'Person',
      name: company.founder.name,
      jobTitle: company.founder.title,
    },
    knowsAbout: [
      'Ready-to-move warehouses',
      'Built-to-suit warehouses',
      'Fulfillment centers',
      'Distribution centers',
      'Supply chain management support',
    ],
    ...(company.contact.phone ? { telephone: company.contact.phone } : null),
    ...(company.contact.email ? { email: company.contact.email } : null),
    ...(company.social.length ? { sameAs: company.social.map((s) => s.href) } : null),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
