// ---------------------------------------------------------------------------
// Verified company information.
//
// Nothing in this file may be invented. Fields that Gray Brick has not yet
// supplied are `null`, and every component that consumes them renders a
// graceful fallback rather than a placeholder. Filling a value in here makes
// it appear across the whole site: navigation, footer, contact page and the
// structured data block.
// ---------------------------------------------------------------------------

export const company = {
  legalName: 'Gray Brick Infra Pvt. Ltd.',
  // The name used in running text, page titles and as the search-result site
  // name. `alternateName` lists the other ways people write it, so a search
  // for any of them resolves to this organisation.
  name: 'Gray Brick Infra',
  shortName: 'Gray Brick',
  alternateName: ['Gray Brick', 'GrayBrick Infra', 'Gray Brick Infra Private Limited'],
  wordmark: { primary: 'GRAY BRICK', secondary: 'INFRA PVT LTD' },

  positioning:
    'Gray Brick Infra helps businesses find warehouse space in and around Bengaluru that fits the way they actually operate. Ready-to-move facilities, built-to-suit developments, and the fulfillment and distribution setups behind them.',

  shortStatement:
    'Warehouse space in and around Bengaluru. Ready-to-move, built-to-suit, fulfillment and distribution.',

  address: {
    building: '852, 7th A Main',
    landmark: 'Opp. Syndicate Bank Road',
    locality: 'Subbaiahnapalya, Banaswadi',
    city: 'Bengaluru North',
    region: 'Karnataka',
    postalCode: '560043',
    country: 'India',
  },

  // TODO(gray-brick): add the published business phone and email. Until these
  // are set the site directs enquiries through the form instead of showing a
  // placeholder number.
  contact: {
    phone: null,
    email: null,
  },

  // TODO(gray-brick): replace each `href` with the company's own profile URL,
  // and delete any platform Gray Brick does not actually maintain. Each entry
  // renders its brand icon in the footer and in the mobile drawer; an empty
  // array hides the block entirely.
  social: [
    { label: 'LinkedIn', icon: 'linkedin', href: 'https://www.linkedin.com/' },
    { label: 'Instagram', icon: 'instagram', href: 'https://www.instagram.com/' },
    { label: 'X', icon: 'x', href: 'https://x.com/' },
    { label: 'Facebook', icon: 'facebook', href: 'https://www.facebook.com/' },
    { label: 'YouTube', icon: 'youtube', href: 'https://www.youtube.com/' },
  ],

  workingHours: 'Monday to Saturday, 9:30 am to 6:30 pm IST',
  // The same hours in machine-readable form, for the structured data. Keep the
  // two in step: this one is what search engines show as opening hours.
  openingHours: {
    days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    opens: '09:30',
    closes: '18:30',
  },

  // Founder. Name, portrait, designation and qualification supplied by Gray
  // Brick. Nothing here is inferred.
  //
  // `message` is a draft written for review, not a transcribed quote. It is
  // attributed on the page, so it must read the way he would say it — change
  // the wording freely, and if it should not appear at all, set it to null and
  // the block renders without a statement.
  founder: {
    name: 'B Y Jayanth Reddy',
    title: 'Founder & Director',
    // Third-person framing paragraph above the statement.
    intro:
      'Jayanth started Gray Brick Infra to make industrial space a decision a business can take with confidence. His background is in finance, and it shapes how the company reads a building: as an operating cost that runs for the length of the lease, rather than a rent figure agreed once and forgotten.',
    message:
      'I came to warehousing from finance, and it was the numbers that convinced me. Rent is the line everyone negotiates hard, but the cost of the wrong building turns up everywhere else — in labour, in vehicle turnaround, in stock nobody can find. Gray Brick exists so that decision gets made properly the first time.',
    // Rendered as a specification strip beside the portrait. Add or remove
    // rows freely; the grid adapts to the count.
    facts: [
      { label: 'Qualification', value: 'MBA, Finance' },
      { label: 'Based in', value: 'Bengaluru, Karnataka' },
      { label: 'Focus', value: 'Warehousing & industrial space' },
    ],
  },
}

/** Address as an ordered list of lines, for rendering and for schema.org. */
export const addressLines = [
  company.address.building,
  company.address.landmark,
  company.address.locality,
  `${company.address.city} – ${company.address.postalCode}`,
]

export const addressSingleLine = [
  company.address.building,
  company.address.landmark,
  company.address.locality,
  company.address.city,
  company.address.region,
  company.address.postalCode,
  company.address.country,
].join(', ')

/**
 * Google's documented Maps URL API pointed at the real office address. No API
 * key, no fabricated place ID. It resolves the address the same way a search
 * on maps.google.com would.
 */
export const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  addressSingleLine,
)}`

export const hasPhone = Boolean(company.contact.phone)
export const hasEmail = Boolean(company.contact.email)

/**
 * Social entries that point at a real profile rather than a platform's home
 * page. Only these are published as `sameAs` in the structured data: a
 * `sameAs` of https://www.linkedin.com/ would tell search engines this company
 * IS LinkedIn, which is worse than saying nothing.
 */
export const socialProfiles = company.social.filter(({ href }) => {
  try {
    return new URL(href).pathname.replace(/\/+$/, '') !== ''
  } catch {
    return false
  }
})
